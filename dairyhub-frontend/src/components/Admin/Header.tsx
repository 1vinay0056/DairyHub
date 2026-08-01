import {
  Search,
  Bell,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getUnreadOrderCount,
} from "../../services/orderServices";

import {
  getUnreadCount,
} from "../../services/contactServices";

import {
  globalSearch,
} from "../../services/dashboardServices";

export default function Header() {

  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [search, setSearch] = useState("");

  const [showSearch, setShowSearch] =
    useState(false);

  const [messageCount, setMessageCount] =
    useState(0);

  const [orderCount, setOrderCount] =
    useState(0);

  const [results, setResults] =
    useState<any>({
      products: [],
      orders: [],
      users: [],
      messages: [],
    });

  /* -------------------- Search -------------------- */

  const handleSearch = async (
    value: string
  ) => {

    setSearch(value);

    if (value.trim() === "") {

      setResults({
        products: [],
        orders: [],
        users: [],
        messages: [],
      });

      setShowSearch(false);

      return;

    }

    try {

      const data =
        await globalSearch(value);

      setResults(data);

      setShowSearch(true);

    } catch (error) {

      console.log(error);

    }

  };

  /* ---------------- Orders ---------------- */

  const loadUnreadOrders =
    async () => {

      try {

        const count =
          await getUnreadOrderCount();

        setOrderCount(count);

      } catch (error) {

        console.log(error);

      }

    };

  /* ---------------- Messages ---------------- */

  const loadUnreadMessages =
    async () => {

      try {

        const count =
          await getUnreadCount();

        setMessageCount(count);

      } catch (error) {

        console.log(error);

      }

    };

  /* ---------------- Effects ---------------- */

  useEffect(() => {

    loadUnreadOrders();

    loadUnreadMessages();

    const interval =
      setInterval(() => {

        loadUnreadOrders();

        loadUnreadMessages();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  /* Close search when clicking outside */

  useEffect(() => {

    const handleOutside = (
      e: MouseEvent
    ) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target as Node
        )
      ) {

        setShowSearch(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutside
      );

    };

  }, []);

  return (<header className="mx-3 mt-3 h-[90px] rounded-3xl border border-slate-200 bg-white px-8 shadow-sm">

  <div className="flex h-full items-center justify-between">

    {/* Left */}

    <div>

      <h2 className="text-2xl font-bold text-green-700">
        Dashboard
      </h2>

    </div>

    {/* Right */}

    <div className="flex items-center gap-4">

      {/* Search */}

      <div
        ref={searchRef}
        className="relative hidden lg:block"
      >

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search products, orders, users..."
          value={search}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
          onFocus={() => {
            if (search !== "") {
              setShowSearch(true);
            }
          }}
          className="h-10 w-72 rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white"
        />

        {showSearch && (

          <div className="absolute left-0 top-12 z-50 max-h-[420px] w-[420px] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* Products */}

            {results.products.length > 0 && (

              <>

                <div className="border-b bg-slate-100 px-4 py-2 text-xs font-bold uppercase text-slate-500">

                  Products

                </div>

                {results.products.map(
                  (item: any) => (

                    <button
                      key={item.id}
                      onClick={() => {

                        navigate(
                          "/admin/products"
                        );

                        setSearch("");

                        setShowSearch(false);

                      }}
                      className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition hover:bg-slate-50"
                    >

                      📦 {item.name}

                    </button>

                  )
                )}

              </>

            )}

            {/* Orders */}

            {results.orders.length > 0 && (

              <>

                <div className="border-b bg-slate-100 px-4 py-2 text-xs font-bold uppercase text-slate-500">

                  Orders

                </div>

                {results.orders.map(
                  (item: any) => (

                    <button
                      key={item.id}
                      onClick={() => {

                        navigate(
                          "/admin/orders"
                        );

                        setSearch("");

                        setShowSearch(false);

                      }}
                      className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition hover:bg-slate-50"
                    >

                      🛒 {item.customer_name}

                    </button>

                  )
                )}

              </>

            )}
                        {/* Users */}

            {results.users.length > 0 && (
              <>
                <div className="border-b bg-slate-100 px-4 py-2 text-xs font-bold uppercase text-slate-500">
                  Users
                </div>

                {results.users.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate("/admin/users");
                      setSearch("");
                      setShowSearch(false);
                    }}
                    className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition hover:bg-slate-50"
                  >
                    👤 {item.name}
                  </button>
                ))}
              </>
            )}

            {/* Messages */}

            {results.messages.length > 0 && (
              <>
                <div className="border-b bg-slate-100 px-4 py-2 text-xs font-bold uppercase text-slate-500">
                  Messages
                </div>

                {results.messages.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate("/admin/contact-messages");
                      setSearch("");
                      setShowSearch(false);
                    }}
                    className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition hover:bg-slate-50"
                  >
                    💬 {item.subject}
                  </button>
                ))}
              </>
            )}

            {/* No Results */}

            {results.products.length === 0 &&
              results.orders.length === 0 &&
              results.users.length === 0 &&
              results.messages.length === 0 && (
                <div className="p-6 text-center text-sm text-slate-500">
                  No results found
                </div>
              )}

          </div>

        )}

      </div>

      {/* Orders */}

      <button
        onClick={() => navigate("/admin/orders")}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
      >
        <Bell size={18} />

        {orderCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {orderCount}
          </span>
        )}
      </button>

      {/* Messages */}

      <button
        onClick={() =>
          navigate("/admin/contact-messages")
        }
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
      >
        <MessageCircle size={18} />

        {messageCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {messageCount}
          </span>
        )}
      </button>

      {/* Profile */}

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">

        <img
          src={
            user.profile_image ||
            `https://ui-avatars.com/api/?background=10b981&color=ffffff&name=${encodeURIComponent(
              user.name || "Admin"
            )}`
          }
          alt="Admin"
          className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
        />

        <div className="hidden lg:block">
          <h3 className="text-sm font-semibold text-slate-800">
            {user.name || "Administrator"}
          </h3>

          <p className="text-xs text-slate-500">
            {user.role === "admin"
              ? "Administrator"
              : user.role || "Administrator"}
          </p>
        </div>

        <ChevronDown
          size={16}
          className="text-slate-500"
        />

      </div>

    </div>

  </div>

</header>
  )
}

