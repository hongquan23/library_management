from shared.database.session import engine
from shared.database.base import Base
from shared.models import user, book, borrow_record,notification

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")

if __name__ == "__main__":
    init_db()
    