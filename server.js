require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const Book = require('./models/Book')
const bookRoutes = require('./routes/bookRoute')
const connectDB = require('./config/db')
const {
    getBooks,
    getBookBtId,
    createBook,
    updateBook,
    deleteBook,
    getStatistics,
} = require('../controllers/bookController');
const app = express()

connectDB() //Connection to the database


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV == 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`)
        next();
    })
}