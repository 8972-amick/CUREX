import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg p-5">
      <h2 className="text-lg font-bold text-primary mb-6">Dashboard</h2>

      <div className="flex flex-col gap-4">
        <Link to="/book" className="hover:text-secondary">
          Book Appointment
        </Link>
        <Link to="/my-appointments" className="hover:text-secondary">
          My Appointments
        </Link>
        <Link to="/doctor" className="hover:text-secondary">
          Doctor Panel
        </Link>
      </div>
    </div>
  );
}
