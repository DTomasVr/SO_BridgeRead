import Book from '../models/Books.js'

async function index(req, res, next){
    try{
        const books = await Book.find();
        return res.status(200).json({
            status: 200,
            data: books
        });
    }catch (e) {
        console.log(e)
        return res.status(500).json({
            message: e
        });
    }
}

async function save(req, res, next) {
    try {
        const book = new Book({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            author: req.body.author,
            genre: req.body.genre,
            audiobook: req.files['audiobook'] ? {
                filename: req.files['audiobook'][0].filename,
                path: req.files['audiobook'][0].path
            } : null,
            ebook: req.files['ebook'] ? {
                filename: req.files['ebook'][0].filename,
                path: req.files['ebook'][0].path
            } : null
        });
        await book.save();

        return res.status(201).json({
            status: 201,
            data: book
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

async function getBookById(req, res, next) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAudiobookById(req, res, next) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || !book.audiobook) {
            return res.status(404).json({ message: 'Audiobook not found for this book' });
        }
        res.redirect(book.audiobook.path);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getEbookById(req, res, next) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || !book.ebook) {
            return res.status(404).json({ message: 'Ebook not found for this book' });
        }
        res.redirect(book.ebook.path);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateBook(req, res, next) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = req.body.title || book.title;
        book.description = req.body.description || book.description;
        book.price = req.body.price || book.price;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;

        if (req.files['audiobook']) {
            book.audiobook = {
                filename: req.files['audiobook'][0].filename,
                path: req.files['audiobook'][0].path
            };
        }

        if (req.files['ebook']) {
            book.ebook = {
                filename: req.files['ebook'][0].filename,
                path: req.files['ebook'][0].path
            };
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    index,
    save,
    getBookById,
    getAudiobookById,
    getEbookById,
    updateBook
};