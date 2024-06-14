import express from 'express';
import bookRoutes from './routes/books.js';
import mongoose from 'mongoose';
import config from '../config.js'; 
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const connectToDB = async () => {
    try {
        await mongoose.connect(config.db_uri, config.db_options);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message);
        process.exit(1);
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/books', bookRoutes);

// Connect to MongoDB
connectToDB();

export default app;
