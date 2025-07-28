# TruthStream API Documentation

## Base URL
```
https://api.truthstream.app
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### Connect Wallet
```http
POST /api/auth/connect
```

**Request Body:**
```json
{
  "address": "xion1...",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "address": "xion1...",
    "name": "User Name",
    "trustScore": 85
  }
}
```

### User Management

#### Get User Stats
```http
GET /api/user/stats
```

**Response:**
```json
{
  "totalExperiences": 12,
  "trustScore": 85,
  "tokensEarned": 1250,
  "rank": 156
}
```

#### Get User Profile
```http
GET /api/user/profile
```

**Response:**
```json
{
  "id": "user_id",
  "address": "xion1...",
  "name": "User Name",
  "email": "user@example.com",
  "avatar": "https://...",
  "trustScore": 85,
  "totalExperiences": 12,
  "tokensEarned": 1250,
  "rank": 156,
  "joinDate": "2025-01-01T00:00:00Z",
  "achievements": [...]
}
```

#### Update User Profile
```http
PUT /api/user/profile
```

**Request Body:**
```json
{
  "name": "New Name",
  "email": "new@example.com",
  "avatar": "https://new-avatar-url"
}
```

### Experiences

#### Get User Experiences
```http
GET /api/user/experiences?filter=all
```

**Query Parameters:**
- `filter`: `all`, `dining`, `event`, `purchase`, `travel`, `fitness`, `entertainment`

**Response:**
```json
[
  {
    "id": "exp_id",
    "type": "dining",
    "title": "Dinner at Restaurant",
    "description": "Amazing experience...",
    "location": "New York, NY",
    "photos": ["https://..."],
    "verified": true,
    "confidence": 0.95,
    "trustScore": 95,
    "tokensEarned": 150,
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

#### Create Experience
```http
POST /api/experiences
```

**Request Body:**
```json
{
  "type": "dining",
  "title": "Dinner at Restaurant",
  "description": "Amazing experience...",
  "location": "New York, NY",
  "photos": ["https://..."]
}
```

#### Verify Experience
```http
PUT /api/experiences/:id/verify
```

**Request Body:**
```json
{
  "proofs": {
    "location": {...},
    "payment": {...},
    "social": {...}
  },
  "verified": true,
  "confidence": 0.95,
  "tokensEarned": 150
}
```

### Marketplace

#### Get Active Challenges
```http
GET /api/challenges
```

**Response:**
```json
[
  {
    "id": "challenge_id",
    "title": "Coffee Shop Explorer",
    "description": "Visit 5 different coffee shops...",
    "brandName": "Starbucks",
    "brandLogo": "https://...",
    "reward": 500,
    "difficulty": "Easy",
    "participants": 1234,
    "endDate": "2025-02-01T00:00:00Z",
    "requirements": [...]
  }
]
```

#### Get Brand Opportunities
```http
GET /api/opportunities
```

**Response:**
```json
[
  {
    "id": "opp_id",
    "title": "Restaurant Review Campaign",
    "description": "Write authentic reviews...",
    "brandName": "OpenTable",
    "brandLogo": "https://...",
    "payment": 100,
    "requirements": [
      "Verified dining experiences",
      "Trust score above 80"
    ]
  }
]
```

#### Join Challenge
```http
POST /api/challenges/:id/join
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined challenge"
}
```

#### Apply to Opportunity
```http
POST /api/opportunities/:id/apply
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

### Activity

#### Get Recent Activity
```http
GET /api/user/activity
```

**Response:**
```json
[
  {
    "title": "Restaurant verification completed",
    "time": "2 hours ago",
    "reward": 50,
    "icon": "restaurant"
  }
]
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Experience Verified
Triggered when an experience is successfully verified.

**Payload:**
```json
{
  "event": "experience.verified",
  "data": {
    "experienceId": "exp_id",
    "userId": "user_id",
    "trustScore": 95,
    "tokensEarned": 150
  }
}
```

### Trust Score Updated
Triggered when a user's trust score changes.

**Payload:**
```json
{
  "event": "trust_score.updated",
  "data": {
    "userId": "user_id",
    "oldScore": 80,
    "newScore": 85
  }
}
```