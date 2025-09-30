from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List

from shared.schemas.book import BookCreate, BookUpdate, BookOut
from ..services.book_service import BookService


class BookController:
    @staticmethod
    def list_books(db: Session) -> List[BookOut]:
        return BookService.get_all_books(db)

    @staticmethod
    def get_book(book_id: int, db: Session) -> BookOut:
        book = BookService.get_book_by_id(db, book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

    @staticmethod
    def search(keyword: str, db: Session) -> List[BookOut]:
        return BookService.search_books(db, keyword)

    @staticmethod
    def create(book_data: BookCreate, db: Session) -> BookOut:
        return BookService.create_book(db, book_data)

    @staticmethod
    def update(book_id: int, update_data: BookUpdate, db: Session) -> BookOut:
        book = BookService.update_book(db, book_id, update_data)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

    @staticmethod
    def delete(book_id: int, db: Session):
        success = BookService.delete_book(db, book_id)
        if not success:
            raise HTTPException(status_code=404, detail="Book not found")
        return {"message": "Book deleted successfully"}
