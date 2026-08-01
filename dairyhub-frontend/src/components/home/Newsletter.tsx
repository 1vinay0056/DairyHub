import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { subscribe } from "../../services/subscriptionServices";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await subscribe(email);

      alert("🎉 Successfully Subscribed!");

      setEmail("");
    } catch (error: any) {
      alert(
        error?.response?.data?.detail ||
          "Subscription failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-700 to-teal-600 py-20">

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

          <Mail
            className="text-green-600"
            size={30}
          />

        </div>

        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Subscribe to DairyHub
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Get fresh dairy offers, exclusive discounts,
          and daily milk delivery updates directly in
          your inbox.
        </p>

        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300"
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {loading
              ? "Subscribing..."
              : "Subscribe"}
          </button>

        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-green-700">

          <CheckCircle size={18} />

          <span className="text-sm">
            No spam. Unsubscribe anytime.
          </span>

        </div>

      </div>

    </section>
  );
};

export default Newsletter;