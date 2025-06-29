import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Here, you’d add actual auth logic
    // For now, just simulate sign-in and redirect
    navigate("/discover");
  };

  return (
    <div className="min-h-screen w-screen bg-[#8AB382] flex flex-col items-center justify-center text-black font-sans">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-black text-white shadow-md">
        <h1 className="text-2xl font-bold">Event Planner</h1>
      </header>

      <main className="text-center px-6 mt-24">
        <h2 className="text-5xl font-bold mb-6">
          Discover Events That Inspire You
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto">
          From workshops to webinars, conferences to meetups — find and attend
          events that match your interests.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-black text-white text-lg px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Sign In to Get Started
        </button>
      </main>

      <footer className="absolute bottom-4 text-gray-800 text-sm">
        © {new Date().getFullYear()} Event Planner. All rights reserved.
      </footer>
    </div>
  );
}
