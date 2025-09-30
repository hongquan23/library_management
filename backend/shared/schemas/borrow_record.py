# shared-library/shared/schemas/borrow_record.py
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

# ==== Base Schema ====
class BorrowRecordBase(BaseModel):
    user_id: int      # Người mượn sách (Member)
    book_id: int      # Sách được mượn
    due_date: date    # Ngày trả dự kiến

# ==== Create Schema ====
class BorrowRecordCreate(BorrowRecordBase):
    pass

# ==== Update Schema ====
class BorrowRecordUpdate(BaseModel):
    return_date: Optional[date] = None
    is_returned: Optional[bool] = None

# ==== Output Schema ====
class BorrowRecordOut(BorrowRecordBase):
    id: int
    borrow_date: datetime
    return_date: Optional[date] = None
    is_returned: bool

    class Config:
        orm_mode = True
