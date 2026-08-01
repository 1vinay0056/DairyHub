import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar"; // adjust path if needed

export default function AuthLayout() {
  return (
    <>
      {/* White Navbar Ribbon */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Page */}
      <main className="min-h-[calc(100vh-90px)] bg-gray-100 flex items-center justify-center py-12 px-4">
        <Outlet />
      </main>
    </>
  );
}