import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// API response shape from webhook
type ApiPerformanceItem = {
  company_name?: string;
  region_name?: string;
  performance_date?: string;
  change_1d?: string; // amount change e.g. "+22.92"
  change_1d_percentage?: string; // e.g. "+0.58%"
  change_30d?: string;
  change_30d_percentage?: string;
  change_6m?: string;
  change_6m_percentage?: string;
  change_1y?: string;
  change_1y_percentage?: string;
  currency?: string;
};

function formatCurrency(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function parsePercentString(p?: string) {
  if (!p) return null;
  const cleaned = String(p).replace(/%/g, "").replace(/,/g, "").trim();
  const n = Number(cleaned.replace("+", ""));
  if (Number.isNaN(n)) return null;
  return n;
}

function parseNumberString(s?: string) {
  if (s == null) return null;
  const cleaned = String(s).replace(/,/g, "").replace(/\+/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const API_URL = "https://gold-ai-insight.app.n8n.cloud/webhook/gold-performance-usa";

export default function MarketStats() {
  const [gold, setGold] = useState<ApiPerformanceItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      try {
        
        
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const res = await fetch(API_URL, requestOptions as RequestInit);


        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as ApiPerformanceItem[];
        const item = Array.isArray(json) && json.length ? json[0] : null;
        if (!cancelled) setGold(item);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Fetch error");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // currency symbol
  const currencySymbol = gold?.currency === "USD" ? "$" : (gold?.currency ?? "");

  const rows = [
    {
      label: "Today",
      amount: parseNumberString(gold?.change_1d),
      percent: parsePercentString(gold?.change_1d_percentage),
    },
    {
      label: "30 Days",
      amount: parseNumberString(gold?.change_30d),
      percent: parsePercentString(gold?.change_30d_percentage),
    },
    {
      label: "6 Months",
      amount: parseNumberString(gold?.change_6m),
      percent: parsePercentString(gold?.change_6m_percentage),
    },
    {
      label: "1 Year",
      amount: parseNumberString(gold?.change_1y),
      percent: parsePercentString(gold?.change_1y_percentage),
    },
    {
      label: "5 Years",
      amount: null,
      percent: null,
    },
    {
      label: "20 Years",
      amount: null,
      percent: null,
    },
  ];

  return (
    <div>
      {error && <div className="text-sm text-red-500 mb-2">Không thể tải dữ liệu: {error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="text-left px-3 py-2 font-medium text-slate-600 dark:text-slate-400">Change</th>
              <th className="text-right px-3 py-2 font-medium text-slate-600 dark:text-slate-400">Amount</th>
              <th className="text-right px-3 py-2 font-medium text-slate-600 dark:text-slate-400">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isPositive = row.percent !== null && row.percent !== undefined && row.percent > 0;
              const isNegative = row.percent !== null && row.percent !== undefined && row.percent < 0;

              return (
                <tr key={row.label} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-3 py-2 text-slate-700 dark:text-white font-medium">{row.label}</td>
                  <td className="px-3 py-2 text-right font-semibold text-slate-900 dark:text-white">
                    {row.amount !== null ? (
                      <span className={`${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-slate-900 dark:text-white"}`}>
                        {row.amount! >= 0 ? "+" : "-"}{currencySymbol}{formatCurrency(Math.abs(row.amount!))}
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {row.percent !== null ? (
                      <span className={`${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-slate-700 dark:text-white"} inline-flex items-center gap-1`}> 
                        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : isNegative ? <ArrowDownRight className="w-4 h-4" /> : null}
                        {Math.abs(row.percent!).toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-slate-500">goldprice.org · updated</div>
    </div>
  );
}
