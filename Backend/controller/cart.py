from typing import Sequence
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import bindparam, inspect
from sqlalchemy.orm import selectinload
from sqlmodel import select, delete, col, update

from model.cart_model import CartModel
from model.database import SessionDep
from model.product_model import ProductsModel
from model.session_model import SessionModel
from schemas.cart_schema import CartAddProductModel, CartBaseModel


async def fetch_all_cart_items(db_session: SessionDep, user_session: SessionModel):
    result = await db_session.exec(select(CartModel)
                                   .where(CartModel.user_id == user_session.user_id)
                                   .options(selectinload(CartModel.product)))
    cart_in_db = result.all()
    if not len(cart_in_db):
        return []

    return [CartBaseModel.model_validate(item) for item in cart_in_db]


async def add_item_to_cart(product_data: CartAddProductModel, db_session: SessionDep, user_session: SessionModel):
    # check if product is available
    result_product = await db_session.exec(select(ProductsModel)
                                           .where(ProductsModel.id == product_data.product_id))
    product_in_db: ProductsModel = result_product.first()
    if not product_in_db or not product_in_db.in_stock or product_in_db.deleted_at:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Cannot add product to cart. Product not found.")

    # checks if a cart already exists
    result_cart = await db_session.exec(select(CartModel)
                                        .where(CartModel.product_id == product_data.product_id,
                                               CartModel.user_id == user_session.user_id)
                                        .options(selectinload(CartModel.product)))
    cart_in_db: CartModel = result_cart.first()

    # calculate new quantity for product in cart and verify with product current stock.
    current_quantity = cart_in_db.quantity if cart_in_db else 0
    new_quantity = current_quantity + product_data.quantity
    if new_quantity > product_in_db.in_stock:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Product has insufficient stock. Cart ")

    # add proper data to database session for commit
    if cart_in_db:
        cart_in_db.quantity = new_quantity
        db_session.add(cart_in_db)
    else:
        cart_in_db = CartModel(**product_data.model_dump(), user_id=user_session.user_id)
        db_session.add(cart_in_db)

    await db_session.commit()
    # refresh and return cart data with product.
    await db_session.refresh(cart_in_db, ["product"])
    return [CartBaseModel.model_validate(cart_in_db)]


async def edit_item_quantity(product_list: list[CartAddProductModel], db_session: SessionDep,
                             user_session: SessionModel):
    result = await db_session.exec(select(CartModel)
                                   .where(CartModel.user_id == user_session.user_id)
                                   .options(selectinload(CartModel.product)))
    cart_in_db: Sequence[CartModel] = result.all()

    if not len(cart_in_db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Cart is empty")

    cart_products = {item.product_id: item for item in cart_in_db}
    update_list = []
    delete_list = []

    for item in product_list:
        # We do not handle adding new items in the cart here.
        if item.product_id in cart_products:
            cart_item_db = cart_products[item.product_id]
            # Before reading our query, making sure if we have the stock and item has a valid quantity
            if cart_item_db.product.in_stock >= item.quantity:
                update_list.append({"b_id": cart_item_db.id, "b_qty": item.quantity})
            else:
                # just a precaution, in case we receive a cart with item quantity 0
                delete_list.append(cart_item_db.id)

    try:
        if update_list:
            c_table = inspect(CartModel).local_table
            await db_session.execute(update(c_table)
                                     .where(c_table.c.id == bindparam("b_id"))
                                     .values(quantity=bindparam("b_qty"))
                                     # .execution_options(synchronize_session=False)
                                     , update_list)

        if delete_list:
            await db_session.execute(delete(CartModel).where(col(CartModel.id).in_(delete_list)))

        await db_session.commit()
    except Exception as e:
        await db_session.rollback()
        print(f"Error: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Cart update failed")


async def remove_item_from_cart(cart_id: UUID, db_session: SessionDep):
    try:
        item_to_delete = await db_session.exec(delete(CartModel).where(col(CartModel.id) == cart_id))
        if not item_to_delete:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Item not available in cart")

        await db_session.commit()
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Cart item delete unsuccessful")
