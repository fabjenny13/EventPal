import Navbar from "../components/Navbar";

import EventCard from "../components/EventCard";
import { useEvents } from "../hooks/useEvents";
import FilterBar from "../components/Filterbar";
import { useState, useEffect } from "react";
import filterEvents from "../hooks/filterEvents";

export default function Home() {
  const { events, setEvents } = useEvents();
  const [filters, setFilters] = useState({ type: "", date: "", category: "" });
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const updated = filterEvents(events, filters);
    setFilteredEvents(updated);
  }, [filters, events]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log(newFilters);
  };

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
    <div className=" w-screen justify-center flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <h1 className="bg-black justify-center text-bold flex">Discover</h1>
        <Navbar />
      </div>
      <div className="flex justify-center w-full py-4">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
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
