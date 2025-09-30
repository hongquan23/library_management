from sqlalchemy import Column, Integer, String, Enum
from ..database.base import Base
import enum
from sqlalchemy import DateTime, func


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    LIBRARIAN = "LIBRARIAN"
    MEMBER = "MEMBER"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(
        Enum(UserRole, name="userrole", native_enum=True),  # <-- native_enum=True
        default=UserRole.MEMBER,
        nullable=False
    )
     
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
