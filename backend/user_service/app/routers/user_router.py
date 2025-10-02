from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from shared.schemas.user import UserCreate, UserLogin, UserResponse, ResetPasswordRequest
from shared.database.session import get_db
from ..controllers.user_controller import UserController

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=UserResponse)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    print("Data received from frontend:", user_data.dict())

    return UserController.register_user(db, user_data)

@router.post("/login")
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    return UserController.login_user(db, login_data)

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    return UserController.reset_password(db, data.email, data.new_password)

