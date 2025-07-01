import { useState, useEffect } from "react";

export default function FilterBar({ onFilterChange }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({ type, date, category });
  };

  useEffect(() => {
    handleFilterChange();
  }, [type, date, category]);

  return (
    <div className="sm:w-[20%] max-w-4xl px-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-black text-white rounded-md shadow-sm mb-2"
      >
        <span className="font-semibold">Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Filter Options */}
      {isOpen && (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 p-4 bg-gray-100 rounded-xl transition-all duration-200">
          {/* Type */}
          <select
            className="p-2 rounded border"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
          </select>

          {/* Date */}
          <select
            className="p-2 rounded border"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          >
            <option value="">Any Date</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Category */}
          <select
            className="p-2 rounded border"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="Webinar">Webinar</option>
            <option value="Meetup">Meetup</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
      )}
    </div>
  );
}
