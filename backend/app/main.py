# backend/app/main.py
from fastapi import FastAPI , HTTPException
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
import os


app = FastAPI()

# Allow frontend on localhost to access backend
app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "http://localhost:3000",                      # for local testing
        "https://ai-assistant-frontend-9ksh.onrender.com",  # for production
    "*"
    ],  
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
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
    
    if not payload.images:
        raise HTTPException(status_code=400, detail="No images provided")

    for img_base64 in payload.images:
        try:
            # Handle base64 with/without header
            if "base64," in img_base64:
                header, encoded = img_base64.split(",", 1)
            else:
                encoded = img_base64
                
            img_data = base64.b64decode(encoded)
            image = Image.open(BytesIO(img_data))
            
            # Convert to RGB if needed
            if image.mode in ("RGBA", "P"):
                image = image.convert("RGB")
                
            raw_text = process_images_to_text(image)
            cleaned = clean_ocr_text(raw_text)
            extracted_text.append(cleaned)
        except Exception as e:
            print(f"Image processing error: {str(e)}")
            continue

    full_text = "\n".join(extracted_text)
    try:
        response = ask_groq(full_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI processing failed: {str(e)}")

    return {
        "ocr_text": full_text,
        "groq_response": response
    }

# Required for Render deployment
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
        reload=False,
        workers=4  
    )