from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.dependencies import get_db
from shared.schemas.notification import NotificationCreate, NotificationUpdate, NotificationOut
from ..services.notification_service import NotificationService

class NotificationController:
    @staticmethod
    def list_notifications(db: Session = Depends(get_db)) -> List[NotificationOut]:
        return NotificationService.get_all(db)

    @staticmethod
    def list_user_notifications(user_id: int, db: Session = Depends(get_db)) -> List[NotificationOut]:
        return NotificationService.get_by_user(db, user_id)

    @staticmethod
    def create_notification(data: NotificationCreate, db: Session = Depends(get_db)) -> NotificationOut:
        return NotificationService.create(db, data)

    @staticmethod
    def mark_read(notification_id: int, db: Session = Depends(get_db)) -> NotificationOut:
        notification = NotificationService.mark_as_read(db, notification_id)
        if not notification:
            raise HTTPException(status_code=404, detail="Notification not found")
        return notification

    @staticmethod
    def delete_notification(notification_id: int, db: Session = Depends(get_db)):
        success = NotificationService.delete(db, notification_id)
        if not success:
            raise HTTPException(status_code=404, detail="Notification not found")
        return {"message": "Notification deleted successfully"}
