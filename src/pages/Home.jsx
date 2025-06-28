import EventCard from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";
import React, { useState } from "react";

export default function Home() {
  const [events, setEvents] = useEvents();

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

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onBookmark={() => handleBookmark(event.id)}
          onAttend={() => handleAttend(event.id)}
        />
      ))}
    </div>
  );
}
