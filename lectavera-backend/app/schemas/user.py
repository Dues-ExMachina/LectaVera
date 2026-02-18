from pydantic import BaseModel, EmailStr, ConfigDict
from uuid import UUID
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str  # This is used for registration

class UserOut(UserBase):
    id: UUID
    is_active: bool

    model_config = ConfigDict(from_attributes=True)