# backend/services/user-service/app/services/user_service.py
from sqlalchemy.orm import Session
from shared.models.user import User
from shared.schemas.user import UserCreate
from ..core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

class UserService:
    @staticmethod
    def register_user(db: Session, user_data: UserCreate):
        existing_user = db.query(User).filter(User.username == user_data.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        hashed_pwd = hash_password(user_data.password)
        new_user = User(
            username=user_data.username,
            email=user_data.email,
            role=user_data.role,
            hashed_password=hashed_pwd,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def login_user(db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        token = create_access_token(data={"sub": user.email, "role": user.role.value})

        return {"access_token": token, "token_type": "bearer"}
