# Ecommerce Final Project

This is a full-stack ecommerce platform built with the MERN stack (MongoDB, Express, React, Node.js).  
The project includes a client-facing store, an admin dashboard, and backend API.

## Features

### Client Side

- User registration and login (including Google OAuth)
- User authentication with JWT stored in cookies
- View products by category
- Add to cart and manage favorites
- Checkout flow with shipping, payment (PayPal), and order confirmation
- View and manage orders in the user dashboard
- Profile editing and password reset

### Admin Dashboard

- Manager login and authentication
- View and manage users and managers
- Create, edit, and delete products and categories
- View and update order statuses
- View site analytics and feedback
- Secure access with role-based permissions (Manager/Admin)

## Technologies Used

- Frontend: React, React Router, Context API, Tailwind CSS / Custom CSS
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Auth: JWT + Cookies, bcrypt, Google OAuth2
- Uploads: Cloudinary
- Email: Nodemailer
- Payments: PayPal REST API
- Deployment: Render (web and server)

## Demo Users

### Regular User

- Email: user@example.com
- Password: 123456

### Manager

- Email: manager@example.com
- Password: 123456

## Getting Started

1. Clone the repository:
