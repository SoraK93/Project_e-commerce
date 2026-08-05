from pydantic import BaseModel, EmailStr, ConfigDict


class LoginRequestModel(BaseModel):
    email: EmailStr
    password: str


class LoginModel(BaseModel):
    name: str
    phone: str
    address: str
    email: EmailStr
    is_seller: bool


class LoginResponseModel(BaseModel):
    user: LoginModel
    message: str

    model_config = ConfigDict(from_attributes=True, extra='ignore')
