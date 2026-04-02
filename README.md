# 📚 Bookly API: Complete Backend with Filtering, Sorting & Pagination

A professional-grade RESTful API for managing a bookstore, built with Node.js, Express, and MongoDB. Features comprehensive filtering, sorting, and pagination capabilities.

## 🚀 Features

-  **Full CRUD Operations** - Create, Read, Update, Delete books
-  **Advanced Filtering** - Filter by category, author, price range, rating, year, stock status, and more
-  **Flexible Sorting** - Sort by any field (price, rating, year, title, etc.) in ascending or descending order
-  **Smart Pagination** - Efficient pagination with metadata (total pages, current page, hasNext/hasPrevious)
-  **Statistics Endpoint** - Get aggregate statistics about your bookstore
-  **Data Validation** - Comprehensive schema validation using Mongoose
-  **Error Handling** - Professional error handling with detailed messages
-  **RESTful Design** - Follows REST principles and best practices

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- MongoDB Compass (optional, for viewing data)

### Setup Steps

1. **Extract the project files** to your desired location

2. **Navigate to the project directory**
   ```bash
   cd bookstore
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   - The `.env` file is already configured for local MongoDB
   - If using MongoDB Atlas, update the `MONGO_URI` in `.env`

5. **Seed the database with sample books**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   ```

7. **Server should be running at** `http://localhost:4040`

---

## 🗄️ Database Schema

Each book has the following fields:

```javascript
{
  title: String (required, 1-200 chars),
  author: String (required),
  isbn: String (unique, optional),
  price: Number (required, min: 0),
  category: String (required, enum: Fiction, Non-Fiction, Programming, Science, History, Biography, Self-Help, Business),
  publisher: String (required),
  year: Number (required, 1000-current year),
  rating: Number (required, 1-5),
  stock: Number (required, min: 0),
  description: String (optional, max: 2000 chars),
  coverImage: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4040
```

### 1. Get All Books (with Filtering, Sorting, Pagination)

**Endpoint:** `GET /books`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `category` | String | Filter by category | `Fiction` |
| `author` | String | Filter by author (partial match) | `tolkien` |
| `minPrice` | Number | Minimum price | `10` |
| `maxPrice` | Number | Maximum price | `30` |
| `minRating` | Number | Minimum rating (1-5) | `4` |
| `maxRating` | Number | Maximum rating (1-5) | `5` |
| `year` | Number | Filter by exact year | `2018` |
| `minYear` | Number | Minimum year | `2000` |
| `maxYear` | Number | Maximum year | `2020` |
| `inStock` | Boolean | Show only in-stock books | `true` |
| `search` | String | Search in title and author | `harry` |
| `sort` | String | Field to sort by | `price`, `rating`, `year`, `title` |
| `order` | String | Sort direction | `asc` or `desc` |
| `page` | Number | Page number (default: 1) | `1` |
| `limit` | Number | Items per page (default: 10, max: 100) | `10` |

**Examples:**

```bash
# Get all books (default: page 1, 10 per page)
GET /books

# Filter by category
GET /books?category=Fiction

# Filter by price range
GET /books?minPrice=10&maxPrice=30

# Filter by rating (4 stars and above)
GET /books?minRating=4

# Filter by year
GET /books?year=2018

# Filter in-stock books only
GET /books?inStock=true

# Search in title and author
GET /books?search=harry

# Sort by price (cheapest first)
GET /books?sort=price&order=asc

# Sort by rating (highest first)
GET /books?sort=rating&order=desc

# Pagination
GET /books?page=2&limit=5

# Combined: Fiction books, $10-$30, sorted by price, 5 per page
GET /books?category=Fiction&minPrice=10&maxPrice=30&sort=price&order=asc&page=1&limit=5

# Combined: Programming books, rated 4+, in stock, newest first
GET /books?category=Programming&minRating=4&inStock=true&sort=year&order=desc
```

