from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, status, Body

import controller.cart as cart
from model.database import SessionDep
from schemas.cart_schema import CartAddProductModel, CartResponseModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)


@router.get("/", status_code=status.HTTP_200_OK, response_model=CartResponseModel)
async def get_all_cart(db_session: SessionDep, user_session: valid_session_dep):
    if not user_session:
        return CartResponseModel(cart=[], message="Cart is empty")
    cart_in_db = await cart.fetch_all_cart_items(db_session, user_session)
    return CartResponseModel(cart=cart_in_db, message="Cart retrieved successfully")


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=CartResponseModel)
async def create_new_cart(product_data: CartAddProductModel, db_session: SessionDep, user_session: valid_session_dep):
    cart_in_db = await cart.add_item_to_cart(product_data, db_session, user_session)
    return CartResponseModel(cart=cart_in_db, message="Item added to cart successfully")


@router.patch("/", status_code=status.HTTP_204_NO_CONTENT)
async def update_cart(product_list: Annotated[list[CartAddProductModel], Body()], db_session: SessionDep,
                      user_session: valid_session_dep):
    await cart.edit_item_quantity(product_list, db_session, user_session)


@router.delete("/{cart_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cart_item(cart_id: UUID, db_session: SessionDep, user_session: valid_session_dep):
    await cart.remove_item_from_cart(cart_id, db_session)
