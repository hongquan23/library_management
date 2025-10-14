from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from typing import List
from shared.schemas.notification import NotificationCreate, NotificationOut
from ..controllers.notification_controller import NotificationController
from ..core.dependencies import get_db

router = APIRouter(prefix="/notifications", tags=["Notifications"])

# ✅ Lấy tất cả thông báo
@router.get("/", response_model=List[NotificationOut])
def get_all_notifications(db: Session = Depends(get_db)):
    return NotificationController.list_notifications(db)

# ✅ Lấy thông báo theo user_id
@router.get("/user/{user_id}", response_model=List[NotificationOut])
def get_user_notifications(user_id: int, db: Session = Depends(get_db)):
    return NotificationController.list_user_notifications(user_id, db)

# ✅ Tạo mới thông báo
@router.post("/", response_model=NotificationOut)
def create_notification(data: NotificationCreate = Body(...), db: Session = Depends(get_db)):
    return NotificationController.create_notification(data, db)

# ✅ Đánh dấu là đã đọc
@router.put("/read/{notification_id}", response_model=NotificationOut)
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    return NotificationController.mark_read(notification_id, db)

# ✅ Xóa thông báo
@router.delete("/{notification_id}")
def delete_notification(notification_id: int, db: Session = Depends(get_db)):
    return NotificationController.delete_notification(notification_id, db)
