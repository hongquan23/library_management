from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional

from shared.schemas.book import BookOut, BookCreate, BookUpdate
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
    def create(
        title: str,
        author: str,
        published_year: Optional[int],
        available_copies: Optional[int],
        image: Optional[UploadFile],
        db: Session
    ) -> BookOut:
        # build schema
        book_data = BookCreate(
            title=title,
            author=author,
            published_year=published_year,
            available_copies=available_copies,
        )
        return BookService.create_book(db, book_data, image)

    @staticmethod
    def update(
        book_id: int,
        title: Optional[str],
        author: Optional[str],
        published_year: Optional[int],
        available_copies: Optional[int],
        image: Optional[UploadFile],
        db: Session
    ) -> BookOut:
        # build schema
        update_data = BookUpdate(
            title=title,
            author=author,
            published_year=published_year,
            available_copies=available_copies,
        )
        book = BookService.update_book(db, book_id, update_data, image)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

    @staticmethod
    def delete(book_id: int, db: Session):
        success = BookService.delete_book(db, book_id)
        if not success:
            raise HTTPException(status_code=404, detail="Book not found")
        return {"message": "Book deleted successfully"}

    # 🔽 Thêm hàm này để consumer gọi khi borrow được approve
    @staticmethod
    def decrease_stock(book_id: int, db: Session):
        book = BookService.get_book_by_id(db, book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        if book.available_copies <= 0:
            raise HTTPException(status_code=400, detail="No copies available")

        book.available_copies -= 1
        db.commit()
        db.refresh(book)
        return book
