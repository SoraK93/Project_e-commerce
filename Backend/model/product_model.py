import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import Column, DateTime, func
from sqlmodel import SQLModel, Field, Relationship


class ProductsModel(SQLModel, table=True):
    __tablename__ = "products"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    name: str = Field(max_length=255, nullable=False)

    description: str = Field(max_length=1000, nullable=False)

    in_stock: int = Field(default=0, ge=0, nullable=False)

    price: Decimal = Field(
        default=Decimal("0.00"), decimal_places=2, ge=0, nullable=False)

    deleted_at: datetime | None = Field(sa_column=Column(
        DateTime(timezone=True), default=None, nullable=True, index=True))

    created_at: datetime = Field(sa_column=Column(
        DateTime(timezone=True), server_default=func.now(), nullable=True))

    seller_id: uuid.UUID | None = Field(
        foreign_key="customers_details.id", ondelete="SET NULL", nullable=True)

    # will help in making seller related query without writing any extra query
    seller: Optional["UserModel"] = Relationship(back_populates="products")
    cart: Optional["CartModel"] = Relationship(back_populates="product")
    orders: Optional["OrderModel"] = Relationship(back_populates="products")
