export const getAllNotes = (req, res) => {
    res.status(200).send('you got 3 note');
};

export const createNote = (req, res) => {
    res.status(201).json({ message: 'Note created successfully' });
};

export const updateNote = (req, res) => {
    res.status(201).json({ message: 'Note updated successfully' });
};

export const deleteNote = (req, res) => {
    res.status(201).json({ message: 'Note deleted successfully' });
};