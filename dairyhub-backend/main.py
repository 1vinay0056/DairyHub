from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.product import router as product_router
from app.routes.auth import router as auth_router
from app.routes.cart import router as cart_router
from app.routes.order import router as order_router
from app.routes.wishlist import router as wishlist_router
from app.routes.dashboard import router as dashboard_router
from app.routes.user import router as user_router
from app.routes.profile import router as profile_router
from app.routes.subscription import router as subscription_router
from app.routes.contact import router as contact_router
app = FastAPI(
    title="DairyHub API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://dairy-hub-sable.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(subscription_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(auth_router)
app.include_router(order_router)
app.include_router(wishlist_router)
app.include_router(dashboard_router)
app.include_router(user_router)
app.include_router(profile_router)
app.include_router(contact_router)

@app.get("/")
def home():
    return {"message": "Welcome to DairyHub Backend"}


