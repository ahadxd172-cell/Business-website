# Sunvolt Business Backend API

Node.js + Express backend service for the Sunvolt Business Website. Handles solar estimate quotes, dynamic hero configuration, image uploads, and database storage.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Your Database
Open `.env` in the `backend/` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/sunvolt
```

> **Note:** If MongoDB is not yet running on your computer, the backend automatically uses safe Local JSON Storage (`backend/data/quotes.json`) so your server never crashes. As soon as you add a valid MongoDB URI, it automatically persists to MongoDB!

### 3. Run Development Server
```bash
npm run dev
```

---

## 🔌 Connecting Different Databases

### Option A: MongoDB (Local or Atlas Cloud) - Ready Out of the Box!
- **Local MongoDB**: Ensure MongoDB service is running and set `MONGO_URI=mongodb://localhost:27017/sunvolt`.
- **MongoDB Atlas (Free Cloud)**:
  1. Create a free cluster on [mongodb.com/atlas](https://www.mongodb.com/atlas).
  2. Copy your connection string.
  3. Paste into `backend/.env`:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sunvolt?retryWrites=true&w=majority
     ```

### Option B: PostgreSQL / MySQL
If you prefer PostgreSQL or MySQL, Prisma can be installed:
```bash
npm install @prisma/client prisma
npx prisma init
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/quotes` | Submit a new quote from website form |
| `GET` | `/api/quotes` | Retrieve all submitted customer quotes |
| `DELETE` | `/api/quotes/:id` | Delete a quote by ID |
| `GET` | `/api/config` | Retrieve website configuration & hero settings |
| `PUT` | `/api/config` | Update hero title, description, or hero image URL |
| `POST` | `/api/upload` | Upload a new image (hero, project, team) via multipart form |

---

## 🖼️ Dynamic Hero Image & Uploads
Images uploaded to `/api/upload` are automatically saved to `backend/uploads/` and served statically at:
`http://localhost:5000/uploads/<filename>`
