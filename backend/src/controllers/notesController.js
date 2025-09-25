import Note from "../models/Note.js";

export async function getAllNotes (req, res)  {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes in getAllNotes controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function createNote (req, res){
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error('Error creating note in createNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function updateNote (req, res){
    try {
        const { id } = req.params.id;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        console.error('Error updating note in updateNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteNote = (req, res) => {
    res.status(201).json({ message: 'Note deleted successfully' });
};