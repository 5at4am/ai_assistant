# backend/app/cleaner.py
import re

def clean_ocr_text(raw_text: str) -> str:
    if not raw_text:
        return ""

    # Remove URLs, localhost, IPs
    text = re.sub(r'https?://\S+|www\.\S+|localhost:\d+|127\.0\.0\.1:\d+', '', raw_text)

    # Remove common UI junk
    blacklist = [
        "React App", "localhost", "screenshot", "share your screen",
        "Upgrade plan", "GitHub", "AI Screen Assistant", "Ask anything",
        "©", "@", "ENG", "PM", "share", "Start subscription", "Minera iene"
    ]
    for word in blacklist:
        text = text.replace(word, "")

    # Remove duplicated lines
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    unique_lines = list(dict.fromkeys(lines))
    text = "\n".join(unique_lines)

    # Remove excessive whitespace
    text = re.sub(r"\n{2,}", "\n", text)
    text = re.sub(r"\s{2,}", " ", text)

    # Remove non-ASCII characters
    text = text.encode("ascii", "ignore").decode()

    return text.strip()
