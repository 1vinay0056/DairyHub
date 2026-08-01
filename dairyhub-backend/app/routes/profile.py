from bson import ObjectId

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.database import db
from app.dependencies import get_current_user

from fastapi import UploadFile, File
import cloudinary.uploader
from app.utils import cloudinary_config




from fastapi import (
    UploadFile,
    File,
)
router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


class UpdateProfile(BaseModel):
    name: str
    email: str


@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    user = db.users.find_one(
        {"_id": ObjectId(current_user["id"])}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "id": str(user["_id"]),
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "role": user.get("role", "user"),
        "profile_image": user.get(
            "profile_image",
            "",
        ),
        "created_at": user.get("created_at"),
    }


@router.put("/update")
def update_profile(
    data: UpdateProfile,
    current_user=Depends(get_current_user),
):
    user = db.users.find_one(
        {"_id": ObjectId(current_user["id"])}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    existing = db.users.find_one(
        {
            "email": data.email,
            "_id": {
                "$ne": ObjectId(current_user["id"])
            },
        }
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    db.users.update_one(
        {"_id": ObjectId(current_user["id"])},
        {
            "$set": {
                "name": data.name,
                "email": data.email,
            }
        },
    )

    return {
        "message": "Profile updated successfully"
    }


@router.post("/upload-image")
async def upload_profile_image(
    image: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    try:
        upload = cloudinary.uploader.upload(
            image.file,
            folder="DairyHub/Profile",
        )

        image_url = upload["secure_url"]

        db.users.update_one(
            {
                "_id": ObjectId(current_user["id"])
            },
            {
                "$set": {
                    "profile_image": image_url
                }
            },
        )

        return {
            "message": "Profile image uploaded successfully",
            "image": image_url,
        }

    except Exception as e:
        print("Cloudinary Error:", e)
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )