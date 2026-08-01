from pydantic import BaseModel
from typing import Literal


class UpdateOrderStatus(BaseModel):
    status: Literal[
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]