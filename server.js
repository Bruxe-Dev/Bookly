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

app.get('/', (req, res) => {
    res.json({
        message: 'BOOKLY',
        version: '1.0.0',
        endpoints: {
            books: '/books',
            statistics: '/books/statistics'
        },
        documentation: 'See README.md for full API documentation'
    });
});

app.use('/books', bookRoutes)

app.use(errorHandler)

//Starting the server

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(` Server running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`${'='.repeat(60)}\n`);

    console.log('  AVAILABLE ENDPOINTS:\n');
    console.log('GET    /books              - Get all books (with filters, sorting, pagination)');
    console.log('GET    /books/statistics   - Get bookstore statistics');
    console.log('GET    /books/:id          - Get single book by ID');
    console.log('POST   /books              - Create new book');
    console.log('PUT    /books/:id          - Update book by ID');
    console.log('DELETE /books/:id          - Delete book by ID\n');

    console.log('  FILTERING EXAMPLES:\n');
    console.log('  /books?category=Fiction');
    console.log('  /books?author=tolkien');
    console.log('  /books?minPrice=10&maxPrice=30');
    console.log('  /books?minRating=4');
    console.log('  /books?year=2018');
    console.log('  /books?inStock=true');
    console.log('  /books?search=harry\n');

    console.log(' SORTING EXAMPLES:\n');
    console.log('  /books?sort=price&order=asc    (cheapest first)');
    console.log('  /books?sort=price&order=desc   (most expensive first)');
    console.log('  /books?sort=rating&order=desc  (highest rated first)');
    console.log('  /books?sort=year&order=desc    (newest first)');
    console.log('  /books?sort=title&order=asc    (alphabetical)\n');

    console.log(' PAGINATION EXAMPLES:\n');
    console.log('  /books?page=1&limit=5');
    console.log('  /books?page=2&limit=10\n');

    console.log(' COMBINED EXAMPLES:\n');
    console.log('  /books?category=Fiction&sort=price&order=asc&page=1&limit=5');
    console.log('  /books?minRating=4&sort=rating&order=desc&inStock=true');
    console.log('  /books?search=programming&minPrice=20&maxPrice=50&sort=price');
    console.log('  /books?category=Biography&year=2018&sort=title&order=asc\n');

    console.log(`${'='.repeat(60)}\n`);
});