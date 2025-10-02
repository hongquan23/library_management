import os
from fastapi import UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional

from shared.models.book import Book
from shared.schemas.book import BookCreate, BookUpdate


# Thư mục lưu ảnh
IMAGE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "image")
os.makedirs(IMAGE_DIR, exist_ok=True)


class BookService:
    @staticmethod
    def get_all_books(db: Session) -> List[Book]:
        """Lấy toàn bộ sách"""
        return db.query(Book).all()

    @staticmethod
    def get_book_by_id(db: Session, book_id: int) -> Optional[Book]:
        """Lấy chi tiết 1 sách theo ID"""
        return db.query(Book).filter(Book.id == book_id).first()

    @staticmethod
    def search_books(db: Session, keyword: str) -> List[Book]:
        """Tìm kiếm theo tên hoặc tác giả"""
        return db.query(Book).filter(
            (Book.title.ilike(f"%{keyword}%")) |
            (Book.author.ilike(f"%{keyword}%"))
        ).all()

    @staticmethod
    def create_book(
        db: Session,
        book_data: BookCreate,
        image: Optional[UploadFile] = None
    ) -> Book:
        """Tạo mới sách, có thể kèm ảnh"""

        image_filename = None
        if image:
            image_filename = f"{book_data.title.replace(' ', '_')}.jpg"
            image_path = os.path.join(IMAGE_DIR, image_filename)
            with open(image_path, "wb") as buffer:
                buffer.write(image.file.read())

        new_book = Book(
            title=book_data.title,
            author=book_data.author,
            published_year=book_data.published_year,
            available_copies=book_data.available_copies,
            image=image_filename,
        )

        db.add(new_book)
        db.commit()
        db.refresh(new_book)
        return new_book

    @staticmethod
    def update_book(
        db: Session,
        book_id: int,
        update_data: BookUpdate,
        image: Optional[UploadFile] = None
    ) -> Optional[Book]:
        """Cập nhật sách, có thể thay ảnh"""

        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            return None

        # Update các trường từ schema
        update_fields = update_data.dict(exclude_unset=True)
        for key, value in update_fields.items():
            setattr(book, key, value)

        # Nếu có ảnh mới thì ghi đè
        if image:
            image_filename = f"{(book.title or 'book')}.jpg"
            image_path = os.path.join(IMAGE_DIR, image_filename)
            with open(image_path, "wb") as buffer:
                buffer.write(image.file.read())
            book.image = image_filename

        db.commit()
        db.refresh(book)
        return book

    @staticmethod
    def delete_book(db: Session, book_id: int) -> bool:
        """Xóa sách theo ID"""
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            return False

        db.delete(book)
        db.commit()
        return True
