import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import { getDashboardData } from "../../services/dashboardServices";
import RevenueChart from "../../components/Admin/charts/RevenueChart";
import OrderStatusChart from "../../components/Admin/charts/OrderStatusChart";
export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Logged-in User
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg font-semibold text-slate-500">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Products",
      value: data?.total_products ?? 0,
      icon: Package,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Orders",
      value: data?.total_orders ?? 0,
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Users",
      value: data?.total_users ?? 0,
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Revenue",
      value: `₹${data?.total_revenue ?? 0}`,
      icon: IndianRupee,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
  Welcome back, {(user?.name?.split(" ")[0]) || "Admin"} 👋
</h2>

            <p className="mt-2 text-sm text-slate-500">
              Here's what's happening with your DairyHub today.
            </p>

          </div>

          <div className="rounded-2xl bg-white px-6 py-4 shadow">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total Revenue
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              ₹{data?.total_revenue ?? 0}
            </h3>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-800">
                    {item.value}
                  </h2>

                  <div className="mt-5 flex items-center gap-2">

                    <TrendingUp
                      size={16}
                      className="text-emerald-500"
                    />

                    <span className="text-sm font-semibold text-emerald-600">
                      +12%
                    </span>

                    <span className="text-sm text-slate-400">
                      This Month
                    </span>

                  </div>

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    size={30}
                    className={item.iconColor}
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Recent Orders */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-slate-800">
            Recent Orders
          </h2>

          <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="pb-4 font-semibold text-slate-500">
                  Customer
                </th>

                <th className="pb-4 font-semibold text-slate-500">
                  Email
                </th>

                <th className="pb-4 font-semibold text-slate-500">
                  Amount
                </th>

                <th className="pb-4 font-semibold text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {(data?.recent_orders || []).map((order: any) => (

                <tr
                  key={order.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  <td className="py-5 font-medium text-slate-700">
                    {order.customer_name}
                  </td>

                  <td className="text-slate-500">
                    {order.customer_email}
                  </td>

                  <td className="font-semibold">
                    ₹{order.total}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}