const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }, category: {
            type: String,
            required: true,
            enum: ['literal-fiction', 'science-fiction', 'mystery', 'science-tech', 'business', 'classics', 'History']
        },
        publisher: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: Number,
            required: true,
            min: 1000
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;