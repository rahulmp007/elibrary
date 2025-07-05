const USER_ROLES = {
  AUTHOR: "Author",
  BORROWER: "Borrower",
  LIBRARIAN: "Librarian",
};

const BOOK_STATUS = {
  AVAILABLE: "available",
  BORROWED: "borrowed",
  MAINTENANCE: "maintenance",
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// MULTILINGUAL MESSAGES - English and Hindi
const MESSAGES = {
  en: {
    // Auth
    USER_CREATED: "User created successfully",
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid credentials",
    TOKEN_REQUIRED: "Authorization token required",
    INVALID_TOKEN: "Invalid token",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
    USER_ALREADY_EXISTS: "User already exists with this email",

    // Books
    BOOK_CREATED: "Book created successfully",
    BOOK_UPDATED: "Book updated successfully",
    BOOK_DELETED: "Book deleted successfully",
    BOOK_NOT_FOUND: "Book not found",
    BOOK_BORROWED: "Book borrowed successfully",
    BOOK_RETURNED: "Book returned successfully",
    BOOK_ALREADY_BORROWED: "Book is already borrowed",
    BOOK_NOT_BORROWED: "Book is not currently borrowed",
    BOOK_RETRIEVED: "Book retrieved successfully",
    BOOKS_RETRIEVED: "Books retrieved successfully",

    // Libraries
    LIBRARY_CREATED: "Library created successfully",
    LIBRARY_UPDATED: "Library updated successfully",
    LIBRARY_DELETED: "Library deleted successfully",
    LIBRARY_NOT_FOUND: "Library not found",
    LIBRARY_RETRIEVED: "Library retrieved successfully",
    LIBRARIES_RETRIEVED: "Libraries retrieved successfully",
    LIBRARY_INVENTORY_RETRIEVED: "Library inventory retrieved successfully",
    BOOK_ADDED_TO_LIBRARY: "Book added to library inventory",
    BOOK_REMOVED_FROM_LIBRARY: "Book removed from library inventory",

    // Borrowing
    BORROWED_BOOKS_RETRIEVED: "Borrowed books retrieved successfully",

    // Auth Profile
    PROFILE_RETRIEVED: "Profile retrieved successfully",

    // Validation
    VALIDATION_ERROR: "Validation error",
    REQUIRED_FIELD: "This field is required",
    INVALID_EMAIL: "Invalid email format",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
    DUPLICATE_ENTRY: "Entry already exists",
    INVALID_ID: "Invalid ID format",

    // General
    SERVER_ERROR: "Internal server error",
    NOT_FOUND: "Resource not found",
  },
  hi: {
    // Auth
    USER_CREATED: "उपयोगकर्ता सफलतापूर्वक बनाया गया",
    LOGIN_SUCCESS: "लॉगिन सफल",
    INVALID_CREDENTIALS: "अमान्य क्रेडेंशियल",
    TOKEN_REQUIRED: "प्राधिकरण टोकन आवश्यक",
    INVALID_TOKEN: "अमान्य टोकन",
    UNAUTHORIZED: "अनधिकृत पहुंच",
    FORBIDDEN: "पहुंच निषिद्ध",
    USER_ALREADY_EXISTS: "इस ईमेल के साथ उपयोगकर्ता पहले से मौजूद है",

    // Books
    BOOK_CREATED: "पुस्तक सफलतापूर्वक बनाई गई",
    BOOK_UPDATED: "पुस्तक सफलतापूर्वक अपडेट की गई",
    BOOK_DELETED: "पुस्तक सफलतापूर्वक हटाई गई",
    BOOK_NOT_FOUND: "पुस्तक नहीं मिली",
    BOOK_BORROWED: "पुस्तक सफलतापूर्वक उधार ली गई",
    BOOK_RETURNED: "पुस्तक सफलतापूर्वक वापस की गई",
    BOOK_ALREADY_BORROWED: "पुस्तक पहले से उधार में है",
    BOOK_NOT_BORROWED: "पुस्तक वर्तमान में उधार में नहीं है",
    BOOK_RETRIEVED: "पुस्तक सफलतापूर्वक प्राप्त की गई",
    BOOKS_RETRIEVED: "पुस्तकें सफलतापूर्वक प्राप्त की गईं",

    // Libraries
    LIBRARY_CREATED: "पुस्तकालय सफलतापूर्वक बनाया गया",
    LIBRARY_UPDATED: "पुस्तकालय सफलतापूर्वक अपडेट किया गया",
    LIBRARY_DELETED: "पुस्तकालय सफलतापूर्वक हटाया गया",
    LIBRARY_NOT_FOUND: "पुस्तकालय नहीं मिला",
    LIBRARY_RETRIEVED: "पुस्तकालय सफलतापूर्वक प्राप्त किया गया",
    LIBRARIES_RETRIEVED: "पुस्तकालय सफलतापूर्वक प्राप्त किए गए",
    LIBRARY_INVENTORY_RETRIEVED: "पुस्तकालय सूची सफलतापूर्वक प्राप्त की गई",
    BOOK_ADDED_TO_LIBRARY: "पुस्तक पुस्तकालय सूची में जोड़ी गई",
    BOOK_REMOVED_FROM_LIBRARY: "पुस्तक पुस्तकालय सूची से हटाई गई",

    // Borrowing
    BORROWED_BOOKS_RETRIEVED: "उधार की गई पुस्तकें सफलतापूर्वक प्राप्त की गईं",

    // Auth Profile
    PROFILE_RETRIEVED: "प्रोफ़ाइल सफलतापूर्वक प्राप्त की गई",

    // Validation
    VALIDATION_ERROR: "सत्यापन त्रुटि",
    REQUIRED_FIELD: "यह फ़ील्ड आवश्यक है",
    INVALID_EMAIL: "अमान्य ईमेल प्रारूप",
    PASSWORD_LENGTH: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
    DUPLICATE_ENTRY: "प्रविष्टि पहले से मौजूद है",
    INVALID_ID: "अमान्य आईडी प्रारूप",

    // General
    SERVER_ERROR: "आंतरिक सर्वर त्रुटि",
    NOT_FOUND: "संसाधन नहीं मिला",
  }
};

module.exports = {
  USER_ROLES,
  BOOK_STATUS,
  HTTP_STATUS,
  MESSAGES,
};