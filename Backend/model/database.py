import os
from typing import Annotated, AsyncGenerator

from dotenv import load_dotenv
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

load_dotenv()

DATABASE_URL = os.environ["DB_URL"]

engine = create_async_engine(url=DATABASE_URL,
                             echo=True,
                             pool_pre_ping=True,
                             connect_args={
                                 "command_timeout": 60,
                                 "timeout": 60
                             })


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_session)]
