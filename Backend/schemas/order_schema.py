from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class OrderNewModel(BaseModel):
    product_id: UUID
    quantity: int = Field(gt=0)
    address: str = Field(min_length=6)
    payment_status: bool
    payment_mode: Literal["Cash", "Online"]
    ordered_on: datetime
    cancelled_on: None | datetime

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class OrderRequestModel(BaseModel):
    cart: list[OrderNewModel]

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class OrderCreateModel(OrderNewModel):
    user_id: UUID

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class OrderResponseProductModel(BaseModel):
    id: UUID
    name: str
    price: float

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class OrderBaseResponseModel(OrderNewModel):
    id: UUID
    products: OrderResponseProductModel

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class OrderResponseModel(BaseModel):
    data: list[OrderBaseResponseModel]
    message: str

    model_config = ConfigDict(from_attributes=True, extra='ignore')
