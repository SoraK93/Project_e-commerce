from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field, Relationship


class CartModel(SQLModel, table=True):
    __tablename__ = "customer_cart"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    product_id: UUID = Field(foreign_key="products.id", nullable=False, index=True, ondelete="CASCADE")

    user_id: UUID = Field(foreign_key="customers_details.id", nullable=False, index=True, ondelete="CASCADE")

    quantity: int = Field(default=1, gt=0, nullable=False)

    product: Optional["ProductsModel"] = Relationship(back_populates="cart")
    user: Optional["UserModel"] = Relationship(back_populates="cart")

    __table_args__ = (
        UniqueConstraint("product_id", "user_id", name="unique_product_user_cart"),
    )