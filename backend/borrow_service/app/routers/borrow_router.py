from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from typing import List
from shared.schemas.borrow_record import BorrowRecordCreate, BorrowRecordUpdate, BorrowRecordOut
from ..controllers.borrow_controller import BorrowController
from shared.database.session import get_db  # <-- import get_db

router = APIRouter(prefix="/borrow", tags=["Borrow Records"])

# Lấy tất cả borrow records
@router.get("/", response_model=List[BorrowRecordOut])
def get_all_borrow_records(db: Session = Depends(get_db)):
    return BorrowController.list_records(db)

# Lấy borrow record theo ID
@router.get("/{record_id}", response_model=BorrowRecordOut)
def get_borrow_record(record_id: int, db: Session = Depends(get_db)):
    return BorrowController.get_record(record_id, db)

# Tạo borrow record
@router.post("/", response_model=BorrowRecordOut)
def create_borrow_record(data: BorrowRecordCreate = Body(...), db: Session = Depends(get_db)):
    return BorrowController.create(data, db)

# Trả sách
@router.put("/return/{record_id}", response_model=BorrowRecordOut)
def return_borrowed_book(record_id: int, data: BorrowRecordUpdate = Body(...), db: Session = Depends(get_db)):
    return BorrowController.return_book(record_id, data, db)

# Xóa borrow record
@router.delete("/{record_id}")
def delete_borrow_record(record_id: int, db: Session = Depends(get_db)):
    return BorrowController.delete(record_id, db)









