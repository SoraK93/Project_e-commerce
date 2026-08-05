from datetime import datetime, timezone
from typing import Annotated
from uuid import UUID

from fastapi import Cookie, Depends, HTTPException
from pydantic import EmailStr
from sqlmodel import delete, func, select
from sqlmodel.ext.asyncio.session import AsyncSession

from model.database import SessionDep, engine
from model.session_model import SessionModel, user_role


async def create_new_session(db_session: SessionDep, user_id: UUID, email: EmailStr, role: user_role):
    """Creates user session and stores it inside database

    :param db_session: current active database session
    :param user_id: current user id
    :param email: user email received during login request
    :param role: set user role ["admin", "seller", "customer"]

    :returns session: return newly created session data
    
    :raise HTTPException: if session creation fails."""
    new_session = SessionModel(role=role, user_id=user_id, email=email)

    try:
        db_session.add(new_session)
        await db_session.commit()
        await db_session.refresh(new_session)
    except Exception:
        await db_session.rollback()
        raise HTTPException(status_code=500, detail="Failed to create new session. Please try again later.")

    return new_session


async def validate_session(db_session: SessionDep, session_id: Annotated[UUID | None, Cookie()] = None):
    """Verify session_id to check it has any available active session

    :param db_session: current active database session
    :param session_id: using UUID received from request.cookie

    :returns SessionModel: If an active session is found  
    :returns None: if no session_id was provided in the request  

    :raise HTTPException: if session_id missing in database or expired"""
    if not session_id:
        return None

    result = await db_session.exec(select(SessionModel)
                                .where(SessionModel.id == session_id,
                                       SessionModel.expire_at > datetime.now(timezone.utc)))
    get_session_data = result.first()

    if not get_session_data:
        raise HTTPException(
            status_code=401, detail="Invalid session. Please login again.")

    return get_session_data


valid_session_dep = Annotated[SessionModel, Depends(validate_session)]


async def delete_expired_session():
    """ Handle deletion of expired session in database"""
    async with AsyncSession(engine) as db_session:
        del_session = delete(SessionModel).where(
            SessionModel.expire_at < func.now())
        try:
            await db_session.exec(del_session)
            await db_session.commit()
        except Exception:
            await db_session.rollback()
