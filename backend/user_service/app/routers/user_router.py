from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from shared.schemas.user import UserCreate, UserLogin, UserResponse, ResetPasswordRequest
from shared.database.session import get_db
from ..controllers.user_controller import UserController
from shared.models.user import User, UserRole

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

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


# ✅ Thăng cấp người dùng (VD: MEMBER → LIBRARIAN)
@router.put("/{user_id}/promote")
def promote_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")

    if user.role == UserRole.MEMBER:
        user.role = UserRole.LIBRARIAN
    elif user.role == UserRole.LIBRARIAN:
        user.role = UserRole.ADMIN
    else:
        return {"message": "Người dùng đã đạt cấp cao nhất"}

    db.commit()
    db.refresh(user)
    return {"message": "Thăng cấp thành công", "new_role": user.role.value}


# ✅ Lấy thông tin user theo ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")
    return user