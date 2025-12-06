/**
 * Bookings List Page
 * View, edit, and delete user bookings
 * Admins see all bookings, users see only their own
 */
import { useEffect, useState } from 'react';
import { getBookings, getRoomById, deleteBooking, updateBooking } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const BookingsList = () => {
  const { user, isAdmin } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      
      // Filter bookings based on role
      let filteredBookings = data;
      if (!isAdmin && user) {
        // Regular users only see their own bookings
        filteredBookings = data.filter(booking => booking.userId === user.id);
      }
      // Admins see all bookings
      
      // Fetch room details for each booking
      const bookingsWithRooms = await Promise.all(
        filteredBookings.map(async (booking) => {
          try {
            const room = await getRoomById(booking.roomId);
            return { ...booking, room };
          } catch (err) {
            console.error('Error fetching room:', err);
            return { ...booking, room: null };
          }
        })
      );
      
      setBookings(bookingsWithRooms);
    } catch (err) {
      setError('Failed to load bookings.');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      await deleteBooking(id);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      alert('Failed to delete booking.');
      console.error('Error deleting booking:', err);
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm({
      guestName: booking.guestName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedBooking = await updateBooking(id, {
        ...bookings.find((b) => b.id === id),
        ...editForm,
      });
      
      setBookings(
        bookings.map((b) =>
          b.id === id ? { ...b, ...updatedBooking } : b
        )
      );
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      alert('Failed to update booking.');
      console.error('Error updating booking:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {isAdmin ? 'All Bookings' : 'My Bookings'}
          </h1>
          {isAdmin && (
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
              Admin View - Showing All User Bookings
            </span>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">
              {isAdmin ? 'No bookings in the system yet.' : 'You have no bookings yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                {editingId === booking.id ? (
                  // Edit Mode
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Edit Booking
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Guest Name
                        </label>
                        <input
                          type="text"
                          value={editForm.guestName}
                          onChange={(e) =>
                            setEditForm({ ...editForm, guestName: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={editForm.checkIn}
                          onChange={(e) =>
                            setEditForm({ ...editForm, checkIn: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={editForm.checkOut}
                          onChange={(e) =>
                            setEditForm({ ...editForm, checkOut: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(booking.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {booking.room ? booking.room.name : 'Room Not Found'}
                        </h3>
                        <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          Booking #{booking.id}
                        </span>
                        {isAdmin && booking.userId && (
                          <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                            User ID: {booking.userId}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                        <div>
                          <p className="font-semibold">Guest Name:</p>
                          <p>{booking.guestName}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Check-in:</p>
                          <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Check-out:</p>
                          <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {booking.room && (
                        <p className="mt-2 text-gray-600">
                          <span className="font-semibold">Price:</span> ₹
                          {booking.room.price} per night
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
