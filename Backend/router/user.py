from fastapi import APIRouter, status

import controller.seller as seller
import controller.user as user
from model.database import SessionDep
from schemas.product_schema import ProductResponseSellerModel
from schemas.user_schema import UserSessionResponseModel, UserUpdateModel, UserUpdateResponseModel, \
    UserChangePasswordModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/user",
    tags=["users"]
)


@router.get("/")
async def get_user(db_session: SessionDep, user_session: valid_session_dep) -> dict[
    str, UserSessionResponseModel | str]:
    """Retrieve current user information based on active session data

    :param db_session: current active database session
    :param user_session: current active user session

    :return: On successful verification of session_id, return user data as per database
    """
    if not user_session:
        return {"message": "No active session found. Please login."}

    user_in_db = await user.fetch_user_profile(db_session, user_session)

    return {"user": user_in_db, "message": "User found successfully"}


@router.get("/email", status_code=status.HTTP_200_OK)
async def get_user_email(user_session: valid_session_dep):
    """

    :param user_session:
    :return:
    """
    return {"email": user_session.email, "message": "User email data"}


@router.patch("/update", response_model=UserUpdateResponseModel)
async def update_user_by_id(update_data: UserUpdateModel, db_session: SessionDep,
                            user_session: valid_session_dep):
    """Update user information based on the data received from request.body

    :param update_data: update information sent by user
    :param db_session: current active database session
    :param user_session: current active user session

    :return: Returns updated user data
    """
    user_in_db = await user.update_user_profile(update_data, db_session, user_session)
    return {"user": user_in_db, "message": "Profile Update successful"}


@router.patch("/change-password")
async def change_user_password(change_data: UserChangePasswordModel, db_session: SessionDep,
                               user_session: valid_session_dep):
    """Initiate password change process where we compare old password and update database using new password

    :param change_data: receive old and new password data as per request.body
    :param db_session: current active database session
    :param user_session: current active user session

    :return: On successfully changing password sends a success message
    """
    await user.update_user_password(change_data, db_session, user_session)
    return {"message": "Password changed successfully. Please login again."}


# TODO: delete user profile
@router.delete("/delete")
async def delete_user_by_id():
    return user.delete_user_profile()


# TODO: view seller profile
@router.get("/seller-profile")
async def get_seller_by_id():
    return seller.fetch_seller_profile()


@router.get("/view-product", response_model=ProductResponseSellerModel)
async def get_product_by_seller_id(db_session: SessionDep,
                                   user_session: valid_session_dep):
    """

    :param db_session:
    :param user_session:
    :return:
    """
    if not user_session:
        return {"message": "Unable to retrieve products. Please try to log in."}

    products_in_db = await seller.fetch_seller_products(db_session, user_session)

    return {"products": products_in_db, "message": "Retrieved products successfully."}
