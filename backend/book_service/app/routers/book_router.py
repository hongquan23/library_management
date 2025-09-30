# book_service/app/routers/book_router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from shared.database.session import get_db
from shared.schemas.book import BookCreate, BookUpdate
from ..controllers.book_controller import BookController

router = APIRouter()

@router.get("/books/")
def list_books(db: Session = Depends(get_db)):
    return BookController.list_books(db)

@router.get("/books/{book_id}")
def get_book(book_id: int, db: Session = Depends(get_db)):
    return BookController.get_book(book_id, db)

@router.post("/books/")
def create_book(book_data: BookCreate, db: Session = Depends(get_db)):
    return BookController.create(book_data, db)

@router.put("/books/{book_id}")
def update_book(book_id: int, update_data: BookUpdate, db: Session = Depends(get_db)):
    return BookController.update(book_id, update_data, db)

@router.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    return BookController.delete(book_id, db)
