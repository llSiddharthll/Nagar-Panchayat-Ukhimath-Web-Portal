# Nagar-Panchayat-Ukhimath-Web-Portal

### 🚀 Project Setup & Run Guide

---

### 🖥️ Frontend (Next.js)

#### 2. Go to the frontend directory

```bash
cd frontend
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Run the development server

```bash
npm run dev
```

#### 5. Access the frontend

Open your browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### ⚙️ Backend (Django)

#### 6. Open a new terminal and go to the backend directory

```bash
cd backend
```

#### 7. Create and activate a virtual environment

```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 8. Install backend dependencies

```bash
pip install -r requirements.txt
```

#### 9. Apply migrations

```bash
python manage.py migrate
```

#### 10. Run the Django development server

```bash
python manage.py runserver
```

#### 11. Access the backend API

Visit:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 🔗 Notes

* Ensure both frontend (port 3000) and backend (port 8000) servers are running.
* Configure CORS and API URLs properly in your frontend (e.g., `.env.local`) to connect to the Django backend.
* If using environment variables, create `.env` or `.env.local` files in both folders with appropriate values.

---

Would you like me to include **instructions for running both with a single command** (like using `concurrently` or `npm scripts`)?

