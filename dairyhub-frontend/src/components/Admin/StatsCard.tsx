import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  iconBg: string;
  growth: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  iconBg,
  growth,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Background Decoration */}

      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-slate-100 opacity-40 transition-all duration-500 group-hover:scale-125"></div>

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">

            <div className="rounded-full bg-emerald-100 p-1">
              <TrendingUp
                size={14}
                className="text-emerald-600"
              />
            </div>

            <span className="text-sm font-semibold text-emerald-600">
              {growth}
            </span>

            <span className="text-sm text-slate-400">
              This Month
            </span>

          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon
            size={30}
            className={color}
          />
        </div>

      </div>

    </div>
  );
}