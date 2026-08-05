from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UserUpdateModel(BaseModel):
    name: str
    phone: str
    address: str
    is_seller: bool

    model_config = ConfigDict(from_attributes=True)


class UserUpdateResponseModel(BaseModel):
    user: UserUpdateModel
    message: str


class UserSessionResponseModel(UserUpdateModel):
    id: UUID


class UserChangePasswordModel(BaseModel):
    old_password: str
    new_password: str