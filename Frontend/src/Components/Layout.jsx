import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // sidebar with links


export default function Layout() {
  return (
    <div className="min-h-screen flex">
    
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <main className="p-6 flex-1 bg-gray-100">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}