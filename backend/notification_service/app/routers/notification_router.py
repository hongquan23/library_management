from fastapi import APIRouter, Body
from typing import List
from shared.schemas.notification import NotificationCreate, NotificationOut
from ..controllers.notification_controller import NotificationController

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/", response_model=List[NotificationOut])
def get_all_notifications():
    return NotificationController.list_notifications()

@router.get("/user/{user_id}", response_model=List[NotificationOut])
def get_user_notifications(user_id: int):
    return NotificationController.list_user_notifications(user_id)

@router.post("/", response_model=NotificationOut)
def create_notification(data: NotificationCreate = Body(...)):
    return NotificationController.create_notification(data)

@router.put("/read/{notification_id}", response_model=NotificationOut)
def mark_notification_read(notification_id: int):
    return NotificationController.mark_read(notification_id)

@router.delete("/{notification_id}")
def delete_notification(notification_id: int):
    return NotificationController.delete_notification(notification_id)
