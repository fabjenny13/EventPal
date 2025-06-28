import React from "react";

export default function EventCard({ event, onBookmark, onAttend }) {
  const {
    title,
    date,
    location,
    type,
    category,
    description,
    bookmarked,
    attending,
  } = event;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md mx-auto hover:shadow-lg transition duration-200 border border-gray-100">
      <h2 className="text-xl font-semibold text-blue-700 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Location:</strong> {location}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Type:</strong> {type}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Category:</strong> {category}
      </p>
      <p className="text-gray-700 mb-3">{description}</p>

      <div className="flex gap-2">
        <button
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            bookmarked
              ? "bg-yellow-400 text-white border-yellow-400"
              : "bg-white text-yellow-500 border-yellow-500"
          }`}
          onClick={onBookmark}
        >
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            attending
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-green-600 border-green-600"
          }`}
          onClick={onAttend}
        >
          {attending ? "Attending" : "Attend"}
        </button>
      </div>
    </div>
  );
}
