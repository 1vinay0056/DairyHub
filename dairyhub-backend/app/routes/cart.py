from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from bson.errors import InvalidId

from app.database import db
from app.dependencies import get_current_user
from app.models.cart import CartItem

router = APIRouter(tags=["Cart"])


@router.get("/cart")
def get_cart(current_user=Depends(get_current_user)):
    cart = db.carts.find_one({"user_id": current_user["id"]})

    if not cart:
        return {
            "items": [],
            "total": 0
        }

    result = []
    total = 0

    for item in cart["items"]:
        try:
            product = db.products.find_one(
                {"_id": ObjectId(item["product_id"])}
            )
        except InvalidId:
            continue

        if not product:
            continue

        subtotal = product["price"] * item["quantity"]
        total += subtotal

        result.append({
            "product_id": str(product["_id"]),
            "name": product["name"],
            "price": product["price"],
            "image": product.get("image", ""),
            "category": product.get("category", ""),
            "stock": product.get("stock", 0),
            "quantity": item["quantity"],
            "subtotal": subtotal
        })

    return {
        "items": result,
        "total": total
    }


@router.post("/cart")
def add_to_cart(
    item: CartItem,
    current_user=Depends(get_current_user)
):
    if item.quantity < 1:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be at least 1"
        )

    try:
        product = db.products.find_one(
            {"_id": ObjectId(item.product_id)}
        )
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid Product ID"
        )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    cart = db.carts.find_one({"user_id": current_user["id"]})

    if not cart:
        db.carts.insert_one({
            "user_id": current_user["id"],
            "items": [
                {
                    "product_id": item.product_id,
                    "quantity": item.quantity
                }
            ]
        })

        return {
            "success": True,
            "message": "Product added to cart"
        }

    for cart_item in cart["items"]:
        if cart_item["product_id"] == item.product_id:
            cart_item["quantity"] += item.quantity

            db.carts.update_one(
                {"_id": cart["_id"]},
                {"$set": {"items": cart["items"]}}
            )

            return {
                "success": True,
                "message": "Quantity updated"
            }

    cart["items"].append({
        "product_id": item.product_id,
        "quantity": item.quantity
    })

    db.carts.update_one(
        {"_id": cart["_id"]},
        {"$set": {"items": cart["items"]}}
    )

    return {
        "success": True,
        "message": "Product added to cart"
    }


@router.put("/cart/{product_id}")
def update_quantity(
    product_id: str,
    quantity: int,
    current_user=Depends(get_current_user)
):
    if quantity < 1:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be at least 1"
        )

    cart = db.carts.find_one({"user_id": current_user["id"]})

    if not cart:
        raise HTTPException(
            status_code=404,
            detail="Cart not found"
        )

    updated = False

    for item in cart["items"]:
        if item["product_id"] == product_id:
            item["quantity"] = quantity
            updated = True
            break

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Product not found in cart"
        )

    db.carts.update_one(
        {"_id": cart["_id"]},
        {"$set": {"items": cart["items"]}}
    )

    return {
        "success": True,
        "message": "Cart updated"
    }


@router.delete("/cart/{product_id}")
def remove_item(
    product_id: str,
    current_user=Depends(get_current_user)
):
    cart = db.carts.find_one({"user_id": current_user["id"]})

    if not cart:
        raise HTTPException(
            status_code=404,
            detail="Cart not found"
        )

    original_length = len(cart["items"])

    cart["items"] = [
        item
        for item in cart["items"]
        if item["product_id"] != product_id
    ]

    if len(cart["items"]) == original_length:
        raise HTTPException(
            status_code=404,
            detail="Product not found in cart"
        )

    db.carts.update_one(
        {"_id": cart["_id"]},
        {"$set": {"items": cart["items"]}}
    )

    return {
        "success": True,
        "message": "Product removed from cart"
    }