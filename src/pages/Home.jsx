/**
 * Home Page
 * Landing page with welcome message and featured rooms
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../services/api';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured rooms (first 3 rooms)
    const fetchFeaturedRooms = async () => {
      try {
        const rooms = await getRooms();
        setFeaturedRooms(rooms.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Hotel Booking</h1>
          <p className="text-xl mb-8">
            Experience luxury and comfort at its finest
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse All Rooms
          </Link>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Rooms
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading rooms...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {!loading && featuredRooms.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            No rooms available at the moment.
          </p>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Luxurious rooms with top-notch amenities
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive rates with no hidden charges
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Excellent Service</h3>
              <p className="text-gray-600">
                24/7 customer support for your convenience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
