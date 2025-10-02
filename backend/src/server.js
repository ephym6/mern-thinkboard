import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import connectDB from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json()); // To parse JSON bodies
app.use(rateLimiter); // Rate limiting middleware

// Simple logging middleware
// app.use((req, res, next) => {
//     console.log("We just got a new request")
//     console.log(`Request Method: ${req.method}`);
//     console.log(`Request URL: ${req.url}`);
//     next();
// });

// Notes Routes
app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

