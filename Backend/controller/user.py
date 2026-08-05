from fastapi import HTTPException
from fastapi.concurrency import run_in_threadpool
from sqlmodel import select

from model.database import SessionDep
from model.session_model import SessionModel
from schemas.user_schema import UserSessionResponseModel, UserUpdateModel, UserChangePasswordModel
from services.hasher import verify_password, generate_hash
from services.query import user_db_select_query


async def fetch_user_profile(db_session: SessionDep, user_session: SessionModel) -> UserSessionResponseModel:
    """ Retrieve user data from database

    :param db_session: current active database session
    :param user_session: current active user session

    :return: Returns user data as per database
    """
    user_in_db = await user_db_select_query(db_session, user_session, "email")

    return UserSessionResponseModel(**user_in_db.model_dump())


async def update_user_profile(update_data: UserUpdateModel, db_session: SessionDep,
                              user_session: SessionModel) -> UserUpdateModel:
    """Checks if user exists in database; retrieve and update that data; store updated data back into database

    :param update_data: update information sent by user
    :param db_session: current active database session
    :param user_session: current active user session

    :return: Returns updated user data

    :raise HTTPException: Raise server error if unable to update user data"""
    user_in_db = await user_db_select_query(db_session, user_session, "email")

    # updating user_data with update_data
    update_dict = update_data.model_dump(exclude_unset=True)
    user_in_db.sqlmodel_update(update_dict)

    try:
        db_session.add(user_in_db)
        await db_session.commit()
        await db_session.refresh(user_in_db)
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=500, detail="Unable to update user profile. Please try again later.")

    return UserUpdateModel.model_validate(user_in_db)


async def update_user_password(pass_data: UserChangePasswordModel, db_session: SessionDep,
                               user_session: SessionModel):
    """Check old password stored in database; if matched, hash and store new password into the database.
    Also, logout user from all devices; if password change is successful.

    :param pass_data: old and new password data
    :param db_session: current active database session
    :param user_session: current active user session

    :raise HTTPException: If old password mismatch or password change fails
    """
    user_in_db = await user_db_select_query(db_session, user_session, "email")

    old_password_ok: bool = await run_in_threadpool(verify_password, user_in_db.password, pass_data.old_password)
    if not old_password_ok:
        raise HTTPException(status_code=401, detail="Incorrect Password. Please enter correct password and try again.")

    new_password_hash: str = await run_in_threadpool(generate_hash, pass_data.new_password)
    user_in_db.password = new_password_hash

    try:
        db_session.add(user_in_db)
        # Logout user from all devices. User will need to log in again using new password
        statement = select(SessionModel).where(SessionModel.email == user_in_db.email)
        await db_session.exec(statement)
        await db_session.commit()
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=500, detail="Unable to change password. Please try again later.")


def delete_user_profile():
    return {"message": "delete user information"}
