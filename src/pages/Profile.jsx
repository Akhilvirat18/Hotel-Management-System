/**
 * User Profile Page
 * View and edit user profile information
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, admin, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Determine which profile to show
  const currentUser = isAdmin ? admin : user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        username: currentUser.username || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real app, you would update the user data here
    // For now, we'll just toggle edit mode
    setIsEditing(false);
    alert('Profile updated successfully! (Note: This is a demo - changes are not persisted)');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Please log in to view your profile
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                <p className="text-blue-100 mt-1">
                  {isAdmin ? currentUser.username : currentUser.email}
                </p>
                {isAdmin && (
                  <span className="inline-block bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full mt-2">
                    Admin Account
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            // Edit Mode
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your full name"
                />
              </div>

              {isAdmin ? (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter username"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your email"
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: currentUser.name || '',
                      email: currentUser.email || '',
                      username: currentUser.username || '',
                    });
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">{currentUser.name}</p>
                </div>
                
                {isAdmin ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Username</p>
                    <p className="text-lg font-semibold text-gray-800">{currentUser.username}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="text-lg font-semibold text-gray-800">{currentUser.email}</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Account Type</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {isAdmin ? 'Administrator' : 'Customer'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {!isAdmin && (
            <button
              onClick={() => navigate('/bookings')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-blue-600 text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-800">My Bookings</h3>
              <p className="text-sm text-gray-600 mt-1">View and manage your reservations</p>
            </button>
          )}

          <button
            onClick={() => navigate('/rooms')}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
          >
            <div className="text-blue-600 text-3xl mb-2">🏨</div>
            <h3 className="font-semibold text-gray-800">Browse Rooms</h3>
            <p className="text-sm text-gray-600 mt-1">Explore available rooms</p>
          </button>

          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-purple-600 text-3xl mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-800">Admin Panel</h3>
              <p className="text-sm text-gray-600 mt-1">Manage rooms and bookings</p>
            </button>
          )}
        </div>

        {/* Account Stats (Only for Users) */}
        {!isAdmin && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Upcoming Stays</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">₹0</p>
                <p className="text-sm text-gray-600 mt-1">Total Spent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
