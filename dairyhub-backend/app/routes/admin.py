from bson import ObjectId
from fastapi import HTTPException
from app.database import db
from app.dependencies import get_current_user
from fastapi import Depends