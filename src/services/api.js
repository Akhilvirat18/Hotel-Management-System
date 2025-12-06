import axios from 'axios';

// Base URL for JSON Server
const API_BASE_URL = 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============ ROOMS API ============

/**
 * Get all rooms
 * @returns {Promise} Array of rooms
 */
export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

/**
 * Get a single room by ID
 * @param {number} id - Room ID
 * @returns {Promise} Room object
 */
export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};

/**
 * Create a new room (Admin)
 * @param {Object} roomData - Room data
 * @returns {Promise} Created room object
 */
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/rooms', roomData);
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

/**
 * Update a room (Admin)
 * @param {number} id - Room ID
 * @param {Object} roomData - Updated room data
 * @returns {Promise} Updated room object
 */
export const updateRoom = async (id, roomData) => {
  try {
    const response = await api.put(`/rooms/${id}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

/**
 * Delete a room (Admin)
 * @param {number} id - Room ID
 * @returns {Promise}
 */
export const deleteRoom = async (id) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

// ============ BOOKINGS API ============

/**
 * Get all bookings
 * @returns {Promise} Array of bookings
 */
export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Get a single booking by ID
 * @param {number} id - Booking ID
 * @returns {Promise} Booking object
 */
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data (roomId, checkIn, checkOut, guestName)
 * @returns {Promise} Created booking object
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Update a booking
 * @param {number} id - Booking ID
 * @param {Object} bookingData - Updated booking data
 * @returns {Promise} Updated booking object
 */
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

/**
 * Delete a booking
 * @param {number} id - Booking ID
 * @returns {Promise}
 */
export const deleteBooking = async (id) => {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// ============ AUTHENTICATION API ============

/**
 * User Signup
 * @param {Object} userData - User data (name, email, password)
 * @returns {Promise} Created user object
 */
export const signupUser = async (userData) => {
  try {
    // Check if user already exists
    const response = await api.get(`/users?email=${userData.email}`);
    if (response.data.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = await api.post('/users', userData);
    return newUser.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * User Login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User object if credentials are valid
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.get(`/users?email=${email}&password=${password}`);
    if (response.data.length === 0) {
      throw new Error('Invalid email or password');
    }
    return response.data[0];
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Admin Login
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @returns {Promise} Admin object if credentials are valid
 */
export const loginAdmin = async (username, password) => {
  try {
    const response = await api.get(`/admins?username=${username}&password=${password}`);
    if (response.data.length === 0) {
      throw new Error('Invalid username or password');
    }
    return response.data[0];
  } catch (error) {
    console.error('Error logging in as admin:', error);
    throw error;
  }
};

export default api;