**Response Format:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": 42.99,
      "category": "Programming",
      "rating": 4.7,
      ...
    }
  ],
  "pagination": {
    "totalBooks": 50,
    "totalPages": 10,
    "currentPage": 1,
    "limit": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "filters": {
    "category": "Programming",
    "priceRange": { "min": null, "max": null },
    "ratingRange": { "min": 4, "max": null },
    ...
  },
  "sorting": {
    "field": "price",
    "order": "ascending"
  }
}
```

---

### 2. Get Single Book by ID

**Endpoint:** `GET /books/:id`

**Example:**
```bash
GET /books/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    ...
  }
}
```

---

### 3. Create New Book

**Endpoint:** `POST /books`

**Request Body:**
```json
{
  "title": "New Book Title",
  "author": "Author Name",
  "isbn": "978-1234567890",
  "price": 29.99,
  "category": "Fiction",
  "publisher": "Publisher Name",
  "year": 2024,
  "rating": 4.5,
  "stock": 25,
  "description": "Book description here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

---

### 4. Update Book by ID

**Endpoint:** `PUT /books/:id`

**Request Body:** (send only fields you want to update)
```json
{
  "price": 24.99,
  "stock": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### 5. Delete Book by ID

**Endpoint:** `DELETE /books/:id`

**Response:**
```json
{
  "success": true,
  "message": "\"Clean Code\" has been deleted successfully"
}
```

---

### 6. Get Statistics

**Endpoint:** `GET /books/statistics`

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": {
      "totalBooks": 31,
      "averagePrice": 22.54,
      "averageRating": 4.52,
      "totalStock": 723,
      "minPrice": 10.99,
      "maxPrice": 54.99
    },
    "byCategory": [
      {
        "_id": "Fiction",
        "count": 7,
        "averagePrice": 14.13,
        "averageRating": 4.57
      },
      ...
    ]
  }
}
```

---

## 🧪 Testing with Postman or Browser

### Using Browser (for GET requests only)

Simply paste these URLs in your browser:

```
http://localhost:4040/books
http://localhost:4040/books?category=Fiction
http://localhost:4040/books?sort=price&order=asc
http://localhost:4040/books/statistics
```

### Using Postman (for all request types)

1. **GET requests:** Just paste the URL
2. **POST/PUT requests:** 
   - Set method to POST or PUT
   - Go to "Body" tab
   - Select "raw" and "JSON"
   - Paste the JSON request body

---

## 🎯 Real-World Use Cases

### Example 1: Display Fiction Books, Cheapest First
```
GET /books?category=Fiction&sort=price&order=asc
```

Your frontend would display these books sorted by price, allowing customers to find affordable fiction books.

---

### Example 2: Show Only Highly-Rated In-Stock Programming Books
```
GET /books?category=Programming&minRating=4&inStock=true&sort=rating&order=desc
```

Perfect for a "Best Programming Books" section on your website.

---

### Example 3: Paginated Search Results
```
GET /books?search=javascript&page=1&limit=10
```

Display 10 books per page when someone searches for "javascript".

---

### Example 4: Books Published in Last 5 Years
```
GET /books?minYear=2019&sort=year&order=desc
```

Great for a "New Releases" section.

---

## 📊 How Filtering, Sorting, and Pagination Work

### **Filtering**
- Client sends: `?category=Fiction&minPrice=10&maxPrice=20`
- Server builds MongoDB query: `{ category: 'Fiction', price: { $gte: 10, $lte: 20 } }`
- Only matching books are returned

### **Sorting**
- Client sends: `?sort=price&order=asc`
- Server adds to query: `.sort({ price: 1 })`
- Books are arranged from cheapest to most expensive

### **Pagination**
- Client sends: `?page=2&limit=10`
- Server calculates: `skip = (2 - 1) × 10 = 10`
- Server adds to query: `.skip(10).limit(10)`
- Returns books 11-20 (page 2)

### **All Together**
```javascript
Book.find({ category: 'Fiction', price: { $gte: 10, $lte: 20 } })
    .sort({ price: 1 })
    .skip(10)
    .limit(10)
```

This finds Fiction books between $10-$20, sorts by price ascending, and returns page 2 (books 11-20).

---

## 🛠️ Project Structure

```
bookstore/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   └── Book.js               # Mongoose schema
├── controllers/
│   └── bookController.js     # Business logic
├── routes/
│   └── books.js              # Route definitions
├── middleware/
│   └── errorHandler.js       # Error handling
├── server.js                 # Entry point
├── seed.js                   # Database seeding
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
└── README.md                 # Documentation
```

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (`mongod` command)
- Check MongoDB Compass can connect to `mongodb://localhost:27017`
- Verify `.env` file has correct `MONGO_URI`

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 3000

### Seeding Fails
- Ensure MongoDB is running
- Check for validation errors in terminal
- Try running `npm run seed` again


## 📝 License

This project is created for educational purposes.

---

## 🤝 Support

If you encounter any issues or have questions, please refer to this README or check the code comments in each file.

**Happy Coding and reading! 📚✨**
