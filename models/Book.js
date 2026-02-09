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
            required: [true, 'Category is required'],
            enum: {
                values: ['literal-fiction', 'science-fiction', 'mystery', 'science-tech', 'business', 'classics', 'History', 'Fiction'],
                message: '{VALUE} is not a valid category'
            }
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
            required: [true, 'Stock Quantity is required'],
            min: 0
        },
        coverImage: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

bookSchema.index({ category: 1, price: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ rating: -1 });
bookSchema.index({ year: -1 });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;