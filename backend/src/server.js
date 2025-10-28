import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    }));
}
app.use(express.json()); // To parse JSON bodies
app.use(rateLimiter); // Rate limiting middleware

// Simple logging middleware
// app.use((req, res, next) => {
//     console.log("We just got a new request")
//     console.log(`Request Method: ${req.method}`);
//     console.log(`Request URL: ${req.url}`);
//     next();
// });

// Auth Routes
app.use('/api/auth', authRoutes);

// Notes Routes
app.use('/api/notes', notesRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

