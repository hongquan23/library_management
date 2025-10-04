from sqlalchemy.orm import Session
from shared.models.borrow_record import BorrowRecord
from shared.models.book import Book
from shared.schemas.borrow_record import BorrowRecordCreate, BorrowRecordUpdate, BorrowRecordOut
from datetime import date
from typing import List, Optional


class BorrowService:
    @staticmethod
    def get_all_records(db: Session) -> List[BorrowRecordOut]:
        records = db.query(BorrowRecord).all()
        return [BorrowRecordOut.from_orm(record) for record in records]

    @staticmethod
    def get_record_by_id(db: Session, record_id: int) -> Optional[BorrowRecordOut]:
        record = db.query(BorrowRecord).filter(BorrowRecord.id == record_id).first()
        if not record:
            return None
        return BorrowRecordOut.from_orm(record)

    @staticmethod
    def create_record(db: Session, data: BorrowRecordCreate) -> BorrowRecordOut:
        # Kiểm tra sách có tồn tại không
        book = db.query(Book).filter(Book.id == data.book_id).first()
        if not book:
            raise ValueError("Book not found")

        # Chỉ tạo record pending, KHÔNG trừ available_copies ở đây
        new_record = BorrowRecord(**data.dict(), status="pending")
        db.add(new_record)
        db.commit()
        db.refresh(new_record)
        return BorrowRecordOut.from_orm(new_record)
    

    @staticmethod
    def approve_record(db: Session, record_id: int) -> Optional[BorrowRecordOut]:
        record = db.query(BorrowRecord).filter(BorrowRecord.id == record_id).first()
        if not record:
            return None
        if record.status != "pending":
            return BorrowRecordOut.from_orm(record)

        # Kiểm tra sách còn không
        book = db.query(Book).filter(Book.id == record.book_id).first()
        if not book:
            raise ValueError("Book not found")
        if book.available_copies <= 0:
            raise ValueError("No available copies for this book")

        # Cập nhật record sang "borrowed"
        record.status = "borrowed"
        book.available_copies -= 1

        db.commit()
        db.refresh(record)
        return BorrowRecordOut.from_orm(record)


    @staticmethod
    def return_book(db: Session, record_id: int, return_data: BorrowRecordUpdate) -> Optional[BorrowRecordOut]:
        record = db.query(BorrowRecord).filter(BorrowRecord.id == record_id).first()
        if not record:
            return None
        if record.status == "returned":
            return BorrowRecordOut.from_orm(record)

        # Cập nhật thông tin trả sách
        record.return_date = return_data.return_date or date.today()
        record.status = "returned"

        # Tăng số lượng sách có sẵn
        book = db.query(Book).filter(Book.id == record.book_id).first()
        if book:
            book.available_copies += 1

        db.commit()
        db.refresh(record)
        return BorrowRecordOut.from_orm(record)
    



    @staticmethod
    def delete_record(db: Session, record_id: int) -> bool:
        record = db.query(BorrowRecord).filter(BorrowRecord.id == record_id).first()
        if not record:
            return False
        db.delete(record)
        db.commit()
        return True
