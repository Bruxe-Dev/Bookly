const mongoose = require('mongoose')
const Book = require('./models/Book')

const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, category: 'Fiction', publisher: 'Scribner', year: 1925, rating: 4, stock: 15 },
    { title: 'Clean Code', author: 'Robert C. Martin', price: 29.99, category: 'Programming', publisher: 'Prentice Hall', year: 2008, rating: 5, stock: 30 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99, category: 'Fiction', publisher: 'Go Set', year: 1960, rating: 5, stock: 20 },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', price: 18.99, category: 'Science', publisher: 'Bantam', year: 1988, rating: 4, stock: 10 },
    { title: 'Steve Jobs', author: 'Walter Isaacson', price: 22.99, category: 'Biography', publisher: 'Simon Schuster', year: 2011, rating: 4, stock: 8 },
    { title: 'The Art of War', author: 'Sun Tzu', price: 9.99, category: 'History', publisher: 'Penguin', year: 500, rating: 3, stock: 25 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', price: 19.99, category: 'Non-Fiction', publisher: 'Harper', year: 2014, rating: 5, stock: 18 },
    { title: 'Design Patterns', author: 'Gang of Four', price: 44.99, category: 'Programming', publisher: 'Addison Wesley', year: 1994, rating: 4, stock: 12 },
    { title: '1984', author: 'George Orwell', price: 11.99, category: 'Fiction', publisher: 'Secker', year: 1949, rating: 5, stock: 22 },
    { title: 'The Alchemist', author: 'Paulo Coelho', price: 13.99, category: 'Fiction', publisher: 'HarperCollins', year: 1988, rating: 4, stock: 30 },
    { title: 'Educated', author: 'Tara Westover', price: 16.99, category: 'Biography', publisher: 'Random House', year: 2018, rating: 4, stock: 14 },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', price: 39.99, category: 'Programming', publisher: 'Addison Wesley', year: 2019, rating: 5, stock: 9 },
    { title: 'Cosmos', author: 'Carl Sagan', price: 20.99, category: 'Science', publisher: 'Ballantine', year: 1980, rating: 5, stock: 16 },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', price: 10.99, category: 'Biography', publisher: 'Penguin', year: 1947, rating: 5, stock: 19 },
    { title: 'Guns Germs and Steel', author: 'Jared Diamond', price: 17.99, category: 'History', publisher: 'Norton', year: 1997, rating: 3, stock: 7 },
    { title: 'The Hobbit', author: 'J.R.R Tolkien', price: 15.99, category: 'Fiction', publisher: 'Allen Unwin', year: 1937, rating: 5, stock: 28 },
    { title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', price: 21.99, category: 'Non-Fiction', publisher: 'Farrar', year: 2011, rating: 4, stock: 11 },
    { title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', price: 14.99, category: 'Science', publisher: 'University of Chicago', year: 1962, rating: 3, stock: 6 },
    { title: 'Becoming', author: 'Michelle Obama', price: 24.99, category: 'Biography', publisher: 'Crown', year: 2018, rating: 4, stock: 20 },
    { title: 'JavaScript The Good Parts', author: 'Douglas Crockford', price: 19.99, category: 'Programming', publisher: 'O Reilly', year: 2008, rating: 4, stock: 13 }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');

        await Book.deleteMany({});
        console.log('Cleared existing books');

        await Book.insertMany(books);
        console.log(`Inserted ${books.length} books successfully`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
}

seedDatabase();