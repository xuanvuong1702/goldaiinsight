import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type GoldApiResponse = {
  currentPrice: string;
  previousDayPrice: string;
  thirtyAgoPrice: string;
  sixMonthAgoPrice: string;
  todayPercentage?: string; // "+0.66%"
  thirtyPercentage?: string;
  sixMonthPercentage?: string;
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

export default function MarketStats() {
  const [gold, setGold] = useState<GoldApiResponse | null>(null);

  useEffect(() => {
    // Mock data (previously used live webhook) to render performance table
    const mock: GoldApiResponse = {
      currentPrice: "104932944.95929505",
      previousDayPrice: "104244928.4316462",
      thirtyAgoPrice: "104079493.11574593",
      sixMonthAgoPrice: "87269581.63614027",
      todayPercentage: "+0.66%",
      thirtyPercentage: "+0.82%",
      sixMonthPercentage: "+20.24%",
    };

    setGold(mock);
  }, []);

  const current = gold ? Number(gold.currentPrice) : NaN;
  const prev = gold ? Number(gold.previousDayPrice) : NaN;
  const ago30 = gold ? Number(gold.thirtyAgoPrice) : NaN;
  const ago6m = gold ? Number(gold.sixMonthAgoPrice) : NaN;

  const rows = [
    {
      label: "Today",
      amount: Number.isFinite(current) && Number.isFinite(prev) ? current - prev : null,
      percent: parsePercentString(gold?.todayPercentage) ?? (Number.isFinite(current) && Number.isFinite(prev) ? ((current - prev) / prev) * 100 : null),
    },
    {
      label: "30 Days",
      amount: Number.isFinite(current) && Number.isFinite(ago30) ? current - ago30 : null,
      percent: parsePercentString(gold?.thirtyPercentage) ?? (Number.isFinite(current) && Number.isFinite(ago30) ? ((current - ago30) / ago30) * 100 : null),
    },
    {
      label: "6 Months",
      amount: Number.isFinite(current) && Number.isFinite(ago6m) ? current - ago6m : null,
      percent: parsePercentString(gold?.sixMonthPercentage) ?? (Number.isFinite(current) && Number.isFinite(ago6m) ? ((current - ago6m) / ago6m) * 100 : null),
    },
    {
      label: "1 Year",
      amount: null,
      percent: null,
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
    <div >
     
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
                        {row.amount! >= 0 ? "+" : "-"}${formatCurrency(Math.abs(row.amount!))}
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
