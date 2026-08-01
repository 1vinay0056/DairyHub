import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Customer Pages
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Subscription from "../pages/Subscription/Subscription";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/checkout";
import Orders from "../pages/orders/Orders";
import Order from "../pages/orders/Order";
import Profile from "../pages/Profile/Profile";
import Wishlist from "../pages/Wishlist/Wishlist";

// Auth Pages
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import AdminProducts from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";
import AdminOrders from "../pages/Admin/Orders";
import Users from "../pages/Admin/Users";
import ContactMessages from "../pages/Admin/ContactMessages";
const AdminRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= CUSTOMER ================= */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/subscription"
            element={<Subscription />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<Order />}
          />

        </Route>

        {/* ================= AUTH ================= */}

        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />
<Route
  path="/admin/contact-messages"
  element={<ContactMessages />}
/>
          <Route
            path="edit-product/:id"
            element={<EditProduct />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="users"
            element={<Users />}
          />

        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
