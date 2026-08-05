from pydantic import BaseModel, EmailStr


class RegistrationResponseModel(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str
    is_seller: bool


class RegistrationRequestModel(RegistrationResponseModel):
    password: str
