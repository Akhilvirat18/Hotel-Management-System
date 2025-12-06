/**
 * Room Details Page
 * Shows detailed information about a specific room and booking option
 */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../services/api';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch room details
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data);
      } catch (err) {
        setError('Failed to load room details.');
        console.error('Error loading room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Room not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/rooms')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Rooms
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Room Image */}
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-96 object-cover"
          />

          {/* Room Details */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {room.name}
                </h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                  {room.type}
                </span>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-blue-600">
                  ₹{room.price}
                </p>
                <p className="text-gray-500">per night</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Room Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Capacity:</span>{' '}
                    {room.capacity} guests
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Type:</span> {room.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <span className="text-green-500 mr-2">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
