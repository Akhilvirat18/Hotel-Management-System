# 🏨 Project Contribution Breakdown

## 👥 Team Members & Responsibilities

### 👤 Member 1: Core Architecture & Authentication
**"The Architect"** - Responsible for the project foundation and security.

*   **Project Setup:** Initialized React with Vite and configured Tailwind CSS.
*   **Routing:** Set up `React Router` for navigation between pages.
*   **Authentication System:**
    *   Created `AuthContext` for managing global login state.
    *   Implemented `Login` and `Signup` pages for Users.
    *   Implemented `AdminLogin` for Administrators.
*   **Security:** Created `PrivateRoute` components to protect user and admin pages.
*   **Navigation:** Built the responsive `Navbar` that adapts based on login status.

### 👤 Member 2: Room Management & Admin Dashboard
**"The Manager"** - Responsible for how rooms are displayed and managed.

*   **Home & Room Listing:**
    *   Designed the `Home` landing page.
    *   Created the `Rooms` page with a grid layout of available rooms.
    *   Built the reusable `RoomCard` component.
*   **Room Details:** Developed the `RoomDetails` page showing 
amenities, price, and description.
*   **Admin Panel:**
    *   Built the `Admin` Dashboard.
    *   Implemented **CRUD** operations for Rooms (Add, Edit, Delete).
    *   Designed forms for adding new room inventory.

### 👤 Member 3: Booking System Logic
**"The Engineer"** - Responsible for the core booking functionality.

*   **Booking Process:**
    *   Created the `Booking` page with date selection logic.
    *   Implemented validation (e.g., Check-out must be after Check-in).
*   **Booking Management:**
    *   Built the `BookingsList` page ("My Bookings").
    *   Implemented logic to view, edit, and cancel existing bookings.
*   **Admin Booking View:** Added functionality for Admins to view *all* bookings from all users.
*   **Price Calculation:** Logic to display correct pricing in Rupees (₹).

### 👤 Member 4: Backend, API & User Experience
**"The Data Specialist"** - Responsible for data handling and user features.

*   **Backend Setup:**
    *   Configured **JSON Server** for the mock backend.
    *   Designed the `db.json` database schema (Users, Rooms, Bookings).
*   **API Layer:**
    *   Created `api.js` using **Axios** to handle all HTTP requests.
    *   Centralized all API calls (GET, POST, PUT, DELETE).
*   **User Profile:**
    *   Developed the `Profile` page with user statistics.
    *   Implemented profile editing functionality.
*   **UI/UX Polish:** Added loading states, error handling, and currency formatting (₹).

---

## 🛠 Tech Stack Used
*   **Frontend:** React.js, Tailwind CSS, Vite
*   **Backend:** JSON Server (REST API)
*   **State Management:** React Context API
*   **Routing:** React Router DOM
