import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use('/api/notes', notesRoutes);

app.listen(5001, () => {
    console.log('Server is running on PORT 5001');
})




// mongodb+srv://ephym:<db_password>@cluster0.g9bmm85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0