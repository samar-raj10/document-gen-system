## Testing the Role-Based Login System

### Sample Test Users (for MongoDB)

To test the login system, you'll need users in your MongoDB database with hashed passwords.

### Creating Test Users (via MongoDB Compass or shell)

Use this Node.js script to create test users with bcrypt-hashed passwords:

```javascript
import bcrypt from 'bcrypt';
import UserModel from './Models/User.js';
import './Models/db.js';

const createTestUsers = async () => {
  try {
    // Clear existing test users
    await UserModel.deleteMany({ email: { $in: ['student@test.com', 'faculty@test.com', 'hod@test.com', 'coordinator@test.com', 'admin@test.com'] } });

    const testUsers = [
      { name: 'John Student', email: 'student@test.com', password: 'password123', role: 'student' },
      { name: 'Jane Faculty', email: 'faculty@test.com', password: 'password123', role: 'faculty' },
      { name: 'Bob HOD', email: 'hod@test.com', password: 'password123', role: 'hod' },
      { name: 'Alice Coordinator', email: 'coordinator@test.com', password: 'password123', role: 'coordinator' },
      { name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' },
    ];

    for (const user of testUsers) {
      user.password = await bcrypt.hash(user.password, 10);
      await UserModel.create(user);
      console.log(`✓ Created: ${user.email}`);
    }

    console.log('✓ All test users created!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test users:', error);
    process.exit(1);
  }
};

createTestUsers();
```

Save this as `backend/scripts/seedUsers.js` and run: `node scripts/seedUsers.js`

### Test Cases with cURL

#### 1. Successful Login (Student)
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@test.com",
    "password": "password123",
    "role": "student"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Student",
    "email": "student@test.com",
    "role": "student"
  }
}
```

#### 2. Wrong Password
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@test.com",
    "password": "wrongpassword",
    "role": "student"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Authentication failed. Password is incorrect."
}
```

#### 3. Wrong Name (User exists but name doesn't match)
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wrong Name",
    "email": "student@test.com",
    "password": "password123",
    "role": "student"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Authentication failed. Name does not match."
}
```

#### 4. Non-existent User or Wrong Role
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@test.com",
    "password": "password123",
    "role": "faculty"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Authentication failed. Invalid email, role, or user does not exist."
}
```

#### 5. Missing Field (Validation Error)
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "password123",
    "role": "student"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation Error",
  "details": ["\"name\" is required"]
}
```

#### 6. Invalid Role
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@test.com",
    "password": "password123",
    "role": "superuser"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation Error",
  "details": ["\"role\" must be one of [student, faculty, hod, coordinator, admin]"]
}
```

### Available Roles

- `student` - Student user
- `faculty` - Faculty member
- `hod` - Head of Department
- `coordinator` - Program Coordinator
- `admin` - System Administrator

### Test All Roles

```bash
# Faculty Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Faculty","email":"faculty@test.com","password":"password123","role":"faculty"}'

# HOD Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob HOD","email":"hod@test.com","password":"password123","role":"hod"}'

# Coordinator Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Coordinator","email":"coordinator@test.com","password":"password123","role":"coordinator"}'

# Admin Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"password123","role":"admin"}'
```

### Using Postman

1. Open Postman
2. Create new POST request
3. URL: `http://localhost:8080/auth/login`
4. Headers tab: Set `Content-Type: application/json`
5. Body tab: Select "raw" → paste JSON from examples above
6. Click Send

### Health Check

Test if server is running:
```bash
curl http://localhost:8080/health
```

Should return:
```json
{
  "message": "Server is running",
  "timestamp": "2024-11-16T10:30:45.123Z"
}
```
