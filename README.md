# Elibrary Service API

A comprehensive library management system built with Node.js, Express, and MongoDB, featuring role-based access control, multilingual support, and Firebase integration.

## 🏗️ **Architecture & Features**

### **Core Models**
- **Users**: Authors, Borrowers, and Librarians with role-based permissions
- **Books**: Complete book management with Firebase image storage
- **Libraries**: Library management with inventory control

### **Key Features**
- ✅ **Role-Based Authentication**: JWT with Author/Borrower/Librarian roles
- ✅ **Multilingual Support**: English and Hindi localization
- ✅ **Firebase Integration**: Book cover image storage
- ✅ **Library Inventory Management**: Add/remove books from library collections
- ✅ **Book Borrowing System**: Complete borrowing workflow with charges
- ✅ **Security**: Rate limiting, input validation, CORS protection
- ✅ **Error Handling**: Centralized multilingual error management

## 📁 **Project Structure**
```
bookkeeping-service/
├── src/
│   ├── config/
│   │   ├── constants.js      # Application constants & multilingual messages
│   │   ├── database.js       # MongoDB connection
│   │   ├── firebase.js       # Firebase configuration
│   │   └── index.js          # Environment configuration
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── borrow.controller.js
│   │   └── library.controller.js
│   ├── middlewares/          # Custom middleware
│   │   ├── auth.middleware.js      # JWT authentication & authorization
│   │   ├── error.middleware.js     # Centralized error handling
│   │   ├── language.middleware.js  # Multilingual support
│   │   ├── upload.middleware.js    # File upload handling
│   │   └── validation.middleware.js # Input validation
│   ├── models/               # MongoDB schemas
│   │   ├── User.model.js
│   │   ├── Book.model.js
│   │   └── Library.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   ├── borrow.routes.js
│   │   └── library.routes.js
│   ├── services/             # Business logic
│   │   ├── auth.service.js
│   │   ├── book.service.js
│   │   ├── borrow.service.js
│   │   ├── library.service.js
│   │   └── upload.service.js
│   ├── utils/                # Utilities
│   │   ├── localization.js   # Message localization
│   │   ├── logger.js         # Winston logger
│   │   ├── pagination.js     # Pagination helpers
│   │   └── response.js       # Response formatters
│   ├── validators/           # Input validation schemas
│   │   ├── auth.validator.js
│   │   ├── book.validator.js
│   │   ├── borrow.validator.js
│   │   └── library.validator.js
│   └── app.js               # Express application setup
├── logs/                    # Application logs
├── package.json
├── .env.example
└── index.js                # Application entry point
```

## 🚀 **Installation & Setup**

### **1. Clone and Install Dependencies**
```bash
git clone <repository-url>
cd bookkeeping-service
npm install
```

### **2. Environment Configuration**
Create a `.env` file in the root directory:
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/elib

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=24h

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

### **3. Database Setup (Local MongoDB)**
```bash
# Option 1: Install MongoDB locally
# Download from: https://www.mongodb.com/try/download/community
# Follow installation guide for your OS

# Option 2: Use MongoDB Atlas (Cloud - Free)
# 1. Sign up at https://www.mongodb.com/atlas
# 2. Create a free cluster
# 3. Get connection string and add to .env

# Option 3: Quick local setup with Docker (Optional)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### **4. Firebase Setup**
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Storage in your Firebase project
3. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Add the credentials to your `.env` file

### **5. Start the Application**
```bash
# Development mode
npm start

# The server will start on http://localhost:3000
```

## 📡 **API Documentation**

### **Base URL**: `http://localhost:3000/api/v1`

### **Authentication**
All endpoints (except registration and login) require JWT authentication:
```
Authorization: Bearer <jwt_token>
```

### **Multilingual Support**
Add language preference via header or query parameter:
```
Accept-Language: hi  # For Hindi
# Or
GET /api/v1/books?lang=hi
```

### **API Endpoints**

#### **Authentication**
```
POST /api/v1/users/register    # Register new user
POST /api/v1/users/login       # User login
GET  /api/v1/users/profile     # Get user profile (protected)
```

#### **Books Management**
```
GET    /api/v1/books           # Get all books (with pagination)
GET    /api/v1/books/:id       # Get book details with relationships
POST   /api/v1/books           # Create new book (Authors only, with image upload)
PUT    /api/v1/books/:id       # Update book (Author ownership required)
DELETE /api/v1/books/:id       # Delete book (Author ownership required)
```

