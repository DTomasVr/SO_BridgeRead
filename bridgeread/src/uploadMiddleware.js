import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';

// Set storage engine
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder to store files
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${_extname(file.originalname)}`);
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB file size limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).fields([{ name: 'audiobook', maxCount: 1 }, { name: 'ebook', maxCount: 1 }]);

// Check file type
function checkFileType(file, cb) {
    const filetypes = /pdf|epub|mp3|m4b/; // Allowed extensions
    const extname = filetypes.test(_extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files Only!');
    }
}

export default upload;
