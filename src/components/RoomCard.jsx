import { Link } from 'react-router-dom';

/**
 * RoomCard Component
 * Displays a room card with image, details, and action button
 * @param {Object} room - Room object with id, name, type, price, capacity, image, description
 */
const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Room Image */}
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-48 object-cover"
      />

      {/* Room Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {room.type}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {room.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">₹{room.price}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Capacity: {room.capacity}</p>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/rooms/${room.id}`}
          className="mt-4 w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
