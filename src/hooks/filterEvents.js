export default function filterEvents(events, { type, date, category }) {
  const now = new Date();
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    const matchType = !type || event.type === type;
    const matchCategory = !category || event.category === category;
    const matchDate =
      !date ||
      (date === "today" && eventDate.toDateString() === now.toDateString()) ||
      (date === "week" && eventDate >= now && eventDate <= addDays(now, 7)) ||
      (date === "month" && eventDate.getMonth() === now.getMonth());

    return matchType && matchCategory && matchDate;
  });
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
