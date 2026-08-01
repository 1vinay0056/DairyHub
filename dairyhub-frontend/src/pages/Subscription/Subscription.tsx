import {
  CalendarDays,
  Truck,
  ShieldCheck,
  Leaf,
  Check,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      title: "Daily Plan",
      price: 999,
      duration: "/month",
      color: "bg-green-600",
      popular: false,
      features: [
        "Fresh milk delivered every day",
        "Free doorstep delivery",
        "Morning delivery",
        "Cancel anytime",
        "Priority customer support",
      ],
    },
    {
      id: 2,
      title: "Family Plan",
      price: 1899,
      duration: "/month",
      color: "bg-green-700",
      popular: true,
      features: [
        "Milk + Paneer + Curd",
        "Morning delivery",
        "10% Discount",
        "Free delivery",
        "Premium Support",
      ],
    },
    {
      id: 3,
      title: "Premium Plan",
      price: 2999,
      duration: "/month",
      color: "bg-green-800",
      popular: false,
      features: [
        "All Dairy Products",
        "Custom Schedule",
        "15% Discount",
        "Express Delivery",
        "Dedicated Support",
      ],
    },
  ];

const handleSubscribe = (plan: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  navigate("/checkout", {
    state: {
      isSubscription: true,
      subscriptionPlan: plan,
    },
  });
};
  return (
    <section className="bg-gray-50 py-10">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            DairyHub Subscription
          </span>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">
            Choose Your Perfect Plan
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Subscribe once and enjoy fresh milk,
            paneer, curd, butter and many more
            dairy products delivered directly from
            our farms to your doorstep every day.
          </p>

        </div>

        {/* Features */}

        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">

            <Truck
              className="mx-auto mb-4 text-green-600"
              size={42}
            />

            <h3 className="text-lg font-bold">
              Daily Delivery
            </h3>

            <p className="mt-2 text-gray-600">
              Fresh dairy delivered every morning.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">

            <Leaf
              className="mx-auto mb-4 text-green-600"
              size={42}
            />

            <h3 className="text-lg font-bold">
              100% Organic
            </h3>

            <p className="mt-2 text-gray-600">
              Pure, healthy and chemical-free.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">

            <ShieldCheck
              className="mx-auto mb-4 text-green-600"
              size={42}
            />

            <h3 className="text-lg font-bold">
              Quality Assured
            </h3>

            <p className="mt-2 text-gray-600">
              Every product is lab tested.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">

            <CalendarDays
              className="mx-auto mb-4 text-green-600"
              size={42}
            />

            <h3 className="text-lg font-bold">
              Flexible Plans
            </h3>

            <p className="mt-2 text-gray-600">
              Pause or cancel anytime.
            </p>

          </div>

        </div>

        {/* Pricing Cards */}

        <div className="grid gap-8 lg:grid-cols-3">
                    {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${
                plan.popular
                  ? "border-2 border-green-600"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute right-5 top-5 rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-bold text-gray-900">
                {plan.title}
              </h2>

              <div className="mt-6 flex items-end">
                <span className="text-5xl font-bold text-green-700">
                  ₹{plan.price}
                </span>

                <span className="mb-2 ml-2 text-lg text-gray-500">
                  {plan.duration}
                </span>
              </div>

              <div className="mt-8 border-t pt-6">

                <ul className="space-y-4">

                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                        <Check
                          size={16}
                          className="text-green-600"
                        />
                      </div>

                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>

              <button
                onClick={() =>
                  handleSubscribe(plan)
                }
                className={`mt-10 w-full rounded-xl ${plan.color} py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
              >
                Subscribe Now
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}