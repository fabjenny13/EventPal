import { useEvents } from "../hooks/useEvents";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function MyEvents() {
  const { events, setEvents } = useEvents();

  const [attending, setAttending] = useState([{}]);

  const handleBookmark = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, bookmarked: !e.bookmarked } : e))
    );
  };

  const handleAttend = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, attending: !e.attending } : e))
    );
  };

  useEffect(() => {
    const filtered = events.filter((e) => e.attending);
    setAttending(filtered);
  }, [events]);

  return (
    <div className=" w-screen justify-center flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <Navbar />
      </div>

      <h1 className=" mt-20 justify-center text-bold flex">My Events</h1>

      <NavLink className="justify-center text-2xl flex" to="/bookmarked">
        Go to Bookmarks
      </NavLink>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attending.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onBookmark={() => handleBookmark(event.id)}
            onAttend={() => handleAttend(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
