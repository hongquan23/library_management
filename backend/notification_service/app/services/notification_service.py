from sqlalchemy.orm import Session
from shared.models.notification import Notification
from shared.schemas.notification import NotificationCreate, NotificationUpdate
from typing import List, Optional
from datetime import datetime

class NotificationService:
    @staticmethod
    def get_all(db: Session) -> List[Notification]:
        return db.query(Notification).all()

    @staticmethod
    def get_by_user(db: Session, user_id: int) -> List[Notification]:
        return db.query(Notification).filter(Notification.user_id == user_id).all()

    @staticmethod
    def create(db: Session, data: NotificationCreate) -> Notification:
        notification = Notification(**data.dict(), created_at=datetime.utcnow())
        db.add(notification)
        db.commit()
        db.refresh(notification)
        return notification

    @staticmethod
    def mark_as_read(db: Session, notification_id: int) -> Optional[Notification]:
        notification = db.query(Notification).filter(Notification.id == notification_id).first()
        if notification:
            notification.read = "yes"
            db.commit()
            db.refresh(notification)
        return notification

    @staticmethod
    def delete(db: Session, notification_id: int) -> bool:
        notification = db.query(Notification).filter(Notification.id == notification_id).first()
        if not notification:
            return False
        db.delete(notification)
        db.commit()
        return True
