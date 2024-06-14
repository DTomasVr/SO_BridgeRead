import express from "express";
import multer from 'multer';
import path from 'path';
import booksController from "../controllers/Books.Controller.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder to store files
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|epub|mp3|m4b/; // Allowed extensions
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Files Only!');
        }
    }
}).fields([{ name: 'audiobook', maxCount: 1 }, { name: 'ebook', maxCount: 1 }]);

// Routes
router.get('/', booksController.index);

router.post('/', upload, booksController.save);

router.put('/:id', upload, booksController.updateBook);

router.get('/:id', booksController.getBookById);

router.get('/:id/audiobook', booksController.getAudiobookById);

router.get('/:id/ebook', booksController.getEbookById);

export default router;
