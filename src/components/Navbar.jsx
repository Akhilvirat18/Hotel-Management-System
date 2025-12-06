import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Navbar Component
 * Navigation bar with authentication-aware links
 */
const Navbar = () => {
  const { user, admin, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
            🏨 Hotel Booking
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-gray-200 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="hover:text-gray-200 transition font-medium"
            >
              Rooms
            </Link>
            
            {/* Show based on authentication */}
            {isAuthenticated && (
              <>
                <Link
                  to="/bookings"
                  className="hover:text-gray-200 transition font-medium"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-gray-200 transition font-medium"
                >
                  Profile
                </Link>
              </>
            )}
            
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="hover:text-gray-200 transition font-medium bg-white/20 px-3 py-1 rounded-md"
                >
                  Admin Panel
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-gray-200 transition font-medium"
                >
                  Profile
                </Link>
              </>
            )}

            {/* Authentication Buttons */}
            {!isAuthenticated && !isAdmin ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hover:text-gray-200 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User/Admin Info - Clickable to go to profile */}
                <Link to="/profile" className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded-lg transition">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    {isAdmin ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {isAdmin ? admin?.name : user?.name}
                    {isAdmin && <span className="ml-1 text-xs">(Admin)</span>}
                  </span>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

