# Role-Based Login Flow Diagram

## 🔐 Login Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│  CLIENT REQUEST (POST /auth/login)                          │
│  {                                                          │
│    "name": "John Student",                                  │
│    "email": "student@test.com",                             │
│    "password": "password123",                               │
│    "role": "student"                                        │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  1️⃣  VALIDATION (AuthValidation)  │
        │  Joi Schema Check                 │
        └──────────────────────────────────┘
                           │
                   ┌───────┴───────┐
                   │               │
              PASS │               │ FAIL
                   │               │
                   ▼               ▼
            Continue        ❌ Return 400
                           Validation Error
                   │
                   ▼
    ┌────────────────────────────────────┐
    │  2️⃣  FIND USER (AuthController)    │
    │  Query: { email, role }            │
    │  Check MongoDB                     │
    └────────────────────────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
      FOUND │                │ NOT FOUND
          │                 │
          ▼                 ▼
    Continue         ❌ Return 401
                     "User not found"
          │
          ▼
    ┌────────────────────────────────────┐
    │  3️⃣  VERIFY NAME (AuthController)  │
    │  req.body.name == user.name ?      │
    └────────────────────────────────────┘
          │
      ┌───┴───┐
      │       │
    MATCH │   │ NO MATCH
      │       │
      ▼       ▼
    Continue  ❌ Return 401
              "Name doesn't match"
      │
      ▼
    ┌─────────────────────────────────────┐
    │  4️⃣  VERIFY PASSWORD (AuthController) │
    │  bcrypt.compare(input, hashed)      │
    └─────────────────────────────────────┘
      │
   ┌──┴──┐
   │     │
  VALID │  │ INVALID
   │     │
   ▼     ▼
Continue ❌ Return 401
         "Password incorrect"
   │
   ▼
┌──────────────────────────────────┐
│  ✅ LOGIN SUCCESS (200)          │
│  {                               │
│    "success": true,              │
│    "message": "Login successful",│
│    "user": {                     │
│      "id": "...",                │
│      "name": "John Student",     │
│      "email": "student@test.com",│
│      "role": "student"           │
│    }                             │
│  }                               │
└──────────────────────────────────┘
```

---

## 📊 Request/Response Flow

```
REQUEST PHASE                    PROCESSING PHASE              RESPONSE PHASE
───────────────────────────────────────────────────────────────────────────────

Client                          Express Server                  Database
  │                                │                               │
  │ POST /auth/login             │                               │
  ├────────────────────────────────>│                               │
  │                               │                               │
  │                               │ Validation                    │
  │                               │ (AuthValidation)              │
  │                               │ Check: name, email,           │
  │                               │        password, role         │
  │                               │                               │
  │                               │ Find User                     │
  │                               ├──────────────────────────────>│
  │                               │ Query: {email, role}          │
  │                               │                               │
  │                               │<──────────────────────────────┤
  │                               │ User Document                 │
  │                               │                               │
  │                               │ Verify Name                   │
  │                               │ (Compare strings)             │
  │                               │                               │
  │                               │ Verify Password               │
  │                               │ (bcrypt.compare)              │
  │                               │                               │
  │ ✅ Response (200)            │                               │
  │<────────────────────────────────┤                               │
  │ {success, message, user}      │                               │
  │                               │                               │
```

---

## 🔄 Error Flow Paths

```
REQUEST → VALIDATION ERROR (400)
          │
          ├─> Missing field
          ├─> Invalid email format
          ├─> Invalid role enum
          └─> Password too short

REQUEST → AUTHENTICATION ERROR (401)
          │
          ├─> User not found by email+role
          ├─> Name doesn't match stored name
          ├─> Password is incorrect
          └─> Invalid email/role combination

REQUEST → SERVER ERROR (500)
          │
          ├─> MongoDB connection failed
          ├─> Bcrypt comparison error
          └─> Unexpected exception
```

---

## 🎯 Validation Details

```
FIELD           RULE                          VALIDATION
─────────────────────────────────────────────────────────
name            String                        ✓ 3-100 chars
                                             ✓ Required

email           Valid email format            ✓ Must be email
                                             ✓ Required

password        String                        ✓ 4-100 chars
                                             ✓ Required

role            One of enum values            ✓ Must be one of:
                                               - student
                                               - faculty
                                               - hod
                                               - coordinator
                                               - admin
                                             ✓ Required
```

---

## 🔐 Security Checks

```
STEP            SECURITY MEASURE              PURPOSE
──────────────────────────────────────────────────────
Input           Joi Validation                Prevent invalid data
Validation      Type checking                 Ensure correct format

User Query      { email, role }               Only get user with
                Database lookup               matching role

Name Check      String comparison             Prevent email reuse
                Exact match required          across roles

Password        Bcrypt comparison             Secure password
Verification    Hash-based check              verification
                One-way function              No plaintext storage

Error Messages  Generic messages              Prevent user
                Don't leak info               enumeration
```

---

## 📈 Database Query Example

```javascript
// Step 1: Find user by email AND role
const user = await UserModel.findOne({
  email: "student@test.com",
  role: "student"
});

// MongoDB Query:
// db.users.findOne({
//   email: "student@test.com",
//   role: "student"
// })

// Returns:
// {
//   _id: ObjectId("..."),
//   name: "John Student",
//   email: "student@test.com",
//   password: "$2b$10$...hashed...",  // Bcrypt hash
//   role: "student",
//   createdAt: ISODate("..."),
//   updatedAt: ISODate("...")
// }
```

---

## 🎯 Success Response Structure

```json
{
  "success": true,                    ← Authentication succeeded
  "message": "Login successful",      ← Human-readable message
  "user": {                           ← User data object
    "id": "507f1f77bcf86cd799439011",← MongoDB _id
    "name": "John Student",           ← Full name
    "email": "student@test.com",      ← Email
    "role": "student"                 ← User role
  }
}
```

---

## ❌ Error Response Structure

```json
{
  "success": false,                          ← Authentication failed
  "message": "Error message describing why" ← Clear error description
}

// OR (Validation Errors Only)

{
  "success": false,
  "message": "Validation Error",
  "details": [                               ← Array of field errors
    "\"name\" is required",
    "\"role\" must be one of [...]"
  ]
}
```

---

## 🚀 Complete Request Example

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

**Timeline:**
1. Client sends POST request (10ms)
2. Express receives request (1ms)
3. Body parser processes JSON (1ms)
4. Validation middleware checks fields (5ms)
5. Controller queries MongoDB (50ms)
6. Bcrypt compares password (200ms)
7. Response sent back (5ms)
8. **Total: ~272ms**

---

## 🔍 What Gets Checked

✅ **Input Phase**
- All required fields present
- Email is valid format
- Password meets length requirement
- Role is in allowed list

✅ **Database Phase**
- User exists with email
- User has matching role
- User document retrieved

✅ **Authentication Phase**
- Name matches exactly
- Password hash matches input
- All checks passed

✅ **Response Phase**
- Success message sent
- User data returned
- Sensitive data excluded

---

## 🛡️ What Doesn't Get Checked

❌ Password strength (enforced by frontend/admin)
❌ Email verification (assumed pre-verified)
❌ Two-factor authentication (not implemented)
❌ Rate limiting (can be added as middleware)
❌ IP blocking (can be added as middleware)
❌ Request signatures (no token system)

---

## 📱 Different Scenarios

### Scenario 1: All Fields Valid ✅
```
Input: All correct
  ↓
Result: Login Success (200)
```

### Scenario 2: Wrong Password ❌
```
Input: Correct email/role/name, wrong password
  ↓
Check: Password doesn't match
  ↓
Result: Auth Failed (401)
Message: "Password is incorrect"
```

### Scenario 3: Non-existent User ❌
```
Input: Email that doesn't exist
  ↓
Check: No user found with email+role
  ↓
Result: Auth Failed (401)
Message: "User not found"
```

### Scenario 4: Wrong Role ❌
```
Input: Email exists but different role
  ↓
Check: No user with email+THIS_role
  ↓
Result: Auth Failed (401)
Message: "Invalid email/role"
```

### Scenario 5: Missing Field ❌
```
Input: Missing required field
  ↓
Check: Validation fails
  ↓
Result: Validation Error (400)
Message: "Field is required"
```

---

## 🎓 Learning Sequence

**Start Here:** POST /auth/login request
  ↓
**Then:** Understand Validation (Joi schema)
  ↓
**Then:** Learn Query (MongoDB findOne)
  ↓
**Then:** Study Bcrypt (password comparison)
  ↓
**Finally:** See Response (success/error format)

---

This diagram shows the complete authentication flow for your role-based login system!
