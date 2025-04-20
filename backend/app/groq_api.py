# backend/app/groq_api.py
import os
from dotenv import load_dotenv
from groq import Groq 

# Load environment variables from .env file
load_dotenv()

def ask_groq(prompt: str) -> str:
    # Initialize Groq client with API key
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
           model="llama3-8b-8192"  # working model 
        )
        
        return chat_completion.choices[0].message.content
        
    except Exception as e:
        return f"Error accessing Groq API: {str(e)}"