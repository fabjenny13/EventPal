import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Bookmarked from "./pages/Bookmarked";
import CalendarView from "./pages/Calendar";
import { set } from "react-hook-form";
import { useState, useEffect } from "react";
import "./index.css";
import MyEvents from "./pages/MyEvents";
import LandingPage from "./pages/LandingPage";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      setEvents(dummyEvents);
      localStorage.setItem("events", JSON.stringify(dummyEvents));
    }
  }, []);

  return (
    <BrowserRouter basename="/EventPal">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<Home />} />
        <Route
          path="/create"
          element={<CreateEvent events={events} setEvents={setEvents} />}
        />
        <Route path="/bookmarked" element={<Bookmarked />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
