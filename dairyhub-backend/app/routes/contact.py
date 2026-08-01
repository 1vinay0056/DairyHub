from datetime import datetime

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.database import db
from app.models.contact import ContactMessage

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)


@router.post("")
def send_message(data: ContactMessage):

    db.contact_messages.insert_one(
        {
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "subject": data.subject,
            "message": data.message,
           "status": "Pending",
"is_read": False,
            "created_at": datetime.utcnow(),
        }
    )

    return {
        "message": "Your message has been sent successfully."
    }


@router.get("")
def get_messages():

    messages = []

    for message in db.contact_messages.find().sort(
        "created_at",
        -1,
    ):

        messages.append(
            {
                "id": str(message["_id"]),
                "name": message["name"],
                "email": message["email"],
                "phone": message["phone"],
                "subject": message["subject"],
                "message": message["message"],
                "status": message.get(
                    "status", "Pending"
                ),
                "is_read": message.get("is_read", False),
                "created_at": message["created_at"],
            }
        )

    return messages


@router.get("/unread-count")
def unread_count():

    count = db.contact_messages.count_documents(
        {
            "is_read": False
        }
    )

    return {
        "count": count
    }
@router.put("/read-all")
def mark_all_read():

    db.contact_messages.update_many(
        {
            "is_read": False
        },
        {
            "$set": {
                "is_read": True
            }
        }
    )

    return {
        "message": "All messages marked as read."
    }
@router.put("/read/{id}")
def mark_as_read(id: str):

    db.contact_messages.update_one(
        {
            "_id": ObjectId(id)
        },
        {
            "$set": {
                "is_read": True
            }
        }
    )

    return {
        "message": "Updated"
    }


@router.get("/latest")
def latest_messages():

    messages = []

    for message in db.contact_messages.find(
        {"is_read": False}
    ).sort("created_at", -1).limit(5):

        messages.append(
            {
                "id": str(message["_id"]),
                "name": message["name"],
                "subject": message["subject"],
                "created_at": message["created_at"],
            }
        )

    return messages

@router.put("/read/{message_id}")
def mark_message_read(message_id: str):

    db.contact_messages.update_one(
        {
            "_id": ObjectId(message_id)
        },
        {
            "$set": {
                "is_read": True
            }
        }
    )

    return {
        "message": "Message marked as read."
    }