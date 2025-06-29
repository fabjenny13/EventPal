import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../hooks/useEvents";
import "react-calendar/dist/Calendar.css";
import Navbar from "../components/Navbar";

export default function CalendarView() {
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Match events on selected date
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
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  });

  const attendingDates = events
    .filter((e) => e.attending) // 👈 only those attending
    .map((e) => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; // ✅ adjust month
    });

  return (
    <div className="flex flex-col justify-center h-screen w-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-black">
        <h1 className="bg-black justify-center text-bold flex">Calendar</h1>
        <Navbar />
      </div>

      <div className="mt-10 flex gap-4 p-4 color-white text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#2563eb] border" />
          <span>Event Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#979200] border" />
          <span>You're Attending</span>
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center calendar-wrapper mb-5 ">
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

      <div className="w-full flex justify-center ">
        <h2 className="text-xl font-semibold p-10">
          Events on {selectedDate.toDateString()}
        </h2>
        {eventsOnDate.length === 0 ? (
          <p className="text-gray-500">No events for this day.</p>
        ) : (
          <ul className="space-y-4">
            {eventsOnDate.map((event) => (
              <li key={event.id} className="p-4 bg-black rounded shadow border">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
