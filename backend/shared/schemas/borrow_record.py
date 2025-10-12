# shared-library/shared/schemas/borrow_record.py
from pydantic import BaseModel,ConfigDict
from datetime import date, datetime
from typing import Optional

# ==== Base Schema ====
class BorrowRecordBase(BaseModel):
    member_id: int      # Người mượn sách (Member)
    book_id: int      # Sách được mượn
    borrowed_at: datetime    # Ngày mượn

# ==== Create Schema ====
class BorrowRecordCreate(BorrowRecordBase):
    pass

# ==== Update Schema ====
class BorrowRecordUpdate(BaseModel):
    returned_at: Optional[date] = None
    status: Optional[str] = None

# ==== Output Schema ====
class BorrowRecordOut(BorrowRecordBase):
    id: int
    borrowed_at: datetime
    returned_at: Optional[date] = None
    status: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
