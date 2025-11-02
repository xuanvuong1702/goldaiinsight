import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: number;
  unit?: string;
}

const stats: StatCard[] = [
  {
    label: "Giá vàng thế giới",
    value: "2.15",
    change: 2.5,
    unit: "T",
  },
  {
    label: "24h Volume",
    value: "145.2",
    change: -1.2,
    unit: "B",
  },
  {
    label: "BTC Dominance",
    value: "48.5",
    change: 0.8,
    unit: "%",
  },
  {
    label: "ETH Price",
    value: "2,450",
    change: 5.3,
    unit: "$",
  },
];

export default function MarketStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
        >
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {stat.label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
              {stat.unit && <span className="text-lg ml-1">{stat.unit}</span>}
            </p>
            <div
              className={`flex items-center gap-1 ${
                stat.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">
                {Math.abs(stat.change)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
