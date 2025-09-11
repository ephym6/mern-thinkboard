import express from 'express';
const router = express.Router();

export default router;

router.get('/', (req, res) => {
    res.status(200).send('you got 3 note');
});

router.post('/', (req, res) => {
    res.status(201).json({ message: 'Note created successfully' });
});

router.put('/:id', (req, res) => {
    res.status(201).json({ message: 'Note updated successfully' });
});

router.delete('/:id', (req, res) => {
    res.status(201).json({ message: 'Note deleted successfully' });
});