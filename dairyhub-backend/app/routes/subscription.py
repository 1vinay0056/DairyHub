from datetime import datetime

from fastapi import APIRouter, HTTPException

from app.database import db
from app.models.subscription import Subscription

router = APIRouter(
    prefix="/subscription",
    tags=["Subscription"],
)


@router.post("/")
def subscribe(data: Subscription):

    existing = db.subscriptions.find_one(
        {"email": data.email}
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already subscribed",
        )

    db.subscriptions.insert_one(
        {
            "email": data.email,
            "created_at": datetime.utcnow(),
        }
    )

    return {
        "message": "Subscribed Successfully"
    }