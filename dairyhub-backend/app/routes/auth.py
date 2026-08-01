from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.database import db
from app.models.register import RegisterUser
from app.utils.jwt_handler import create_access_token
from app.utils.password import hash_password, verify_password

router = APIRouter(tags=["Authentication"])


@router.post("/register")
def register(user: RegisterUser):

    existing = db.users.find_one({"email": user.email})

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    db.users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": "user",
        "created_at": datetime.utcnow()
    })

    return {
        "message": "Registration Successful"
    }


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    user = db.users.find_one({"email": form_data.username})

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    token = create_access_token(
        {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }