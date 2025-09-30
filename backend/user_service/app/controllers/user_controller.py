# backend/services/user-service/app/controllers/user_controller.py
from sqlalchemy.orm import Session
from shared.schemas.user import UserCreate, UserLogin
from ..services.user_service import UserService

class UserController:
    @staticmethod
    def register_user(db: Session, user_data: UserCreate):
        return UserService.register_user(db, user_data)

    @staticmethod
    def login_user(db: Session, login_data: UserLogin):
        return UserService.login_user(db, login_data.email, login_data.password)
