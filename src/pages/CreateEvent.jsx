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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now().toString(),
      ...form,
      bookmarked: false,
      attending: false,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/"); // redirect to homepage or event list
  };

  return (
    <div className="mt-10 mb-10  flex flex-col justify-center">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-xl text-gray-700 p-6 bg-[#65b87a] shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold">Create New Event</h2>

        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border text-gray-400 bg-[#002a08] px-4 py-2 rounded"
          required
        />

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
