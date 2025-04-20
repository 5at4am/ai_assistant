# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.ocr import process_images_to_text
from app.groq_api import ask_groq
from typing import List
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
from app.cleaner import clean_ocr_text  
from app.schemas import ImagePayload


app = FastAPI()

# Allow frontend on localhost to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^http://localhost:\d+$",
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
     
    return {"message": "AI Screen Assistant Backend Running"}

@app.post("/chat")
def get_ai_response(data: dict):
    prompt = data.get("prompt", "")
    response = ask_groq(prompt)
    return {"response": response}


class ImagePayload(BaseModel):
    images: List[str]
@app.post("/analyze")
async def analyze_images(payload: ImagePayload):
    extracted_text = []

    for img_base64 in payload.images:
        try:
            header, encoded = img_base64.split(",", 1)
            img_data = base64.b64decode(encoded)
            image = Image.open(BytesIO(img_data))
            raw_text = process_images_to_text(image)
            cleaned = clean_ocr_text(raw_text)  
            extracted_text.append(cleaned)
        except Exception as e:
            print("Error processing image:", e)

    full_text = "\n".join(extracted_text)
    response = ask_groq(full_text)

    return {
        "ocr_text": full_text,
        "groq_response": response
    }
