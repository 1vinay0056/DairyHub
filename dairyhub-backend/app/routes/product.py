from fastapi import APIRouter, HTTPException
from bson import ObjectId
from app.database import db
from app.models.product import Product
from fastapi import Depends
from app.dependencies import get_current_user

router = APIRouter(tags=["Products"])


# Get all products
@router.get("/products")
def get_products():
    products = []

    for product in db.products.find():
        product["_id"] = str(product["_id"])
        products.append(product)

    return products


# Get single product by ID
@router.get("/products/{product_id}")
def get_product(product_id: str):
    try:
        product = db.products.find_one({"_id": ObjectId(product_id)})

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        product["_id"] = str(product["_id"])
        return product

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Product ID")


# Add new product
@router.post("/products")
def add_product(product: Product):
    try:
        product_dict = product.model_dump()

        result = db.products.insert_one(product_dict)

        return {
            "message": "Product Added Successfully",
            "id": str(result.inserted_id)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Update product
@router.put("/products/{product_id}")
def update_product(product_id: str, product: Product):
    try:
        result = db.products.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": product.model_dump()}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")

        return {"message": "Product Updated Successfully"}

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Product ID")


# Delete product
@router.delete("/products/{product_id}")
def delete_product(product_id: str):
    try:
        result = db.products.delete_one({"_id": ObjectId(product_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")

        return {"message": "Product Deleted Successfully"}

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Product ID")
