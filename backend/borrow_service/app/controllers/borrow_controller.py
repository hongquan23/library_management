from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.dependencies import get_db
from shared.schemas.borrow_record import BorrowRecordCreate, BorrowRecordUpdate, BorrowRecordOut
from ..services.borrow_service import BorrowService


class BorrowController:
    @staticmethod
    def list_records(db: Session = Depends(get_db)) -> List[BorrowRecordOut]:
        return BorrowService.get_all_records(db)

    @staticmethod
    def get_record(record_id: int, db: Session = Depends(get_db)) -> BorrowRecordOut:
        record = BorrowService.get_record_by_id(db, record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Borrow record not found")
        return record

    @staticmethod
    def create(data: BorrowRecordCreate, db: Session = Depends(get_db)) -> BorrowRecordOut:
        try:
            return BorrowService.create_record(db, data)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    def return_book(record_id: int, data: BorrowRecordUpdate, db: Session = Depends(get_db)) -> BorrowRecordOut:
        record = BorrowService.return_book(db, record_id, data)
        if not record:
            raise HTTPException(status_code=404, detail="Borrow record not found")
        return record

    @staticmethod
    def delete(record_id: int, db: Session = Depends(get_db)):
        success = BorrowService.delete_record(db, record_id)
        if not success:
            raise HTTPException(status_code=404, detail="Borrow record not found")
        return {"message": "Borrow record deleted successfully"}
