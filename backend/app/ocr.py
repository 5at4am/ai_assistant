# backend/app/ocr.py

from paddleocr import PaddleOCR
from PIL import Image, ImageOps
import numpy as np
import unicodedata

# Initialize once (load model into memory)
ocr_model = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=False)

def downscale_image_if_needed(image, max_width=1600):
    """Downscale large images to speed up OCR."""
    if image.width > max_width:
        ratio = max_width / float(image.width)
        new_height = int(image.height * ratio)
        image = image.resize((max_width, new_height), Image.LANCZOS)
    return image

def auto_rotate_if_needed(image):
    """Rotate if image is accidentally sideways."""
    if image.height > image.width:
        return image.rotate(270, expand=True)
    return image

def trim_whitespace(image):
    """Crop image borders that are completely white."""
    return ImageOps.crop(image, border=10)

def clean_text_line(line):
    """Remove weird characters, normalize spacing."""
    cleaned = unicodedata.normalize("NFKD", line).encode("ascii", "ignore").decode("ascii")
    return cleaned.strip()

def process_images_to_text(image):
    """
    OCR pipeline using PaddleOCR:
    - Downscale, auto-rotate, trim
    - Run OCR with layout
    - Filter junk lines
    """
    try:
        image = downscale_image_if_needed(image)
        image = auto_rotate_if_needed(image)
        image = trim_whitespace(image)

        # Convert to OpenCV image (numpy array)
        img_np = np.array(image)

        # Run PaddleOCR
        results = ocr_model.ocr(img_np, cls=True)

        seen = set()
        cleaned = []
        blacklist = [
            "click", "button", "close", "share", "zoom", "subscribe", "upgrade",
            "assistant", "screen", "exit", "join", "watch", "live", "stream", "video"
        ]

        for line in results[0]:
            text = clean_text_line(line[1][0])
            if not text:
                continue
            lower = text.lower()
            if lower in seen:
                continue
            if any(b in lower for b in blacklist):
                continue
            seen.add(lower)
            cleaned.append(text)

        return "\n".join(cleaned)

    except Exception as e:
        print("❌ PaddleOCR failed:", e)
        return "⚠️ OCR processing error."
