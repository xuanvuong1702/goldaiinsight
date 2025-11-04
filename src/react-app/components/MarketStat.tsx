import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: number;
  unit?: string;
}

type GoldApiResponse = {
  currentPrice: string;
  previousDayPrice: string;
  thirtyAgoPrice: string;
  sixMonthAgoPrice: string;
  todayPercentage: string; // e.g. "+0.66%"
  thirtyPercentage: string;
  sixMonthPercentage: string;
};

function formatNumber(value?: string) {
  if (!value) return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function parsePercentString(p?: string) {
  if (!p) return 0;
  const cleaned = p.replace("%", "").replace("+", "");
  const n = Number(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

export default function MarketStats() {
  const [gold, setGold] = useState<GoldApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchGold = async () => {
      setLoading(true);
      setError(null);
      try {
        

       const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const res = await fetch("https://phungxuanvuong97.app.n8n.cloud/webhook/gold-performance", requestOptions as RequestInit);


        debugger
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as GoldApiResponse;
        if (mounted) setGold(data);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchGold();

    return () => {
      mounted = false;
    };
  }, []);

  const stats: StatCard[] = [
    {
      label: "Giá hiện tại",
      value: gold ? formatNumber(gold.currentPrice) : loading ? "Loading..." : "—",
      change: gold ? parsePercentString(gold.todayPercentage) : 0,
    },
    {
      label: "1 ngày trước",
      value: gold ? formatNumber(gold.previousDayPrice) : loading ? "Loading..." : "—",
      change: gold ? parsePercentString(gold.todayPercentage) : 0,
    },
    {
      label: "1 tháng trước",
      value: gold ? formatNumber(gold.thirtyAgoPrice) : loading ? "Loading..." : "—",
      change: gold ? parsePercentString(gold.thirtyPercentage) : 0,
    },
    {
      label: "6 tháng trước",
      value: gold ? formatNumber(gold.sixMonthAgoPrice) : loading ? "Loading..." : "—",
      change: gold ? parsePercentString(gold.sixMonthPercentage) : 0,
    },
  ];

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
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {stat.value}
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

      {error && (
        <div className="col-span-full text-sm text-red-500 mt-2">Error loading gold data: {error}</div>
      )}
    </div>
  );
}
