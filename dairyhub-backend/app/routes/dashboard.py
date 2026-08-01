from fastapi import APIRouter, Depends, HTTPException
from app.database import db
from app.dependencies import get_current_user
from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.database import db

router = APIRouter(tags=["Dashboard"])


@router.get("/search")
def global_search(
    q: str,
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "admin":
        return {
            "products": [],
            "orders": [],
            "users": [],
            "messages": []
        }

    query = {
        "$regex": q,
        "$options": "i"
    }

    # Products
    products = []

    for product in db.products.find(
        {
            "name": query
        }
    ).limit(5):

        products.append({
            "id": str(product["_id"]),
            "name": product["name"]
        })

    # Orders

    orders = []

    for order in db.orders.find(
        {
            "customer_name": query
        }
    ).limit(5):

        orders.append({
            "id": str(order["_id"]),
            "customer_name": order.get(
                "customer_name",
                ""
            )
        })

    # Users

    users = []

    for user in db.users.find(
        {
            "name": query
        }
    ).limit(5):

        users.append({
            "id": str(user["_id"]),
            "name": user["name"]
        })

    # Contact Messages

    messages = []

    for message in db.contact_messages.find(
        {
            "$or": [
                {
                    "name": query
                },
                {
                    "subject": query
                }
            ]
        }
    ).limit(5):

        messages.append({
            "id": str(message["_id"]),
            "name": message["name"],
            "subject": message["subject"]
        })

    return {
        "products": products,
        "orders": orders,
        "users": users,
        "messages": messages
    }


@router.get("/admin/dashboard")
def dashboard(current_user=Depends(get_current_user)):
    # Allow only admin
    if current_user["role"].lower() != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    total_products = db.products.count_documents({})
    total_orders = db.orders.count_documents({})
    total_users = db.users.count_documents({})

    revenue = 0

    recent_orders = []

    orders = list(
        db.orders.find().sort("created_at", -1).limit(5)
    )

    for order in orders:
        revenue += order.get("total", 0)

        recent_orders.append({
            "id": str(order["_id"]),
            "customer_name": order.get("customer_name", ""),
            "customer_email": order.get("customer_email", ""),
            "status": order.get("status"),
            "payment_method": order.get("payment_method"),
            "total": order.get("total", 0),
            "created_at": order.get("created_at")
        })

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_users": total_users,
        "total_revenue": revenue,
        "recent_orders": recent_orders
    }