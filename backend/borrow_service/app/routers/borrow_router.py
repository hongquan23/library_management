from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from shared.schemas.borrow_record import BorrowRecordCreate, BorrowRecordUpdate, BorrowRecordOut
from ..controllers.borrow_controller import BorrowController
from shared.database.session import get_db
from ..services.producer import send_kafka_event  # import Kafka producer

router = APIRouter(prefix="/borrow", tags=["Borrow Records"])

# Lấy tất cả borrow records
@router.get("/", response_model=List[BorrowRecordOut])
def get_all_borrow_records(db: Session = Depends(get_db)):
    return BorrowController.list_records(db)


# Lấy borrow record theo ID
@router.get("/{record_id}", response_model=BorrowRecordOut)
def get_borrow_record(record_id: int, db: Session = Depends(get_db)):
    return BorrowController.get_record(record_id, db)


# Tạo borrow record (người dùng mượn -> trạng thái pending)
@router.post("/", response_model=BorrowRecordOut)
async def create_borrow_record(data: BorrowRecordCreate = Body(...), db: Session = Depends(get_db)):
    borrow = BorrowController.create(data, db)

    # Gửi event Kafka cho notification_service (thông báo cho thủ thư)
    await send_kafka_event("borrow.requested", {
        "id": borrow.id,
        "book_id": borrow.book_id,
        "member_id": borrow.member_id,
        "status": borrow.status,
    })

    return borrow


# Trả sách
@router.put("/return/{record_id}", response_model=BorrowRecordOut)
def return_borrowed_book(record_id: int, data: BorrowRecordUpdate = Body(...), db: Session = Depends(get_db)):
    return BorrowController.return_book(record_id, data, db)


# Thủ thư duyệt borrow record
@router.put("/approve/{record_id}", response_model=BorrowRecordOut)
async def approve_borrow_record(record_id: int, db: Session = Depends(get_db)):
    borrow = BorrowController.approve(record_id, db)
    if not borrow:
        raise HTTPException(status_code=404, detail="Borrow record not found")

    # Gửi event Kafka cho book_service (giảm stock) + notification_service
    await send_kafka_event("borrow.approved", {
        "id": borrow.id,
        "book_id": borrow.book_id,
        "member_id": borrow.member_id,
        "status": borrow.status,
    })

    return borrow


# Xóa borrow record
@router.delete("/{record_id}")
def delete_borrow_record(record_id: int, db: Session = Depends(get_db)):
    return BorrowController.delete(record_id, db)
