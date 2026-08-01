from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from bson.errors import InvalidId

from app.database import db
from app.dependencies import get_current_user
from app.models.order import Order

router = APIRouter(tags=["Orders"])


@router.post("/orders")
def place_order(
    order: Order,
    current_user=Depends(get_current_user)
):
    cart = db.carts.find_one(
        {"user_id": current_user["id"]}
    )

    if not cart or len(cart["items"]) == 0:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    items = []
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

        items.append({
            "product_id": str(product["_id"]),
            "name": product["name"],
            "price": product["price"],
            "image": product.get("image", ""),
            "quantity": item["quantity"],
            "subtotal": subtotal
        })

    if len(items) == 0:
        raise HTTPException(
            status_code=400,
            detail="No valid products found"
        )

    new_order = {
        "user_id": current_user["id"],
        "customer_name": current_user.get("name", ""),
        "customer_email": current_user.get("email", ""),
        "address": order.address,
        "payment_method": order.payment_method,
        "status": "Pending",
        "items": items,
        "total": total,
         "is_seen": False,
        "created_at": datetime.utcnow()
    }

    result = db.orders.insert_one(new_order)

    db.carts.update_one(
        {"_id": cart["_id"]},
        {"$set": {"items": []}}
    )

    return {
        "success": True,
        "message": "Order placed successfully",
        "order_id": str(result.inserted_id)
    }


@router.get("/orders")
def my_orders(
    current_user=Depends(get_current_user)
):
    orders = db.orders.find(
        {"user_id": current_user["id"]}
    ).sort("created_at", -1)

    result = []

    for order in orders:
        result.append({
            "id": str(order["_id"]),
            "address": order["address"],
            "payment_method": order["payment_method"],
            "status": order["status"],
            "total": order["total"],
            "created_at": order["created_at"],
            "items": order["items"]
        })

    return result
@router.get("/admin/orders")
def get_all_orders(
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can access this endpoint"
        )

    orders = db.orders.find().sort("created_at", -1)

    result = []

    for order in orders:
        result.append({
            "id": str(order["_id"]),
            "customer_name": order.get("customer_name", ""),
            "customer_email": order.get("customer_email", ""),
            "address": order["address"],
            "payment_method": order["payment_method"],
            "status": order["status"],
            "total": order["total"],
            "created_at": order["created_at"],
            "items": order["items"]
        })

    return result


@router.put("/admin/orders/{order_id}")
def update_order_status(
    order_id: str,
    status: str,
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can update orders"
        )

    allowed_status = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]

    if status not in allowed_status:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    try:
        object_id = ObjectId(order_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid Order ID"
        )

    order = db.orders.find_one({"_id": object_id})

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.orders.update_one(
        {"_id": object_id},
        {
            "$set": {
                "status": status
            }
        }
    )

    return {
        "success": True,
        "message": "Order status updated successfully"
    }

@router.get("/admin/users")
def get_all_users(current_user=Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    users = []

    for user in db.users.find():
        users.append({
            "id": str(user["_id"]),
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "role": user.get("role", "user"),
            "created_at": user.get("created_at")
        })

    return users
@router.get("/orders/unread-count")
def unread_orders(
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    count = db.orders.count_documents(
        {"is_seen": False}
    )

    return {"count": count}

@router.put("/orders/read-all")
def read_orders(
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    db.orders.update_many(
        {"is_seen": False},
        {"$set": {"is_seen": True}}
    )

    return {
        "message": "Orders marked as seen."
    }
    
@router.get("/orders/{order_id}")
def get_order_details(
    order_id: str,
    current_user=Depends(get_current_user)
):
    try:
        object_id = ObjectId(order_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid Order ID"
        )

    order = db.orders.find_one({"_id": object_id})

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    if (
        current_user["role"] != "admin"
        and order["user_id"] != current_user["id"]
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return {
        "id": str(order["_id"]),
        "customer_name": order.get("customer_name", ""),
        "customer_email": order.get("customer_email", ""),
        "address": order["address"],
        "payment_method": order["payment_method"],
        "status": order["status"],
        "total": order["total"],
        "created_at": order["created_at"],
        "items": order["items"]
    }
@router.delete("/admin/users/{user_id}")
def delete_user(
    user_id: str,
    current_user=Depends(get_current_user),
):
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid User ID"
        )

    result = db.users.delete_one({"_id": object_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "User deleted successfully"
    }


