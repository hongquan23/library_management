import sys
import os

# Thêm thư mục backend vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# Absolute import từ backend
from shared.database.base import Base
from shared.models import user, book, borrow_record, notification

from alembic import context
from sqlalchemy import engine_from_config, pool

target_metadata = Base.metadata
config = context.config

# Dùng DATABASE_URL từ env nếu có
db_url = config.get_main_option("sqlalchemy.url")
config.set_main_option("sqlalchemy.url", db_url)


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


run_migrations_online()
