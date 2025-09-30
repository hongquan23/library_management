import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Borrow Service"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:password@database:5432/library_db"
    )

    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecretkey")
    JWT_ALGORITHM: str = "HS256"


settings = Settings()
