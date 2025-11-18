# Backend Refactor - Role-Based Login System

## Overview
Complete refactor of the backend to support **role-based login** with clean ES Modules architecture.

## What Changed

### 1. ✅ ES Modules Conversion
- All files now use `import/export` syntax (ES6+)
- All import paths include `.js` extension
- `package.json` has `"type": "module"` configured

### 2. ✅ Folder Structure
```
backend/
├── index.js                    # Main server entry point
├── .env                       # Environment variables
├── Models/
│   ├── db.js                  # MongoDB connection
│   └── User.js                # User schema with role support
├── Controllers/
│   └── AuthController.js       # Login logic
├── Routes/
│   └── AuthRouter.js          # Route definitions
├── Middlewares/
│   └── AuthValidation.js      # Input validation
└── package.json               # Dependencies
```

### 3. ✅ Database Connection (db.js)
- Loads `.env` file with `dotenv`
- Connects to MongoDB using `MONGO_CONN` environment variable
- Includes error handling and validation
- **Helpful error messages if connection fails**

### 4. ✅ User Model (User.js)
- Updated roles: `student`, `faculty`, `hod`, `coordinator`, `admin`
- Fields: `name`, `email`, `password`, `role`
- Timestamps enabled for created/updated tracking
- Email is lowercase and unique
- All imports use `.js` extension

### 5. ✅ Login Controller (AuthController.js)
**Removed:** Signup functionality (login-only as requested)

**Login Process:**
1. Extract `name`, `email`, `password`, `role` from request body
2. Query MongoDB for user with **matching email AND role**
3. Verify `name` matches stored user name
4. Compare password using `bcrypt`
5. Return user data on success or detailed error on failure

**Response Format:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "student"
  }
}
```

### 6. ✅ Validation Middleware (AuthValidation.js)
- Validates all 4 required fields: `name`, `email`, `password`, `role`
- Role must be one of: `student`, `faculty`, `hod`, `coordinator`, `admin`
- Returns validation errors with details if validation fails
- **Removed signup validation** (login-only)

### 7. ✅ Routes (AuthRouter.js)
- Single clean route: `POST /auth/login`
- Applies validation middleware before controller
- Removed duplicate routes and test endpoints
- Removed signup route

### 8. ✅ Server (index.js)
- Clean startup with informative console logs
- Health check endpoint: `GET /health`
- 404 handler for undefined routes
- Proper middleware ordering (body-parser, cors)
- All imports with `.js` extension

### 9. ✅ Environment Variables (.env)
```env
# MongoDB Connection String (already configured)
MONGO_CONN=mongodb+srv://...

# Server Port (defaults to 8080)
PORT=8080
```

## How to Use

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Server
```bash
npm start
```
Server runs on `http://localhost:8080`

### 3. Test Login Endpoint

**Request:**
```bash
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Responses:**
- **400 - Validation Error:** Missing fields or invalid role
- **401 - Authentication Failed:** Invalid email, role, name, or password
- **500 - Server Error:** Database or connection error

## Important Notes

✅ **All files are production-ready**
✅ **Uses async/await and try/catch**
✅ **Bcrypt for password verification**
✅ **No JWT tokens** (as requested - only simple JSON response)
✅ **Role-based authentication** implemented
✅ **All imports include .js extension**
✅ **ES Modules throughout** (no CommonJS)
✅ **Comprehensive error handling**
✅ **Detailed console logs**

## Testing

### Using cURL:
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"password123",
    "role":"student"
  }'
```

### Using Postman:
1. Create POST request to `http://localhost:8080/auth/login`
2. Set header: `Content-Type: application/json`
3. Paste the JSON body from example above
4. Send request

## Next Steps (If Needed)
- Add JWT token generation (if required)
- Add refresh token mechanism
- Add logout endpoint
- Add signup endpoint (currently removed)
- Add role-based authorization middleware
- Add request logging/monitoring