#### **Libraries Management**
```
GET    /api/v1/libraries           # Get all libraries
GET    /api/v1/libraries/:id       # Get library with all books
POST   /api/v1/libraries           # Create library (Librarians only)
PUT    /api/v1/libraries/:id       # Update library (Librarians only)
DELETE /api/v1/libraries/:id       # Delete library (Librarians only)
```

#### **Library Inventory**
```
GET    /api/v1/libraries/:id/inventory         # Get library inventory
POST   /api/v1/libraries/:id/inventory         # Add book to library (Librarians only)
DELETE /api/v1/libraries/:id/inventory/:bookId # Remove book from library (Librarians only)
```

#### **Book Borrowing**
```
POST /api/v1/borrow              # Borrow a book (Borrowers only)
PUT  /api/v1/borrow/return/:id   # Return a book (Borrowers only)
GET  /api/v1/borrow/borrowed     # Get user's borrowed books (Borrowers only)
```

### **Request/Response Examples**

#### **User Registration**
```bash
POST /api/v1/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Author",
  "phone": "+1234567890"
}
```

#### **Create Book with Image**
```bash
POST /api/v1/books
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "title": "Sample Book",
  "library": "library_id",
  "genre": "Fiction",
  "description": "A sample book",
  "publishedYear": 2023,
  "pages": 300,
  "borrowingCharge": 10,
  "image": <image_file>
}
```

#### **Borrow Book**
```bash
POST /api/v1/borrow
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bookId": "book_id",
  "days": 14
}
```

## 🔐 **User Roles & Permissions**

| Role | Permissions |
|------|-------------|
| **Author** | Create, update, delete own books |
| **Borrower** | Borrow and return books, view libraries |
| **Librarian** | Manage libraries, library inventory, view all books |

## 🌐 **Multilingual Support**

The API supports English and Hindi:
- **English** (default): `en`
- **Hindi**: `hi`

**Language Detection Priority:**
1. User profile language preference
2. `Accept-Language` header
3. Query parameter `?lang=hi`
4. Default to English

## 🛡️ **Security Features**

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Authorization**: Fine-grained permission control
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation with express-validator
- **CORS Protection**: Cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers

## 📝 **Development Notes**

### **Local Development Tips**
- Use **nodemon** for auto-restart during development
- MongoDB will automatically create the `elib` database on first connection
- Images are stored in Firebase Storage (free tier available)
- All logs are written to `logs/` directory
- API responses include detailed error messages for debugging

### **Common Commands**
```bash
# View application logs
tail -f logs/combined.log

# Clear logs
rm logs/*.log

# Check MongoDB connection
# Connect to: mongodb://localhost:27017/elib
```

## 🏃 **Running the Application**

### **Start the Server**
```bash
npm start
# Server will start on http://localhost:3000
```

### **Testing the API**
You can test the endpoints using:
- **Postman** - Import the API collection (if available)
- **Any REST client**

### **Basic Test**
```bash
# Check if server is running
curl http://localhost:3000/health

# Register a new user
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "role": "Author"
  }'
```

## 🔧 **Local Configuration**

The application is configured for local development:
- **MongoDB**: Connects to `mongodb://localhost:27017/elib`
- **Port**: Runs on `http://localhost:3000`
- **Logging**: Console output + file logging
- **Environment**: Development mode with detailed error messages

## 📝 **Logging**

- **Winston Logger**: Structured logging with file rotation
- **Log Files**: `logs/error.log`, `logs/combined.log`
- **Console Logging**: Development mode only
- **Request Logging**: Morgan HTTP request logger

## 🚨 **Error Handling**

Centralized error handling with:
- **Validation Errors**: Input validation failures
- **Authentication Errors**: JWT and authorization failures
- **Database Errors**: MongoDB operation failures
- **Business Logic Errors**: Custom application errors
- **Multilingual Error Messages**: Localized error responses

## 📞 **Health Check**

Monitor application health:
```
GET /health

Response:
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2023-12-07T10:30:00.000Z",
  "uptime": 3600.123
}
```

---

**A simple, local bookkeeping service built with Node.js, Express, and MongoDB - ready to run locally!** 📚