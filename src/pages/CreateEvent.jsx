import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateEvent = ({ events, setEvents }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    type: "offline",
    category: "Workshop",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.date) newErrors.date = "Date and time are required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No validation errors
    setErrors({});

    const newEvent = {
      id: Date.now().toString(),
      ...form,
      bookmarked: false,
      attending: true,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/my-events"); // Redirect after successful creation
  };

  return (
    <div className="mt-10 mb-10 w-screen flex flex-col items-center">
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <Navbar />
      </div>

      <h1 className="mt-12 justify-center text-bold flex">Create An Event</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-[90%] sm:w-[70%] lg:w-[50%] text-gray-700 p-6 bg-[#32a87d] shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold">Create New Event</h2>

        <div>
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
        >
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
        >
          <option>Workshop</option>
          <option>Webinar</option>
          <option>Meetup</option>
          <option>Conference</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded resize-none"
          rows={4}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
