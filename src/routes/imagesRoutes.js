import path, { dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const imageRouter = express.Router();
const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

imageRouter.get('/bibit/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(__dirname, '../../public/images/bibit', imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    })
});

imageRouter.get('/user/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(__dirname, '../../public/images/user', imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

export default imageRouter;