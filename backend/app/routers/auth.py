# app/routers/auth.py
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
import hashlib
import jwt
import os
from datetime import datetime, timedelta
from typing import Optional
from ..database import execute_query, user_exists, create_user, get_user_by_email, get_user_by_id

router = APIRouter()

# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-for-development")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Pydantic models for request validation
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    phone: Optional[str] = "0000000000" 
    profession: Optional[str] = None
    preferred_language: Optional[str] = "en"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@router.post("/register")
async def register_user(user_data: UserRegister):
    # Check if user already exists
    if user_exists(user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    password_hash = hash_password(user_data.password)

    # Create new user
    try:
        user = create_user(
            user_data.username, 
            user_data.email, 
            password_hash,
            user_data.phone,
            user_data.profession,
            user_data.preferred_language
        )
        return {"success": True, "message": "User registered successfully", "user": user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Get user by email (form_data.username contains email)
    user = get_user_by_email(form_data.username)  
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify password
    hashed_password = hash_password(form_data.password)
    if hashed_password != user["password_hash"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate token
    access_token = create_access_token({"sub": str(user["id"])})

    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"]
        }
    }

@router.get("/validate-token")
async def validate_token(user: dict = Depends(get_current_user)):
    """Endpoint to check if a token is valid"""
    return {"valid": True, "user_id": user["id"]}
