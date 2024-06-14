import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true,
    },
    audiobook: {
        filename: String,
        path: String  
    },
    ebook: {
        filename: String,
        path: String 
    }
});

export default mongoose.model('Book', BookSchema);