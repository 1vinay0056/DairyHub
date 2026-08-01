from pydantic import BaseModel
from typing import Literal


class Order(BaseModel):
    address: str
    payment_method: Literal["COD", "ONLINE"] = "COD"