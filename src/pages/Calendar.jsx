import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../hooks/useEvents";
import Navbar from "../components/Navbar";

export default function CalendarView() {
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const eventsOnDate = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  const eventDates = events.map((e) => {
    const d = new Date(e.date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  });

  const attendingDates = events
    .filter((e) => e.attending)
    .map((e) => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    });

  return (
    <div className="flex flex-col items-center w-screen min-h-screen text-white">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <Navbar />
      </div>
      <h1 className="mt-20 justify-center text-bold flex text-white">
        Calendar
      </h1>

      {/* Body padding for fixed header */}
      <div className="mt-5 w-full max-w-5xl px-4 mx-auto">
        {/* Legend / Key */}
        <div className="flex flex-col mt-10 sm:flex-row items-start sm:items-center justify-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#2563eb] border" />
            <span>Event Date</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#979200] border" />
            <span>You’re Attending</span>
          </div>
        </div>

        {/* Calendar + Events */}
        <div className="flex flex-col lg:flex-row w-full gap-6 justify-center">
          {/* Calendar */}
          <div className="calendar-wrapper max-w-full lg:max-w-md mx-auto lg:mx-0">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const formatted = `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`;
                  const isEventDate = eventDates.includes(formatted);
                  const isAttendingDate = attendingDates.includes(formatted);
                  let className = "";
                  if (isEventDate) className += " event-date";
                  if (isAttendingDate) className += " event-attending";
                  return className.trim() || null;
                }
              }}
            />
          </div>

          {/* Events for selected day */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">
              Events on {selectedDate.toDateString()}
            </h2>
            {eventsOnDate.length === 0 ? (
              <p className="text-gray-400 text-center lg:text-left">
                No events for this day.
              </p>
            ) : (
              <ul className="space-y-4">
                {eventsOnDate.map((event) => (
                  <li
                    key={event.id}
                    className="p-4 bg-black rounded shadow border"
                  >
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-300">{event.location}</p>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
