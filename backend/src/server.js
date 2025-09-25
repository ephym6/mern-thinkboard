import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log("We just got a new request")
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});

// Notes Routes
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});