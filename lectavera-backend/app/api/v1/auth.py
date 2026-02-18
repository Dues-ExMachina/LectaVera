from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.core.security import hash_password

router = APIRouter()

@router.post("/signup", response_model=UserOut)
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    # 1. Check if user exists
    # Hint: use db.query(User).filter(User.email == user_in.email).first()
    
    # 2. Create user object
    # hashed_pw = hash_password(user_in.password)
    
    # 3. Add to DB
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)
    
    # 4. Return user
    pass