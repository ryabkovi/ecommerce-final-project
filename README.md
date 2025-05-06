# E-Commerce Electronics Store

An online store for purchasing electronic products such as headphones, computers, home appliances, and more.

## 🛠 Technologies Used

- **Frontend:**
  React, React Router, Bootstrap, Tailwind CSS

- **Backend:**
  Node.js, Express

- **Database:**
  MongoDB

- **Authentication:**
  JWT (JSON Web Tokens) with role-based access for Admins and Users

- **Payment Integration:**
  PayPal (via PayPal JS SDK Sandbox)

## 🔐 Authentication

There are two separate login panels:

### Admin Panel

- **Purpose:**
  Admins and managers can log in to manage products, categories, orders, and users.

- **Login Credentials:**
  Fake test credentials are used and shared with the instructor.

### Client Side (User Panel)

- **Purpose:**
  Customers can register, log in, view their profile, place orders, and manage favorites.

- **Login Credentials:**
  Fake test user accounts are used for demonstration.

## 💳 PayPal Payment Testing (Sandbox)

This project uses PayPal Sandbox for secure testing.
Use the following sandbox buyer credentials when testing PayPal checkout:

- **Email:** sb-keycy38901853@personal.example.com
- **Password:** lI><)vk3

These credentials only work inside the PayPal Sandbox and are safe for testing.

## 📁 .env File

env.example for client:
VITE_GOOGLE_CLIENT_ID=
VITE_PAYPAL_CLIENT_ID=
VITE_API_BASE_URL=

env.example for dashboard:
VITE_API_BASE_URL=

env.example for server:
PORT=
NODE_ENV=
API_BASE_URL=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
MAIL_AUTH_USER=
MAIL_AUTH_PASS=
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
