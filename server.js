require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const Book = require('./models/Book')
const {
    getBooks,
    getBookBtId,
    createBook,
    updateBook,
    deleteBook,
    getStatistics,
} = require('../controllers/bookController');