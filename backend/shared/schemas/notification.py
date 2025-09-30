# shared-library/shared/schemas/notification.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ==== Base Schema ====
class NotificationBase(BaseModel):
    user_id: int
    message: str
    is_read: bool = False

# ==== Create Schema ====
class NotificationCreate(NotificationBase):
    pass

# ==== Update Schema ====
class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None

# ==== Output Schema ====
class NotificationOut(NotificationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
