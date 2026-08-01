from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.database import db
from app.models.wishlist import Wishlist
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)


# ===========================
# Add Product to Wishlist
# ===========================
@router.post("/")
def add_to_wishlist(
    wishlist: Wishlist,
    current_user=Depends(get_current_user)
):
    user_id = current_user["id"]

    # Check product exists
    product = db.products.find_one(
        {"_id": ObjectId(wishlist.product_id)}
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Prevent duplicate wishlist items
    exists = db.wishlist.find_one({
        "user_id": user_id,
        "product_id": wishlist.product_id
    })

    if exists:
        return {
            "message": "Product already in wishlist"
        }

    db.wishlist.insert_one({
        "user_id": user_id,
        "product_id": wishlist.product_id
    })

    return {
        "message": "Added to wishlist"
    }


# ===========================
# Get Wishlist
# ===========================
@router.get("/")
def get_wishlist(
    current_user=Depends(get_current_user)
):
    user_id = current_user["id"]

    wishlist_items = []

    items = db.wishlist.find({
        "user_id": user_id
    })

    for item in items:

        product = db.products.find_one({
            "_id": ObjectId(item["product_id"])
        })

        if product:
            product["_id"] = str(product["_id"])

            wishlist_items.append({
                "wishlist_id": str(item["_id"]),
                "product": product
            })

    return wishlist_items


# ===========================
# Remove from Wishlist
# ===========================
@router.delete("/{product_id}")
def remove_from_wishlist(
    product_id: str,
    current_user=Depends(get_current_user)
):
    user_id = current_user["id"]

    result = db.wishlist.delete_one({
        "user_id": user_id,
        "product_id": product_id
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found"
        )

    return {
        "message": "Removed from wishlist"
    }


# ===========================
# Wishlist Count
# ===========================
@router.get("/count")
def wishlist_count(
    current_user=Depends(get_current_user)
):
    user_id = current_user["id"]

    count = db.wishlist.count_documents({
        "user_id": user_id
    })

    return {
        "count": count
    }