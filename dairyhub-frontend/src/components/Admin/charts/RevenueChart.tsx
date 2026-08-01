import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 4500 },
  { day: "Tue", revenue: 6200 },
  { day: "Wed", revenue: 5100 },
  { day: "Thu", revenue: 8300 },
  { day: "Fri", revenue: 7600 },
  { day: "Sat", revenue: 9800 },
  { day: "Sun", revenue: 11200 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Revenue Overview
        </h2>

        <p className="text-sm text-slate-500">
          Last 7 Days Revenue
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}