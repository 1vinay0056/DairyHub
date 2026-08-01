import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";
import { registerUser } from "../../services/authServices";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-black mb-10">
          Register
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-xl bg-gray-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full rounded-xl bg-gray-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full rounded-xl bg-gray-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-xl bg-gray-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full rounded-xl bg-gray-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            <span>I agree to the Terms & Conditions</span>
          </div>

          {/* Register */}
          <button
            type="submit"
            className="w-full rounded-xl bg-teal-600 py-4 text-xl font-semibold text-white hover:bg-teal-700 transition"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-gray-300"></div>

            <span className="text-gray-500 text-sm">OR</span>

            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-4 text-lg font-semibold hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-6 w-6"
            />

            Continue with Google
          </button>

        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}