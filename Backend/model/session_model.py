import uuid
from datetime import datetime, timedelta, timezone
from typing import Literal, Optional

from pydantic import EmailStr
from sqlalchemy import Column, DateTime
from sqlmodel import SQLModel, Field, TEXT, Relationship

user_role = Literal["admin", "seller", "customer"]


class SessionModel(SQLModel, table=True):
    __tablename__ = "active_session"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    user_id: uuid.UUID = Field(foreign_key="customers_details.id", nullable=False)

    role: user_role = Field(sa_type=TEXT, default="customer", nullable=False)

    email: EmailStr = Field(sa_type=TEXT, nullable=False)

    expire_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc) + timedelta(hours=24),
                                sa_column=Column(DateTime(timezone=True),
                                                 index=True))

    user: Optional["UserModel"] = Relationship(back_populates="sessions")