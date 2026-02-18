from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Any, Union
# from jose import jwt
from app.core.config import settings

# 1. Setup the "Meat Grinder" (Bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Turns a plain password into a secure hash"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Checks if the plain password matches the stored hash"""
    return pwd_context.verify(plain_password, hashed_password)

# We will add JWT token generation here next!