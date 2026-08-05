from datetime import timezone, datetime
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlmodel import select

from model.database import SessionDep
from model.product_model import ProductsModel
from model.session_model import SessionModel
from model.user_model import UserModel
from schemas.product_schema import ProductCreateModel, ProductResponseModel, ProductEditModel


async def fetch_all_product(db_session: SessionDep):
    """Retrieve all products from database

    :param db_session: current active database session

    :return: Returns a list containing all products
    """
    result = await db_session.exec(select(ProductsModel)
                                   .where(ProductsModel.deleted_at == None)
                                   .options(selectinload(ProductsModel.seller)))
    all_product = result.all()

    if not len(all_product):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products loaded.")

    return [ProductResponseModel.model_validate(product) for product in all_product]


async def fetch_product_by_id(product_id: UUID, db_session: SessionDep) -> ProductResponseModel:
    """

    :param product_id:
    :param db_session:
    :return:
    """
    result = await db_session.exec(select(ProductsModel)
                                   .where(ProductsModel.id == product_id)
                                   .options(selectinload(ProductsModel.seller)))
    product_in_db = result.first()
    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unable to retrieve, product not found.")

    return ProductResponseModel.model_validate(product_in_db)


async def make_a_new_product(new_product: ProductCreateModel, db_session: SessionDep, user_session: SessionModel):
    """

    :param new_product:
    :param db_session:
    :param user_session:
    :return:
    """
    result = await db_session.exec(select(UserModel)
                                   .where(UserModel.email == user_session.email))
    user_in_db: UserModel = result.first()
    if not user_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unable to create, user not found.")

    product_data = ProductsModel(**new_product.model_dump(),
                                 seller_id=user_in_db.id)

    try:
        db_session.add(product_data)
        await db_session.commit()
        await db_session.refresh(product_data)
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Failed to create new Product. Please try again later.")


async def edit_existing_product_detail(product_id: UUID, edit_product: ProductEditModel,
                                       user_session: SessionModel, db_session: SessionDep):
    """

    :param product_id:
    :param edit_product:
    :param user_session:
    :param db_session:
    :return:
    """
    result = await db_session.exec(select(ProductsModel)
                                   .where(ProductsModel.id == product_id)
                                   .options(selectinload(ProductsModel.seller)))
    product_in_db = result.first()

    # checks if product exists in database
    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unable to edit, product not found.")

    # checks if seller and active user are same
    if product_in_db.seller.email != user_session.email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to update this product.")

    product_dict = edit_product.model_dump(exclude_unset=True)
    product_in_db.sqlmodel_update(product_dict)

    try:
        db_session.add(product_in_db)
        await db_session.commit()
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Failed to update product. Please try again later.")


async def delete_existing_product(product_id: UUID, db_session: SessionDep):
    """

    :param product_id:
    :param db_session:
    :return:
    """
    result = await db_session.exec(select(ProductsModel).where(ProductsModel.id == product_id))
    product_in_db: ProductsModel = result.first()
    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unable to delete, product not found.")

    # getting current utc time of delete
    current_utc_time = datetime.now(timezone.utc)
    product_in_db.deleted_at = current_utc_time

    try:
        db_session.add(product_in_db)
        await db_session.commit()
    except Exception:
        await  db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Failed to delete product. Please try again later")
