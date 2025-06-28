import { useEvents } from "../hooks/useEvents";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

export default function Bookmarked() {
  const { events, setEvents } = useEvents();

  const [bookmarked, setBookmarked] = useState([{}]);

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
    const filtered = events.filter((e) => e.bookmarked);
    setBookmarked(filtered);
  }, [events]);

  return (
    <div className="flex flex-col justify-center h-screen w-screen">
      <h1 className="justify-center text-bold flex">My Bookmarked Events</h1>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarked.map((event) => (
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
