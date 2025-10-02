from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ==== Base Schema ====
class BookBase(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    available_copies: Optional[int] = None
    published_year: Optional[int] = None
    image: Optional[str] = None   # thêm trường image

# ==== Create Schema ====
class BookCreate(BookBase):
    pass  # Giữ nguyên thông tin từ BookBase

# ==== Update Schema ====
class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    published_year: Optional[int] = None
    available_copies: Optional[int] = None
    image: Optional[str] = None   # cho phép update image

# ==== Output Schema ====
class BookOut(BookBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
