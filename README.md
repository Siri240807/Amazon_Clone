# Amazon Clone Project

This is a full-stack Amazon clone project built with modern web technologies. The application mimics the core functionality of Amazon.com with user authentication, product browsing, shopping cart, order management, and admin features.

## 🚀 Key Features

### User Features
- **User Authentication**: Secure signup, login, and logout functionality
- **Personalized Greeting**: Displays user's first name in the header ("Hello, [First Name]")
- **Product Browsing**: Browse products by categories with visually appealing grid layout
- **Advanced Search**: Real-time search functionality with smart filtering and suggestions
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, adjust quantities, and view cart summary
- **Wishlist**: Save favorite products for later purchase
- **Order Management**: Place orders and track order status
- **Order Tracking**: Real-time order tracking with visual progress indicators
- **User Profile**: Manage personal information, addresses, and view order history
- **Responsive Design**: Mobile-friendly interface that works on all devices

### Admin Features
- **Admin Dashboard**: Dedicated admin panel for managing the entire store
- **Product Management**: Add, edit, and delete products with full CRUD operations
- **Order Management**: View all orders, update order statuses (pending, processing, shipped, delivered)
- **User Management**: View and manage user accounts (planned feature)

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Font Awesome** - Icon library for UI elements

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling tool
- **JSON Web Tokens (JWT)** - Secure user authentication
- **RESTful API** - Standardized API architecture

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **Mongoose Models** - User, Product, Order, Cart, Address, Wishlist schemas

## 📁 Project Structure

```
amazon-clone/
├── frontend/
│   ├── Amazon_Clone.html      # Home page
│   ├── Amazon_Clone.css       # Main stylesheet
│   ├── login.html             # User authentication page
│   ├── profile.html           # User profile and account management
│   ├── cart.html              # Shopping cart functionality
│   ├── wishlist.html          # Wishlist management
│   ├── search.html            # Product search results
│   ├── category.html          # Product category pages
│   ├── product.html           # Product detail pages
│   ├── order.html             # Order tracking page
│   ├── admin.html             # Admin product management
│   ├── admin-orders.html      # Admin order management
│   ├── api.js                 # API utility functions
│   ├── navbar.js              # Navigation bar functionality
│   ├── productApi.js          # Product-related API functions
│   └── images/                # Product and UI images
└── backend/
    ├── models/                # Database models (User, Product, Order, etc.)
    ├── routes/                # API route definitions
    ├── controllers/           # Business logic handlers
    ├── middleware/            # Authentication and authorization middleware
    ├── .env                   # Environment variables
    ├── package.json           # Project dependencies
    └── server.js              # Main server entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Modern web browser

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd amazon-clone
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account or sign in
   - Create a new cluster
   - Create a database user with read/write permissions
   - Add your IP address to the whitelist (or allow access from anywhere for development)
   - Get your connection string from the "Connect" button

5. **Configure environment variables**:
   Create a `.env` file in the backend directory with the following content:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.your_cluster.mongodb.net/amazonclone?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Open the frontend**:
   Open `frontend/Amazon_Clone.html` in your browser to access the application.

## 🌐 API Endpoints

The backend provides a comprehensive RESTful API

## 🔐 Security Features

- **JWT Authentication**: Secure token-based user authentication
- **Role-Based Access Control**: Admin-only features protected with middleware
- **Password Protection**: User credentials securely handled
- **CORS Protection**: Cross-origin resource sharing security
- **Input Validation**: Server-side validation for all user inputs


## 🙏 Acknowledgments

- Inspired by Amazon.com
- Built with modern web development practices
- Designed for educational and portfolio purposes