from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from sqlmodel import select

from model.database import SessionDep
from model.product_model import ProductsModel
from model.session_model import SessionModel
from model.user_model import UserModel


def fetch_seller_profile():
    return {"message": "return seller information"}


async def fetch_seller_products(db_session: SessionDep, user_session: SessionModel):
    """

    :param db_session:
    :param user_session:
    :return:
    """
    result = await db_session.exec(select(ProductsModel)
                                   .join(UserModel)
                                   .where(UserModel.email == user_session.email)
                                   .options(selectinload(ProductsModel.seller)))
    products_in_db = result.all()
    if not products_in_db:
        raise HTTPException(status_code=404, detail="No product found. Please add a product.")

    return products_in_db
