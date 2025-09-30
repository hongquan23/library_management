# shared-library/shared/models/borrow_record.py
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.base import Base

class BorrowRecord(Base):
    __tablename__ = "borrow_records"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    borrowed_at = Column(DateTime, default=datetime.utcnow)
    returned_at = Column(DateTime, nullable=True)
    status = Column(String, default="borrowed")  # borrowed, returned

    # Quan hệ
    book = relationship("Book", back_populates="borrow_records")
    member = relationship("User")

    def __repr__(self):
        return f"<BorrowRecord(id={self.id}, member_id={self.member_id}, book_id={self.book_id}, status={self.status})>"
