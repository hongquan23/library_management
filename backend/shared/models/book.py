# shared-library/shared/models/book.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.base import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=True)
    published_year = Column(Integer, nullable=True)
    available_copies = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Một sách có thể có nhiều lượt mượn
    borrow_records = relationship("BorrowRecord", back_populates="book")

    def __repr__(self):
        return f"<Book(id={self.id}, title={self.title})>"
