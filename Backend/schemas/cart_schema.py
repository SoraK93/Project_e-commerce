from uuid import UUID

from pydantic import BaseModel, Field, computed_field, ConfigDict


class CartAddProductModel(BaseModel):
    product_id: UUID
    quantity: int = Field(gt=0)


class CartProductModel(BaseModel):
    id: UUID
    name: str
    description: str
    in_stock: int
    price: float = Field(gt=0)

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class CartBaseModel(BaseModel):
    id: UUID
    product: CartProductModel
    quantity: int

    @computed_field
    @property
    def total(self) -> float:
        return self.quantity * self.product.price

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class CartResponseModel(BaseModel):
    cart: list[CartBaseModel] | list
    message: str

    model_config = ConfigDict(from_attributes=True, extra='ignore')
