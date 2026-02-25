<<<<<<< HEAD
# 🏨 Hotel Booking System

A full-stack hotel booking management system built with React and JSON Server, featuring user authentication, room management, booking functionality, and user profiles.

## 📋 Prerequisites

- *Node.js* (v14 or higher)
- *npm* (comes with Node.js)

## 🚀 How to Run the Project

### Step 1: Install Dependencies (First Time Only)
bash
npm install


### Step 2: Start the Backend (JSON Server)
Open a terminal and run:
bash
npx json-server --watch db.json --port 3000

This will start the backend API server on *http://localhost:3000*

### Step 3: Start the Frontend (React App)
Open a *NEW terminal* (keep JSON Server running) and run:
bash
npm run dev

The React app will open at *http://localhost:5173*

*Important:* You need BOTH servers running simultaneously!

## 🔐 Demo Accounts

### User Account
- *Email:* akhilbhupathi12@gmail.com
- *Password:* akhilbhupathi

Or

- *Email:* user@demo.com
- *Password:* password123

### Admin Account
- *Username:* admin
- *Password:* admin123

Or

- *Username:* Akhil Bhupathi
- *Password:* akhilbhupathi

## 🎯 Features

### 👤 User Features
- ✅ Create account and login
- ✅ Browse available rooms (with prices in ₹)
- ✅ View detailed room information
- ✅ Book rooms with check-in/check-out dates
- ✅ View, edit, and cancel bookings
- ✅ User profile page with account info
- ✅ Edit profile information
- ✅ Account statistics dashboard

### 👨‍💼 Admin Features
- ✅ Separate admin login portal
- ✅ Add new rooms with details and amenities
- ✅ Edit existing room information
- ✅ Delete rooms from the system
- ✅ View all bookings from all users
- ✅ Full room management dashboard
- ✅ Admin profile with quick actions

## 📱 Application Pages

### Public Pages (No Login Required)
- *Home* (/) - Landing page with featured rooms
- *Rooms* (/rooms) - Browse all available rooms
- *Room Details* (/rooms/:id) - Detailed room information
- *Login* (/login) - User login page
- *Signup* (/signup) - Create a new account
- *Admin Login* (/admin-login) - Admin portal login

### Protected Pages (Login Required)
- *Booking* (/booking/:id) - Book a specific room
- *My Bookings* (/bookings) - View and manage bookings
- *Profile* (/profile) - View and edit user profile
- *Admin Panel* (/admin) - Room management (admin only)

## 💰 Currency

All prices are displayed in *Indian Rupees (₹)*:
- Deluxe Room: ₹1,500/night
- Suite Room: ₹2,500/night
- Standard Room: ₹1,000/night
- Family Room: ₹2,000/night
- Test Room: ₹1,200/night
- Balcony House: ₹3,000/night

## 🗺 How to Use

### As a Customer:
1. *Sign Up* - Create an account at /signup
2. *Browse Rooms* - View available rooms at /rooms
3. *Select Room* - Click on a room to see details
4. *Book Room* - Click "Book Now" and fill in dates
5. *Manage Bookings* - View/Edit/Cancel at /bookings
6. *View Profile* - Check your account info at /profile

### As an Admin:
1. *Login* - Use admin credentials at /admin-login
2. *Manage Rooms* - Add, edit, or delete rooms at /admin
3. *View Bookings* - See all customer bookings at /bookings
4. *Access Profile* - View admin profile at /profile

## 📁 Project Structure


hotel_management/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with auth & profile link
│   │   ├── RoomCard.jsx        # Room display card
│   │   └── PrivateRoute.jsx    # Protected route components
│   ├── contexts/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Rooms.jsx           # Room listing
│   │   ├── RoomDetails.jsx     # Room details
│   │   ├── Booking.jsx         # Booking form
│   │   ├── BookingsList.jsx    # User bookings
│   │   ├── Profile.jsx         # User profile (NEW!)
│   │   ├── Admin.jsx           # Admin panel
│   │   ├── Login.jsx           # User login
│   │   ├── Signup.jsx          # User registration
│   │   └── AdminLogin.jsx      # Admin login
│   ├── services/
│   │   └── api.js              # Axios API functions
│   ├── App.jsx                 # Main app component
│   └── index.css               # Tailwind styles
├── db.json                     # JSON Server database
├── package.json
└── README.md


## 🛠 Technologies Used

- *React 18* - UI framework
- *Vite* - Build tool and dev server
- *React Router DOM* - Client-side routing
- *React Context API* - State management
- *Axios* - HTTP client
- *Tailwind CSS* - Styling
- *JSON Server* - Mock REST API backend

## 💾 Data Storage

The backend uses *JSON Server* which stores data in db.json:
- *Rooms* - All available rooms with details
- *Bookings* - Customer reservations
- *Users* - Registered customer accounts
- *Admins* - Admin accounts

All changes are automatically persisted to db.json.

## 🔧 Available Commands

bash
# Install dependencies
npm install

# Start JSON Server (Backend)
npx json-server --watch db.json --port 3000

# Start React App (Frontend)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


## 🎨 API Endpoints

JSON Server automatically creates REST endpoints:

### Rooms
- GET /rooms - Get all rooms
- GET /rooms/:id - Get single room
- POST /rooms - Create room
- PUT /rooms/:id - Update room
- DELETE /rooms/:id - Delete room

### Bookings
- GET /bookings - Get all bookings
- GET /bookings/:id - Get single booking
- POST /bookings - Create booking
- PUT /bookings/:id - Update booking
- DELETE /bookings/:id - Delete booking

### Users
- GET /users - Get all users
- POST /users - Create user
- GET /users?email=...&password=... - User login

### Admins
- GET /admins - Get all admins
- GET /admins?username=...&password=... - Admin login

## 💡 New Features in This Version

### User Profile Page
- ✅ View personal information (name, email, ID, account type)
- ✅ Edit profile details
- ✅ Quick action buttons (bookings, rooms, admin panel)
- ✅ Account statistics dashboard
- ✅ One-click logout
- ✅ Accessible from navbar

### Currency Update
- ✅ All prices now in Indian Rupees (₹)
- ✅ Updated across all pages:
  - Room cards
  - Room details
  - Booking page
  - Bookings list

## 🐛 Troubleshooting

### Backend not connecting
- Make sure JSON Server is running on port 3000
- Check if db.json file exists
- Run: npx json-server --watch db.json --port 3000

### Port already in use
- *Backend (3000):* Kill the process or use different port
- *Frontend (5173):* Vite will suggest alternative port

### Can't access profile
- You must be logged in (user or admin)
- Click "Profile" in navbar or go to /profile

### Changes not saving
- Ensure JSON Server is running
- Check browser console for errors
- Verify db.json has write permissions

## 🔒 Security Note

This is a *demo application* for learning purposes. In production:
- Never store passwords in plain text
- Use proper backend authentication (JWT, OAuth)
- Implement server-side validation
- Add HTTPS encryption
- Use environment variables for sensitive data

=======
# Hotel-Room-Management-System
A complete hotel room booking application built using React, React Router, Tailwind CSS, and a JSON Server backend.  This project allows users to browse rooms, view details, create bookings, and manage their reservations. Admins can manage room data through the backend.
>>>>>>> 8a3a434b3958db67f829b62f1cf13bb3b022ec2c
