import {
  Milk,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (

    <footer className="mt-16 bg-slate-950 text-white">

      {/* Top Border */}

      <div className="h-1 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400"></div>

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* DairyHub */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">

                <Milk size={26} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  DairyHub

                </h2>

                <p className="text-sm text-gray-400">

                  Farm Fresh Dairy

                </p>

              </div>

            </div>

            <p className="leading-7 text-gray-400">

              Fresh milk and dairy products delivered
              directly to your doorstep every day with
              guaranteed quality, freshness and affordable
              prices.

            </p>

            <div className="mt-6 flex items-center gap-3">

              <div className="rounded-full bg-slate-800 p-3 transition hover:bg-green-600 cursor-pointer">

                <FaFacebookF size={18} />

              </div>

              <div className="rounded-full bg-slate-800 p-3 transition hover:bg-pink-600 cursor-pointer">

                <FaInstagram size={18} />

              </div>

              <div className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600 cursor-pointer">

                <FaLinkedinIn size={18} />

              </div>

              <div className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600 cursor-pointer">

                <FaYoutube size={18} />

              </div>

            </div>

          </div>
                    {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">

              Quick Links

            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-gray-400 transition hover:translate-x-2 hover:text-green-400"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-gray-400 transition hover:translate-x-2 hover:text-green-400"
              >
                Products
              </Link>

              <Link
                to="/subscription"
                className="text-gray-400 transition hover:translate-x-2 hover:text-green-400"
              >
                Subscription
              </Link>

              <Link
                to="/about"
                className="text-gray-400 transition hover:translate-x-2 hover:text-green-400"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-gray-400 transition hover:translate-x-2 hover:text-green-400"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">

              Contact Us

            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 text-green-500"
                />

                <p className="text-gray-400">

                  Sector-62,
                  Noida,
                  Uttar Pradesh,
                  India

                </p>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-green-500"
                />

                <span className="text-gray-400">

                  +91 98765 43210

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-green-500"
                />

                <span className="text-gray-400">

                  support@dairyhub.com

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Clock
                  size={18}
                  className="text-green-500"
                />

                <span className="text-gray-400">

                  Mon - Sun : 6 AM - 10 PM

                </span>

              </div>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">

              Newsletter

            </h3>

            <p className="mb-5 leading-7 text-gray-400">

              Subscribe to receive updates,
              offers and fresh dairy news.

            </p>

            <div className="flex overflow-hidden rounded-xl">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800 px-4 py-3 text-sm text-white outline-none"
              />

              <button
                className="bg-green-600 px-5 transition hover:bg-green-700"
              >

                <Send size={18} />

              </button>

            </div>

            <div className="mt-6 rounded-xl bg-slate-800 p-4">

              <h4 className="font-semibold text-green-400">

                Why Choose DairyHub?

              </h4>

              <ul className="mt-3 space-y-2 text-sm text-gray-400">

                <li>✔ 100% Fresh Dairy Products</li>

                <li>✔ Same Day Delivery</li>

                <li>✔ Affordable Pricing</li>

                <li>✔ Trusted by 10,000+ Families</li>

              </ul>

            </div>

          </div>

        </div>
                {/* Bottom */}

        <div className="mt-12 border-t border-slate-800 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            {/* Copyright */}

            <div>

              <p className="text-sm text-gray-400">

                © {new Date().getFullYear()} DairyHub. All Rights Reserved.

              </p>

              <p className="mt-1 text-xs text-gray-500">

                Made with ❤️ in India for Fresh Dairy Delivery

              </p>

            </div>

            {/* Links */}

            <div className="flex flex-wrap items-center gap-6">

              <Link
                to="/privacy-policy"
                className="text-sm text-gray-400 transition hover:text-green-400"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-sm text-gray-400 transition hover:text-green-400"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/refund-policy"
                className="text-sm text-gray-400 transition hover:text-green-400"
              >
                Refund Policy
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );

}