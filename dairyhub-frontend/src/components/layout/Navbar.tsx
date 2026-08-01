import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Package,
} from "lucide-react";

import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";
import MobileMenu from "./MobileMenu";

import { getCart } from "../../services/cartServices";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadCartCount = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      const data = await getCart();

      const count = (data.items || []).reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error("Cart Count Error:", error);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <NavbarLogo />

          <NavLinks />

          <SearchBox />
        </div>

        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-black transition hover:text-green-600"
          >
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Guest */}
          {!user && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-teal-600 px-4 py-2 font-medium text-teal-600 transition hover:bg-teal-600 hover:text-white"
              >
                Login
              </Link>

            </div>
          )}

          {/* Logged In */}
          {user && (
            <div className="relative">
              <button
  onClick={() => setProfileOpen(!profileOpen)}
  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 transition hover:border-green-600"
>
  {user?.profile_image ? (
    <img
      src={user.profile_image}
      alt="Profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <User size={24} className="text-gray-600" />
  )}
</button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border bg-white shadow-xl">
                  <div className="border-b px-4 py-3">
                    <p className="font-semibold">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                    {user.role === "admin" && (
                      <span className="mt-2 inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        Admin
                      </span>
                    )}
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  >
                    <Package size={18} />
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} />
    </header>
  );
};

export default Navbar;