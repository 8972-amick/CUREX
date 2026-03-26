import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // sidebar with links
import Navbar from "./Navbar"; // navbar with user info


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <main className="p-6 flex-1 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}