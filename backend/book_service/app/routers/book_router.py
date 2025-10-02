# book_service/app/routers/book_router.py
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from shared.database.session import get_db
from ..controllers.book_controller import BookController

router = APIRouter()

@router.get("/books/")
def list_books(db: Session = Depends(get_db)):
    return BookController.list_books(db)

@router.get("/books/{book_id}")
def get_book(book_id: int, db: Session = Depends(get_db)):
    return BookController.get_book(book_id, db)

@router.post("/books/")
def create_book(
    title: str = Form(...),
    author: str = Form(None),
    published_year: int = Form(None),
    available_copies: int = Form(0),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    return BookController.create(title, author, published_year, available_copies, image, db)

@router.put("/books/{book_id}")
def update_book(
    book_id: int,
    title: str = Form(None),
    author: str = Form(None),
    published_year: int = Form(None),
    available_copies: int = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    return BookController.update(book_id, title, author, published_year, available_copies, image, db)

@router.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    return BookController.delete(book_id, db)
