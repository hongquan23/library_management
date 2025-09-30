from sqlalchemy.orm import Session
from shared.database.session import SessionLocal


# Dependency cho DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
