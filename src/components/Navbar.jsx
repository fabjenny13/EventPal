import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white w-full px-6 py-3 shadow-md z-50">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Event Planner</h2>

        {/* Hamburger Button (visible on small screens) */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 text-sm font-medium">
          <NavLink to="/discover" className="hover:text-blue-400">
            Discover
          </NavLink>
          <NavLink to="/create" className="hover:text-blue-400">
            Create An Event
          </NavLink>
          <NavLink to="/my-events" className="hover:text-blue-400">
            My Events
          </NavLink>
          <NavLink to="/calendar" className="hover:text-blue-400">
            Calendar
          </NavLink>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="flex flex-col mt-4 gap-3 lg:hidden">
          <NavLink to="/discover" onClick={() => setIsOpen(false)}>
            Discover
          </NavLink>
          <NavLink to="/create" onClick={() => setIsOpen(false)}>
            Create An Event
          </NavLink>
          <NavLink to="/my-events" onClick={() => setIsOpen(false)}>
            My Events
          </NavLink>
          <NavLink to="/calendar" onClick={() => setIsOpen(false)}>
            Calendar
          </NavLink>
        </div>
      )}
    </nav>
  );
}
