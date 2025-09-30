from fastapi import Depends
from sqlalchemy.orm import Session
from shared.database.session import SessionLocal


# Dependency cho DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
