from pydantic import BaseModel, Field


class CartItem(BaseModel):
    product_id: str = Field(..., description="Product ID")
    quantity: int = Field(default=1, ge=1, description="Quantity")