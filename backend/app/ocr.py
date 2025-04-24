# backend/app/ocr.py

import pytesseract
from PIL import Image, ImageOps
import unicodedata

def downscale_image_if_needed(image, max_width=1600):
    """Downscale large images to speed up OCR."""
    if image.width > max_width:
        ratio = max_width / float(image.width)
        new_height = int(image.height * ratio)
        image = image.resize((max_width, new_height), Image.LANCZOS)
    return image

def auto_rotate_if_needed(image):
    """Rotate if image is accidentally sideways (landscape text on portrait image)."""
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
    Optimized OCR pipeline:
    - Downscales
    - Auto-rotates
    - Trims whitespace
    - Cleans garbage
    - Filters out UI noise
    """
    try:
        # Preprocessing
        image = downscale_image_if_needed(image)
        image = auto_rotate_if_needed(image)
        image = trim_whitespace(image)

        # OCR config
        custom_config = r"--psm 6 -c preserve_interword_spaces=1"
        raw_text = pytesseract.image_to_string(image, config=custom_config)

        # Cleanup
        lines = raw_text.split("\n")
        cleaned = []
        seen = set()
        blacklist = [
            "click", "button", "close", "share", "zoom", "subscribe", "upgrade",
            "assistant", "screen", "exit", "join", "watch", "live", "stream", "video"
        ]

        for line in lines:
            line = clean_text_line(line)
            if not line:
                continue
            lower_line = line.lower()
            if lower_line in seen:
                continue
            if any(keyword in lower_line for keyword in blacklist):
                continue
            seen.add(lower_line)
            cleaned.append(line)

        return "\n".join(cleaned)

    except Exception as e:
        print("❌ OCR failed:", e)
        return "⚠️ OCR processing error."
