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

- Email: tomi@tomi.com
- Password: 11112222

### Manager

- Email: israel@israeli.com
- Password: 11112222

## Getting Started

1. Clone the repository:
   git clone https://github.com/ryabkovi/ecommerce-final-project.git

2. Install dependencies:
   cd ecommerce-final-project
   npm install

3. Create a `.env` file based on `.env.example` and fill in your environment variables.

4. Start the server:

5. Start the client and admin frontend using your preferred method (e.g., Vite or npm scripts).

## Deployment

### Live URLs

- Client Site: https://your-client-site.onrender.com
- Admin Dashboard: https://your-admin-dashboard.onrender.com
- Backend API: https://your-backend-api.onrender.com

> Replace the URLs with your actual deployed Render links.

## License

This project is for educational purposes and part of a full stack final project.
