import { useState, useEffect } from "react";

export default function FilterBar({ onFilterChange }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ type, date, category });
  };

  useEffect(() => {
    handleFilterChange();
  }, [type, date, category]);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-700 rounded-xl">
      {/* Event Type */}
      <select
        className="p-2 rounded border"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="">All Types</option>
        <option value="online">Online</option>
        <option value="offline">In-Person</option>
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
        <option value="Workshop">Workshop</option>
        <option value="Meetup">Meetup</option>
        <option value="Conference">Conference</option>
      </select>
    </div>
  );
}
