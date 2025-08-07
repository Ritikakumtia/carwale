# 🚗 Carwale: Full-Stack Car Buying Web App

**Carwale** is a comprehensive car buying platform built using the MERN stack, comprising **Node.js**, **React.js**, **MongoDB**, and **Express.js**. The application is designed to provide **users** with an effortless and **enjoyable experience** while browsing and purchasing cars from a vast collection of vehicles.

## 📌 Key Features:
1. **BrainTree Payment Gateway Integration**: Secure and seamless payment processing, allowing customers to purchase vehicles with confidence.
2. **360-Degree Visualization**: An immersive feature that offers users a complete 360-degree view of the cars, helping them make informed decisions.
3. **Car Image Gallery**: A dynamic and responsive gallery showcasing high-quality images of each car, providing a detailed look at every aspect of the vehicles.
4. **Advanced Search and Filtering**: Users can easily find their desired car using various filters, including price range, brand, and other essential criteria.
5. **Filter by Price and Brands**: Simplified browsing with options to filter cars based on budget and preferred brands, making the search process more intuitive.
6. **Admin Panel**: A dedicated admin interface for managing car listings, orders, user accounts, and other critical operations, ensuring smooth administration of the platform.
7. **Cart Functionality**: Add cars to cart and store in localStorage for persistent shopping experience.
8. **JWT Authentication**: Secure login/registration system with role-based access control.

## 🛠 Technology Stack:
- **Frontend**: React.js with React Router DOM, Bootstrap/Ant Design, Axios for API calls
- **Backend**: Node.js and Express.js with middleware for authentication and file uploads
- **Database**: MongoDB with Mongoose ODM for efficient data management
- **Payment**: Braintree payment gateway integration
- **File Storage**: Google Drive API for image hosting and management
- **Authentication**: JWT tokens with bcryptjs for password hashing

## 🚗 Core Features:

### User Features:
- **Car Listing Page**: Browse all cars with brand name, price, image, fuel type, seater capacity, etc.
- **Car Detail Page**: Comprehensive car information with Google Drive-hosted image gallery
- **Brand Listing Page**: View all available car brands with logos
- **Advanced Filtering**: Filter cars by price range, brand, fuel type, seater capacity
- **Cart System**: Add cars to cart with localStorage persistence
- **Secure Payments**: Braintree integration for safe transactions
- **User Dashboard**: Track orders and manage profile

### Admin Features:
- **Add New Car**: Upload car details with multiple images to Google Drive
- **Add New Brand**: Create brands with logo upload to Google Drive
- **Manage Inventory**: Full CRUD operations for cars and brands
- **Order Management**: View and manage customer orders
- **User Management**: Admin dashboard for user oversight

## 📦 Deployment Details:
1. **Frontend**: Deployed on [Render.com](https://render.com/) for reliable static hosting
2. **Backend**: Deployed on [Render.com](https://render.com/) with automatic deployments
3. **Images**: Hosted on Google Drive using Google Drive API for scalable storage
4. **Database**: MongoDB Atlas for cloud database hosting with high availability

## 🔐 Authentication System:
- JWT-based authentication with role-based access control
- Admin (role: 1) and User (role: 0) roles
- Protected routes for admin operations
- Secure password hashing with bcryptjs

## 📁 Project Structure:
```
carwale/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── admin/         # Admin components
│   │   ├── common/        # Shared components
│   │   ├── context/       # React context
│   │   ├── Home/          # Home page components
│   │   ├── pages/         # Page components
│   │   ├── Routes/        # Protected routes
│   │   └── styles/        # CSS styles
│   └── package.json
├── server/                # Node.js backend
│   ├── auth/             # Authentication middleware
│   ├── controllers/      # Route controllers
│   ├── database/         # Database connection
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── uploads/          # Temporary file storage
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Drive API credentials
- Braintree sandbox account

### 1. Clone the Repository:
```bash
git clone https://github.com/Ritikakumtia/carwale.git
cd carwale
```

### 2. Backend Setup:
```bash
cd server
npm install

# Create .env file with the following variables:
PORT=5000
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key

# Add Google Drive API credentials as cred.json in controllers folder
# Start the server
npm run dev
```

### 3. Frontend Setup:
```bash
cd client
npm install
npm start
```

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 API Endpoints:

### Authentication:
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile

### Brands:
- `GET /api/brand/getAll-brand` - Get all brands
- `GET /api/brand/getBrandBtId-brand/:slug` - Get brand by slug
- `POST /api/brand/create-brand` - Create new brand (Admin)
- `PUT /api/brand/update-brand/:id` - Update brand (Admin)
- `DELETE /api/brand/delete-brand/:id` - Delete brand (Admin)

### Cars:
- `GET /api/car/getAll-car` - Get all cars
- `GET /api/car/getCarById-car/:slug` - Get car by slug
- `POST /api/car/create-car` - Create new car (Admin)
- `PUT /api/car/update-car/:pid` - Update car (Admin)
- `DELETE /api/car/delete-car/:pid` - Delete car (Admin)
- `GET /api/car/related-car/:cid/:bid` - Get related cars

### Payments:
- `GET /api/car/braintree/token` - Get Braintree token
- `POST /api/car/braintree/payment` - Process payment

## 🧪 Sample Data:
The project includes seed scripts for populating the database with sample brands and cars. Check the `server/controllers` folder for data seeding utilities.

## 🚨 Error Handling:
- Graceful handling of undefined brand names in frontend
- Fallback image URLs for missing images
- Comprehensive error messages and toast notifications
- Input validation on both client and server sides

## 📱 Responsive Design:
- Mobile-first approach with Bootstrap/Ant Design
- Responsive image galleries and car listings
- Touch-friendly navigation and interactions

## 🔒 Security Features:
- JWT token authentication
- Password hashing with bcryptjs
- Protected API routes
- Input sanitization and validation
- CORS configuration

## 🎯 Future Enhancements:
- Real-time chat support
- Advanced car comparison features
- Wishlist functionality
- Email notifications
- Mobile app development

## 👩‍💻 Developer Information:

**Ritika Kumtia**
- 📧 Email: [ritikakumtia@gmail.com](mailto:ritikakumtia@gmail.com)
- 🐙 GitHub: [https://github.com/Ritikakumtia](https://github.com/Ritikakumtia)
- 💼 LinkedIn: [www.linkedin.com/in/ritika-kumtia-948b40286](https://www.linkedin.com/in/ritika-kumtia-948b40286)
- 📅 Year: 2024

## 📄 License:
This project is licensed under the MIT License.

## 🌟 Live Demo:
**Live Link**: [https://carwale.onrender.com](https://carwale.onrender.com)

## 📸 Screenshots:

### Home Page
![Home Page](https://github.com/user-attachments/assets/e4a05b99-ffc6-4466-a06d-ed5264f4572a)

### Car Listings
![Car Listings](https://github.com/user-attachments/assets/4a054998-517b-4a88-bf3a-079a992db305)

### Car Details
![Car Details](https://github.com/user-attachments/assets/572dace8-e246-4b66-baef-d870bc9b53ab)

### Brand Listings
![Brand Listings](https://github.com/user-attachments/assets/bd812622-18dd-4027-8a34-d13c948c0640)

### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/f0a36f8e-c165-4d3e-a48f-616b30454d2b)

---

## ⭐ Please Give it a Star if you like it!

**Built with ❤️ using MERN Stack**

