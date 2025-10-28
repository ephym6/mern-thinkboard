import Note from "../models/Note.js";

export async function getAllNotes (req, res)  {
    try {
        const { uid } = req.user;
        const notes = await Note.find({ userId: uid }).sort({ createdAt: -1 }); // Show latest notes first for the logged-in user
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes in getAllNotes controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getNoteById (req, res) {
    try {
        const id = req.params.id;
        const { uid } = req.user;
        const note = await Note.findOne({ _id: id, userId: uid });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({message: 'Note found', note});
    } catch (error) {
        console.error('Error fetching note by ID in getNoteById controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function createNote (req, res){
    try {
        const { title, content } = req.body;
        const { uid } = req.user;
        const newNote = new Note({ title, content, userId: uid });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error('Error creating note in createNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function updateNote (req, res){
    try {
        const id = req.params.id;
        const { uid } = req.user;
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: uid },
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        console.error('Error updating note in updateNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteNote (req, res) {
    try {
        const id = req.params.id;
        const { uid } = req.user;
        const deletedNote = await Note.findOneAndDelete({ _id: id, userId: uid });
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note in deleteNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
