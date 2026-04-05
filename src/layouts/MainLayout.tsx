import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // ✅ USE UI ONE

export default function MainLayout() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ✅ PASS ROLE */}
      <Sidebar role={user?.role || "school"} />

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}