from uuid import UUID

from fastapi import APIRouter, status, HTTPException

import controller.product as product
from model.database import SessionDep
from schemas.product_schema import ProductCreateModel, ProductEditModel, ProductResponseModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/product",
    tags=["product"]
)


@router.get("/", status_code=status.HTTP_200_OK, response_model=list[ProductResponseModel])
async def get_products(db_session: SessionDep):
    """Retrieve all products

    :param db_session: current active database session

    :return: On success, returns a list containing product information
    """
    return await product.fetch_all_product(db_session)


@router.get("/{product_id}", status_code=status.HTTP_201_CREATED, response_model=list[ProductResponseModel])
async def get_product_by_id(product_id: UUID, db_session: SessionDep):
    """

    :param product_id:
    :param db_session:
    :return:
    """
    product_in_db = await product.fetch_product_by_id(product_id, db_session)

    return [product_in_db]


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
async def create_new_product(product_data: ProductCreateModel, db_session: SessionDep, user_session: valid_session_dep):
    """

    :param product_data:
    :param db_session:
    :param user_session:
    :return:

    :raise
    """
    if not user_session and user_session.role != "seller":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Product creation not allowed. Please login and try again.")

    await product.make_a_new_product(product_data, db_session, user_session)


@router.patch("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_product_by_id(product_id: UUID, edit_product: ProductEditModel, user_session: valid_session_dep,
                               db_session: SessionDep):
    """

    :param product_id:
    :param edit_product:
    :param user_session:
    :param db_session:
    :return:

    :raise
    """
    if not user_session and user_session.role != "seller":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Cannot update product details. Please login and try again.")

    await product.edit_existing_product_detail(product_id, edit_product, user_session, db_session)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product_by_id(product_id: UUID, user_session: valid_session_dep, db_session: SessionDep):
    """

    :param product_id:
    :param user_session:
    :param db_session:
    :return:

    :raise
    """
    if not user_session and user_session.role != "seller":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Cannot delete product details. Please login and try again.")

    await product.delete_existing_product(product_id, db_session)
