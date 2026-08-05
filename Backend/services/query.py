from fastapi import HTTPException
from sqlmodel import select

from model.user_model import UserModel
from model.session_model import SessionModel
from model.database import SessionDep


async def user_db_select_query(db_session: SessionDep, user_session: SessionModel, column: str) -> UserModel:
    """Create a select query on UserModel table using current active user session.

    :param db_session: current active database session
    :param user_session: current active user session
    :param column: name of the column to be compared

    :return: current user data from database"""
    user_column = getattr(UserModel, column)
    session_column = getattr(user_session, column)

    result = await db_session.exec(select(UserModel).where(user_column == session_column))
    user_in_db: UserModel | None = result.first()
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User not found")

    return user_in_db
