import {
  Users,
  Warehouse,
  Truck,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "20K+",
    title: "Happy Customers",
  },
  {
    icon: Warehouse,
    value: "150+",
    title: "Partner Farms",
  },
  {
    icon: Truck,
    value: "500+",
    title: "Daily Deliveries",
  },
  {
    icon: ShieldCheck,
    value: "99%",
    title: "Customer Satisfaction",
  },
];

export default function HeroStats() {
  return (
    <div className="absolute bottom-2 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">

      <div className="rounded-2xl bg-white shadow-xl">

        <div className="flex justify-between items-center">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-3 ${
                  index !== stats.length - 1
                    ? "border-r border-gray-200"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="flex h-5 w-5 items-center justify-center rounded-xl bg-green-50">

                  <Icon
                    size={24}
                    className="text-green-700"
                  />

                </div>

                {/* Text */}

                <div>

                  <h2 className="text-2xl font-bold leading-none text-green-700">
                    {item.value}
                  </h2>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    {item.title}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}