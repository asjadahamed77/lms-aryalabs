import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import adminLecturerRouter from './routes/adminLecturerRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173'];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// DB Connection
(async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connected');
    await db.sync();
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
})();

// Routes
app.use('/api/admin/lecturer', adminLecturerRouter);
app.use('/api/auth',authRouter );


app.get('/', (req, res) => {
  res.send("API WORKING...");
});

app.listen(port, () => console.log(`🚀 Server Started on Port ${port}`));
