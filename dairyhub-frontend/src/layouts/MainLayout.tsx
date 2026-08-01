import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}