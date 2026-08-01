import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Milk,
  Mail,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";



export default function Sidebar() {

  const navigate = useNavigate();

 

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Contact Messages",
      icon: Mail,
      path: "/admin/contact-messages",
    },
  ];

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <aside className="m-3 flex h-[calc(100vh-24px)] w-[230px] flex-col rounded-3xl bg-slate-950 text-white shadow-2xl">

      {/* Logo */}

      <div className="border-b border-slate-800 px-4 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md">

            <Milk size={20} />

          </div>

          <div className="min-w-0">

            <h1  className="truncate text-lg font-bold tracking-wide">
              DairyHub
            </h1>


          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 px-3 py-4">

        <div className="space-y-2">
                    {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">

                  <Icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                </div>



              </NavLink>
            );
          })}

        </div>

      </div>

      {/* Admin Profile */}

      <div className="border-t border-slate-800 p-2">

        <div className="mb-2 flex items-center gap-2 rounded-xl bg-slate-900 p-2">

          <img
            src={
              user.profile_image ||
              `https://ui-avatars.com/api/?background=10b981&color=fff&name=${encodeURIComponent(
                user.name || "Admin"
              )}`
            }
            alt="Admin"
            className="h-12 w-12 rounded-full border-2 border-emerald-500 object-cover"
          />

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-sm font-semibold">

              {user.name || "Administrator"}

            </h3>

            <p className="truncate text-xs text-slate-400">

              {user.email || "admin@dairyhub.com"}

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-semibold transition hover:bg-red-700"
        >

          <LogOut size={16} />

          Logout

        </button>

      </div>

    </aside>
  );
}