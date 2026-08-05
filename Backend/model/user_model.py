import uuid
from sqlmodel import SQLModel, Field, TEXT, Relationship
from pydantic import EmailStr


class UserModel(SQLModel, table=True):
    __tablename__ = "customers_details"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    name: str = Field(max_length=60, nullable=False)

    phone: str = Field(max_length=20, nullable=False)

    address: str = Field(max_length=255, nullable=False)

    email: EmailStr = Field(sa_type=TEXT, max_length=255,
                            index=True, nullable=False, unique=True)

    password: str = Field(nullable=False)

    is_seller: bool = Field(default=False, nullable=False)
    
    # will help in making products related query without writing any extra query
    products: list["ProductsModel"] = Relationship(back_populates="seller")
    sessions: list["SessionModel"] = Relationship(back_populates="user")
    cart: list["CartModel"] = Relationship(back_populates="user")
    orders: list["OrderModel"] = Relationship(back_populates="user")