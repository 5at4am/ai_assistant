# AI Screen Assistant Project

## Project Overview
This project is an AI Screen Assistant consisting of a backend built with Python (FastAPI) and a frontend built with React.js. The backend handles API requests and AI processing, while the frontend provides the user interface.

---

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn package manager
- **Tesseract OCR software (Windows users)**:  
  Download and install Tesseract OCR from [https://github.com/tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract).  
  Make sure to add Tesseract to your system PATH during installation so the backend can access it.
---

## Backend Setup (Python)

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn backend.app.main:app --reload
   ```

---

## Frontend Setup (React.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

3. Run the frontend development server:
   ```bash
   npm start
   ```
   or with yarn:
   ```bash
   yarn start
   ```

4. The frontend will be available at `http://localhost:3000` by default.

---

## How to Run the Project

1. Start the backend server first (see Backend Setup).
2. Start the frontend development server (see Frontend Setup).
3. Open your browser and navigate to `http://localhost:3000` to use the AI Screen Assistant.

---

## Additional Notes

- Make sure your backend server is running before using the frontend to avoid API errors.
- The `.gitignore` files are set up to ignore environment files, build artifacts, and dependencies to keep the repository clean.
- For any issues or questions, please refer to the project documentation or contact the maintainer.
