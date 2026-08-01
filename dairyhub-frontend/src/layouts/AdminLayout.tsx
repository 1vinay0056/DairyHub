import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}

      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Fixed Header */}

        <div className="sticky top-0 z-40 bg-slate-100">
          <Header />
        </div>

        {/* Scrollable Content */}

        <main className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-5 lg:px-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}