import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar visible on all public pages */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Outlet /> {/* This renders the matched public page */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}