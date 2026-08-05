from decimal import Decimal
from typing import Sequence
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ProductCreateModel(BaseModel):
    name: str
    description: str
    in_stock: int
    price: Decimal = Field(max_digits=10, decimal_places=2, gt=0)

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class ProductEditModel(ProductCreateModel):
    pass

    model_config = ConfigDict(from_attributes=True, extra="ignore")


class SellerResponseModel(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class ProductResponseModel(ProductCreateModel):
    id: UUID
    seller: SellerResponseModel

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class ProductResponseSellerModel(BaseModel):
    products: Sequence[ProductResponseModel]
    message: str
