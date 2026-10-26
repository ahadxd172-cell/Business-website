import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import quotesRouter from './routes/quotes.js';
import configRouter from './routes/config.js';
import uploadRouter from './routes/upload.js';
import authRouter from './routes/auth.js';
import { seedAdmin } from './models/Admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Connect Database (MongoDB Atlas) and seed default admin
(async () => {
  await connectDB();
  await seedAdmin();
})();

// Middleware
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (e.g. hero images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/config', configRouter);
app.use('/api/upload', uploadRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Sunvolt Business API',
    time: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('⚡ Sunvolt Solar Business API is active. Access /api/quotes or /api/health');
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Sunvolt Backend Server running on port ${PORT}`);
  console.log(`📡 API Health:  http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth API:    http://localhost:${PORT}/api/auth/login`);
  console.log(`📋 Quotes API:  http://localhost:${PORT}/api/quotes`);
  console.log(`⚙️  Config API:  http://localhost:${PORT}/api/config`);
  console.log(`📁 Uploads:     http://localhost:${PORT}/uploads/\n`);
});
