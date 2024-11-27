# Mini Listing App Requirements (Initial Phase)

This document outlines the basic requirements to build a **mini listing app** using **Node.js**. The project will be expanded with advanced features in later phases.

---

## 1. Functional Requirements

### 1.1 User Features
1. **User Registration and Login**
   - Register via email and password.
   - Login functionality.
   - Simple profile management:
     - Update name and email.

2. **Business Listings**
   - Add and view business listings.
   - Business details include:
     - Name, category, contact info, and description.

3. **Search Functionality**
   - Search businesses by name or category.

4. **Reviews**
   - Users can:
     - Add a review with a rating.
     - View existing reviews for businesses.

---

### 1.2 Admin Features
1. **Dashboard**
   - View all users and businesses.
   - Delete inappropriate listings or reviews.

---

## 2. Technical Requirements

### 2.1 Tech Stack
- **Frontend**: Simple UI using HTML/CSS/JavaScript or a basic React app.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB for storing data.

---

### 2.2 API Endpoints

#### User Endpoints
- `POST /register`: Register a user.
- `POST /login`: Login a user.
- `GET /profile`: Get user profile.
- `PUT /profile`: Update user profile.

#### Business Endpoints
- `POST /business`: Add a new business.
- `GET /business`: List all businesses.
- `GET /business/:id`: Get details of a specific business.

#### Review Endpoints
- `POST /business/:id/review`: Add a review.
- `GET /business/:id/reviews`: Get all reviews for a business.

#### Admin Endpoints
- `GET /admin/users`: List all users.
- `DELETE /admin/business/:id`: Delete a business.
- `DELETE /admin/review/:id`: Delete a review.

---

### 2.3 Database Schema

#### **Users**
```json
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password"
}
```

#### **Businesses**
```json
{
  "_id": "businessId",
  "name": "Pizza Corner",
  "category": "Restaurant",
  "contact": "+1234567890",
  "description": "Best pizza in town!"
}
```

#### **Reviews**
```json
{
  "_id": "reviewId",
  "userId": "userId",
  "businessId": "businessId",
  "rating": 5,
  "review": "Great service!"
}
```