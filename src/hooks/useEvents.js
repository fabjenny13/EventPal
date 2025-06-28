import { useEffect, useState } from "react";
import { dummyEvents } from "../data/dummyEvents";

export const useEvents = () => {
  const [events, setEvents] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("events"));
      return Array.isArray(stored) ? stored : dummyEvents;
    } catch {
      return dummyEvents;
    }
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return { events, setEvents };
};
