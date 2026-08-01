from pydantic import BaseModel


class Wishlist(BaseModel):
    product_id: str