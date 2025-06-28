import { useState, useEffect } from "react";
import { dummyEvents } from "../data/dummyEvents";

const LOCAL_STORAGE_KEY = "events";

export const useEvents = () => {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : dummyEvents;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  return { events, setEvents };
};
