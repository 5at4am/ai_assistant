# backend/app/schemas.py
from pydantic import BaseModel
from typing import List

class ImagePayload(BaseModel):
    images: List[str]
