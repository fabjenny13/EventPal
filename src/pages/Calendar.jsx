import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../hooks/useEvents";
import "react-calendar/dist/Calendar.css";

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

  return (
    <div className="flex flex-row lg:flex-row gap-6 p-6">
      <h1>Calendar</h1>
      <div className="w-full lg:w-1/2 calendar-wrapper bg-black ">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const d = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              return eventDates.includes(d) ? "event-date" : null;
            }
          }}
        />
      </div>

      <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-semibold mb-2">
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
