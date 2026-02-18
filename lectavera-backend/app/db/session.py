from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Define the database URL (e.g., SQLite, PostgreSQL, MySQL)
DATABASE_URL = settings.DATABASE_URL
1
# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a SessionLocal class to manage database sessions
SessionLocal = sessionmaker(autoflush=False,autocommit=False,bind=engine)

# Create a Base class for your database models to inherit from
Base = declarative_base()

# The get_db dependency function
def get_db():
    """
    Provides a Database session for each request and closes it after use
    """

    db = SessionLocal()

    try:
        # Yeild the database session to the path operation 
        yield db
    finally:
        db.close()