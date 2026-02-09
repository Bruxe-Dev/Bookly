require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');


const books = [
    // Literal Fiction
    { title: 'The Remains of the Day', author: 'Kazuo Ishiguro', price: 14.99, category: 'literal-fiction', publisher: 'Vintage', year: 1989, rating: 4.5, stock: 18 },
    { title: 'Beloved', author: 'Toni Morrison', price: 16.99, category: 'literal-fiction', publisher: 'Vintage', year: 1987, rating: 4.6, stock: 22 },
    { title: 'The Road', author: 'Cormac McCarthy', price: 15.99, category: 'literal-fiction', publisher: 'Vintage', year: 2006, rating: 4.3, stock: 25 },
    { title: 'Life of Pi', author: 'Yann Martel', price: 17.99, category: 'literal-fiction', publisher: 'Mariner Books', year: 2001, rating: 4.4, stock: 20 },
    { title: 'The Kite Runner', author: 'Khaled Hosseini', price: 16.99, category: 'literal-fiction', publisher: 'Riverhead Books', year: 2003, rating: 4.7, stock: 30 },

    // Science Fiction
    { title: 'Dune', author: 'Frank Herbert', price: 18.99, category: 'science-fiction', publisher: 'Ace', year: 1965, rating: 4.8, stock: 35 },
    { title: 'Foundation', author: 'Isaac Asimov', price: 14.99, category: 'science-fiction', publisher: 'Spectra', year: 1951, rating: 4.6, stock: 28 },
    { title: 'Neuromancer', author: 'William Gibson', price: 15.99, category: 'science-fiction', publisher: 'Ace', year: 1984, rating: 4.2, stock: 20 },
    { title: 'The Martian', author: 'Andy Weir', price: 16.99, category: 'science-fiction', publisher: 'Crown', year: 2011, rating: 4.7, stock: 40 },
    { title: 'Snow Crash', author: 'Neal Stephenson', price: 17.99, category: 'science-fiction', publisher: 'Bantam', year: 1992, rating: 4.3, stock: 22 },
    { title: 'Ender\'s Game', author: 'Orson Scott Card', price: 14.99, category: 'science-fiction', publisher: 'Tor Books', year: 1985, rating: 4.6, stock: 32 },

    // Mystery
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', price: 16.99, category: 'mystery', publisher: 'Vintage', year: 2005, rating: 4.5, stock: 26 },
    { title: 'Gone Girl', author: 'Gillian Flynn', price: 15.99, category: 'mystery', publisher: 'Crown', year: 2012, rating: 4.2, stock: 30 },
    { title: 'The Da Vinci Code', author: 'Dan Brown', price: 18.99, category: 'mystery', publisher: 'Doubleday', year: 2003, rating: 3.9, stock: 35 },
    { title: 'Big Little Lies', author: 'Liane Moriarty', price: 16.99, category: 'mystery', publisher: 'Berkley', year: 2014, rating: 4.3, stock: 24 },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', price: 12.99, category: 'mystery', publisher: 'Penguin Classics', year: 1902, rating: 4.5, stock: 20 },
    { title: 'Murder on the Orient Express', author: 'Agatha Christie', price: 13.99, category: 'mystery', publisher: 'William Morrow', year: 1934, rating: 4.4, stock: 28 },

    // Science & Tech
    { title: 'Sapiens', author: 'Yuval Noah Harari', price: 22.99, category: 'science-tech', publisher: 'Harper', year: 2014, rating: 4.7, stock: 40 },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', price: 18.99, category: 'science-tech', publisher: 'Bantam', year: 1988, rating: 4.6, stock: 30 },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', price: 16.99, category: 'science-tech', publisher: 'Oxford', year: 1976, rating: 4.5, stock: 25 },
    { title: 'Cosmos', author: 'Carl Sagan', price: 20.99, category: 'science-tech', publisher: 'Ballantine', year: 1980, rating: 4.8, stock: 28 },
    { title: 'The Innovators', author: 'Walter Isaacson', price: 24.99, category: 'science-tech', publisher: 'Simon & Schuster', year: 2014, rating: 4.4, stock: 22 },
    { title: 'Clean Code', author: 'Robert C. Martin', price: 42.99, category: 'science-tech', publisher: 'Prentice Hall', year: 2008, rating: 4.7, stock: 35 },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', price: 44.99, category: 'science-tech', publisher: 'Addison-Wesley', year: 2019, rating: 4.8, stock: 30 },

    // Business
    { title: 'Good to Great', author: 'Jim Collins', price: 27.99, category: 'business', publisher: 'HarperBusiness', year: 2001, rating: 4.5, stock: 32 },
    { title: 'The Lean Startup', author: 'Eric Ries', price: 23.99, category: 'business', publisher: 'Crown Business', year: 2011, rating: 4.4, stock: 28 },
    { title: 'Zero to One', author: 'Peter Thiel', price: 22.99, category: 'business', publisher: 'Crown Business', year: 2014, rating: 4.5, stock: 30 },
    { title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', price: 21.99, category: 'business', publisher: 'Farrar', year: 2011, rating: 4.6, stock: 26 },
    { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', price: 24.99, category: 'business', publisher: 'Harper Business', year: 2014, rating: 4.5, stock: 24 },
    { title: 'Atomic Habits', author: 'James Clear', price: 16.99, category: 'business', publisher: 'Avery', year: 2018, rating: 4.8, stock: 45 },

    // Classics
    { title: 'Pride and Prejudice', author: 'Jane Austen', price: 10.99, category: 'classics', publisher: 'Penguin Classics', year: 1813, rating: 4.7, stock: 30 },
    { title: 'Moby-Dick', author: 'Herman Melville', price: 12.99, category: 'classics', publisher: 'Penguin Classics', year: 1851, rating: 4.2, stock: 18 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, category: 'classics', publisher: 'Scribner', year: 1925, rating: 4.5, stock: 35 },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', price: 11.99, category: 'classics', publisher: 'Penguin Classics', year: 1847, rating: 4.6, stock: 25 },
    { title: 'Wuthering Heights', author: 'Emily Brontë', price: 10.99, category: 'classics', publisher: 'Penguin Classics', year: 1847, rating: 4.3, stock: 22 },
    { title: 'Great Expectations', author: 'Charles Dickens', price: 13.99, category: 'classics', publisher: 'Penguin Classics', year: 1861, rating: 4.4, stock: 20 },

    // History
    { title: 'Guns Germs and Steel', author: 'Jared Diamond', price: 19.99, category: 'History', publisher: 'W. W. Norton', year: 1997, rating: 4.3, stock: 24 },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', price: 10.99, category: 'History', publisher: 'Bantam', year: 1947, rating: 4.8, stock: 30 },
    { title: 'A People\'s History of the United States', author: 'Howard Zinn', price: 21.99, category: 'History', publisher: 'Harper Perennial', year: 1980, rating: 4.5, stock: 22 },
    { title: 'The Rise and Fall of the Third Reich', author: 'William L. Shirer', price: 24.99, category: 'History', publisher: 'Simon & Schuster', year: 1960, rating: 4.6, stock: 18 },
    { title: '1776', author: 'David McCullough', price: 18.99, category: 'History', publisher: 'Simon & Schuster', year: 2005, rating: 4.4, stock: 20 },

    // Fiction (General)
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99, category: 'Fiction', publisher: 'Harper Perennial', year: 1960, rating: 4.8, stock: 40 },
    { title: '1984', author: 'George Orwell', price: 11.99, category: 'Fiction', publisher: 'Signet Classic', year: 1949, rating: 4.7, stock: 38 },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 13.99, category: 'Fiction', publisher: 'Little, Brown', year: 1951, rating: 3.8, stock: 25 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15.99, category: 'Fiction', publisher: 'Mariner Books', year: 1937, rating: 4.7, stock: 42 },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 18.99, category: 'Fiction', publisher: 'Scholastic', year: 1997, rating: 4.9, stock: 50 },
    { title: 'The Alchemist', author: 'Paulo Coelho', price: 13.99, category: 'Fiction', publisher: 'HarperCollins', year: 1988, rating: 4.3, stock: 35 },
    { title: 'The Book Thief', author: 'Markus Zusak', price: 16.99, category: 'Fiction', publisher: 'Knopf', year: 2005, rating: 4.6, stock: 28 }
];


const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' Connected to MongoDB\n');

        // Clear existing data
        await Book.deleteMany({});
        console.log('  Cleared existing books\n');

        // Insert new books
        await Book.insertMany(books);
        console.log(` Successfully inserted ${books.length} books\n`);

        // Show category breakdown
        const categories = books.reduce((acc, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1;
            return acc;
        }, {});

        console.log('--- Books by Category ---');
        Object.entries(categories).forEach(([cat, count]) => {
            console.log(`${cat}: ${count} books`);
        });
        console.log('------------------------\n');

        // Disconnect
        await mongoose.disconnect();
        console.log(' Database seeded successfully and disconnected\n');

    } catch (error) {
        console.error(' Seeding failed:', error.message);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();