# E-Library Management System

A comprehensive library management system built with Node.js, Express.js, MongoDB, and Firebase for file storage. The system supports multiple user roles (Authors, Borrowers, and Librarians) with multilingual support (English and Hindi).

## 🚀 Features

- **Multi-role Authentication**: Support for Authors, Borrowers, and Librarians
- **Book Management**: Create, read, update, and delete books with image upload
- **Library Management**: Manage multiple libraries with inventory tracking
- **Borrowing System**: Book borrowing and returning with due date tracking
- **Multilingual Support**: English and Hindi language support
- **File Upload**: Firebase integration for book cover images
- **Rate Limiting**: API rate limiting for security
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling with localized messages
- **Pagination**: Efficient data pagination
- **Search**: Text-based book search functionality

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Firebase Storage
- **Validation**: Express Validator
- **File Upload**: Multer
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Firebase account for file storage

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd elibrary
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/elib

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Firebase private key here\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

# Application Settings
PASSWORD_MIN_LENGTH=8
MAX_BORROW_DAYS=30
DEFAULT_LATE_FEE_PER_DAY=5
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > Service Accounts
4. Generate a new private key
5. Enable Firebase Storage in your project
6. Copy the credentials to your `.env` file

### 5. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### 6. Create Required Directories

```bash
mkdir logs
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "Author",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

### Book Endpoints

#### Get All Books
```http
GET /books?page=1&limit=10&search=javascript
Authorization: Bearer <jwt_token>
```

#### Get Book by ID
```http
GET /books/:id
Authorization: Bearer <jwt_token>
```

#### Create Book (Authors only)
```http
POST /books
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "title": "JavaScript: The Good Parts",
  "library": "library_id_here",
  "isbn": "9780596517748",
  "genre": "Programming",
  "description": "A book about JavaScript",
  "publishedYear": 2008,
  "pages": 176,
  "borrowingCharge": 5.99,
  "image": <file>
}
```

#### Update Book (Authors only)
```http
PUT /books/:id
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

#### Delete Book (Authors only)
```http
DELETE /books/:id
Authorization: Bearer <jwt_token>
```

### Library Endpoints

#### Get All Libraries
```http
GET /libraries?page=1&limit=10
Authorization: Bearer <jwt_token>
```

#### Create Library (Librarians only)
```http
POST /libraries
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Central Library",
  "address": "123 Library St",
  "phone": "+1234567890",
  "email": "central@library.com",
  "description": "Main city library"
}
```

### Borrowing Endpoints

#### Borrow Book (Borrowers only)
```http
POST /borrow
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bookId": "book_id_here",
  "days": 14
}
```

#### Return Book (Borrowers only)
```http
PUT /borrow/return/:bookId
Authorization: Bearer <jwt_token>
```

#### Get Borrowed Books
```http
GET /borrow/borrowed
Authorization: Bearer <jwt_token>
```

## 👥 User Roles

### Author
- Create, update, and delete their own books
- View all books and libraries
- Upload book cover images

### Borrower
- View all books and libraries
- Borrow and return books
- View their borrowed books

### Librarian
- Create, update, and delete libraries
- Manage library inventory
- View all books and libraries
- Add/remove books from libraries

## 🌐 Multilingual Support

The API supports English and Hindi languages. Set the language preference using:

1. **User Profile**: Set `language` field to `'en'` or `'hi'`
2. **Accept-Language Header**: Include `Accept-Language: hi` in requests
3. **Query Parameter**: Add `?lang=hi` to requests

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive request validation
- **File Upload Security**: File type and content validation
- **Password Security**: Bcrypt hashing with salt rounds
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers

## 📁 Project Structure

```
├── config/
│   ├── constants.js      # Application constants and messages
│   ├── database.js       # MongoDB connection
│   ├── firebase.js       # Firebase configuration
│   └── index.js          # Main configuration
├── controllers/          # Request handlers
├── middlewares/          # Custom middleware
├── models/              # MongoDB schemas
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility functions
├── validators/          # Input validation rules
├── logs/                # Application logs
├── app.js               # Express app setup
└── README.md
```

## 🐛 Error Handling

The application includes comprehensive error handling with:

- Centralized error middleware
- Localized error messages
- Proper HTTP status codes
- Request validation errors
- Database operation errors
- Authentication and authorization errors

## 📝 Logging

Application logs are stored in the `logs/` directory:
- `error.log`: Error-level logs
- `combined.log`: All application logs

## 🧪 Health Check

```http
GET /health
```

Returns server status and uptime information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Firebase Upload Error**
   - Verify Firebase credentials
   - Check storage bucket permissions
   - Ensure Firebase Storage is enabled

3. **JWT Authentication Error**
   - Check JWT_SECRET in `.env`
   - Verify token format in Authorization header
   - Ensure token hasn't expired

4. **File Upload Issues**
   - Check file size (max 5MB)
   - Verify file type (JPEG, PNG, WebP)
   - Ensure proper Content-Type header

### Debug Mode

Set `NODE_ENV=development` in your `.env` file to enable:
- Console logging
- Detailed error messages
- Request logging


