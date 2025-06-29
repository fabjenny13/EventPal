import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full text-white flex flex-row space-x-10 justify-center pt-5 bg-black">
      <NavLink to="/create">Create An Event</NavLink>
      <NavLink to="/bookmarked">My Bookmarked Events</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
    </div>
  );
}
