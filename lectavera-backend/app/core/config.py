from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import json

class Settings(BaseSettings):
    # App
    APP_NAME: str = "LectaVera"
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str
    REDIS_CACHE_TTL: int = 3600
    REDIS_CHAT_TTL: int = 86400
    REDIS_STATUS_TTL: int = 300
    REDIS_RATE_LIMIT_WINDOW: int = 60
    REDIS_RATE_LIMIT_MAX: int = 100
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_STORAGE_BUCKET: str = "lectavera-documents"
    
    # AI - Swapped OpenAI for Groq
    GROQ_API_KEY: str
    
    # Pinecone
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    PINECONE_INDEX_NAME: str
    
    # Tavily
    TAVILY_API_KEY: str
    
    # CORS (Handling the list string from .env)
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # Email
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    FROM_EMAIL: str
    FROM_NAME: str
    
    # Uploads
    MAX_UPLOAD_SIZE: int = 52428800
    
    # This part tells Pydantic how to read the .env file
    model_config = SettingsConfigDict(
        env_file=".env", 
        extra="ignore",  # This is the "Magic Fix": it tells Pydantic to ignore extra env vars
        case_sensitive=False
    )

settings = Settings()