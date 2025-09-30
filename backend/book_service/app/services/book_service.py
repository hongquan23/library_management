from sqlalchemy.orm import Session
from shared.models.book import Book
from shared.schemas.book import BookCreate, BookUpdate
from typing import List, Optional


class BookService:
    @staticmethod
    def get_all_books(db: Session) -> List[Book]:
        return db.query(Book).all()

    @staticmethod
    def get_book_by_id(db: Session, book_id: int) -> Optional[Book]:
        return db.query(Book).filter(Book.id == book_id).first()

    @staticmethod
    def search_books(db: Session, keyword: str) -> List[Book]:
        return db.query(Book).filter(
            Book.title.ilike(f"%{keyword}%") |
            Book.author.ilike(f"%{keyword}%")
        ).all()

    @staticmethod
    def create_book(db: Session, book_data: BookCreate) -> Book:
        new_book = Book(**book_data.dict())
        db.add(new_book)
        db.commit()
        db.refresh(new_book)
        return new_book

    @staticmethod
    def update_book(db: Session, book_id: int, update_data: BookUpdate) -> Optional[Book]:
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            return None
        for key, value in update_data.dict(exclude_unset=True).items():
            setattr(book, key, value)
        db.commit()
        db.refresh(book)
        return book

    @staticmethod
    def delete_book(db: Session, book_id: int) -> bool:
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            return False
        db.delete(book)
        db.commit()
        return True
