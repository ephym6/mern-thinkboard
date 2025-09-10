import express from 'express';

const app = express();

app.get('/api/notes', (req, res) => {
    res.status(200).send('you got 1 note');
});

app.listen(5001, () => {
    console.log('Server is running on PORT 5001');
})