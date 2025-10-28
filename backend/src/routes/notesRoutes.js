import express from 'express';
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controllers/notesController.js";
import { authenticateUser } from '../middleware/auth.js';
const router = express.Router();

router.get('/', authenticateUser, getAllNotes);

router.get('/:id', authenticateUser, getNoteById);

router.post('/', authenticateUser, createNote);

router.put('/:id', authenticateUser, updateNote);

router.delete('/:id', authenticateUser, deleteNote);

export default router;