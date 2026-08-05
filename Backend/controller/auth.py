from fastapi import HTTPException, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.exc import IntegrityError
from sqlmodel import select

from model.database import SessionDep
from model.user_model import UserModel
from schemas.login_schema import LoginRequestModel
from schemas.registration_schema import RegistrationRequestModel
from services.hasher import generate_hash, verify_password



async def initiate_login(login_data: LoginRequestModel, db_session: SessionDep):
    """Using the provided login_data, initiate the login process.

    :param login_data: contains email and password provided by user
    :param db_session: Current active database session

    :return: user: Returns relevant user information found in database
    """
    invalid_error = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                  detail="Incorrect Email or Password. Please try again.")

    result = await db_session.exec(select(UserModel).where(UserModel.email == login_data.email))

    user_in_db: UserModel | None = result.first()
    if not user_in_db:
        raise invalid_error

    verified_hash = await run_in_threadpool(verify_password, user_in_db.password, login_data.password)
    if not verified_hash:
        raise invalid_error

    return user_in_db


async def register_new_user(form_data: RegistrationRequestModel, db_session: SessionDep):
    """Create a new user and store it inside database

    :param form_data: contains user information
    :param db_session: Current active database session
    """
    new_password_hashed = await run_in_threadpool(generate_hash, form_data.password)
    updated_form_data = {**form_data.model_dump(exclude={"confirm_password"}), "password": new_password_hashed}
    new_user = UserModel(**updated_form_data)

    try:
        db_session.add(new_user)
        await db_session.commit()
        await db_session.refresh(new_user)
    except IntegrityError:
        await db_session.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="User already registered. Please try to login.")
