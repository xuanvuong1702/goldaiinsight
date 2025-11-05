import Header from "./Header1";
import { useAuth } from "../context/AuthContext";
import { BarChart3, TrendingUp, Wallet, Activity } from "lucide-react";
import GoldLayout from "./GoldLayout";

export default function Dashboards1() {
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: "Portfolio Value",
      value: "$45,230.50",
      change: 12.5,
      icon: Wallet,
      color: "bg-blue-500",
    },
    {
      title: "Today's Gain",
      value: "$1,245.30",
      change: 8.3,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Total Assets",
      value: "12 Coins",
      change: 2,
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      title: "Active Alerts",
      value: "3",
      change: 0,
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        {/* <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Welcome back, <span className="font-semibold">{user?.name || user?.email}</span>!
          </p>
        </div> */}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {card.title}
                  </h3>
                  <div className={`${card.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {card.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  +{card.change}% from last week
                </p>
              </div>
            );
          })}
        </div>

        {/* Gold-specific 3-column layout */}
        <GoldLayout />

        {/* Alerts Section */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Price Alerts
          </h2>
          <div className="space-y-3">
            {[
              { crypto: "Bitcoin", condition: "> $45,000", status: "Active" },
              { crypto: "Ethereum", condition: "< $2,000", status: "Active" },
              { crypto: "Solana", condition: "> $150", status: "Triggered" },
            ].map((alert) => (
              <div
                key={`${alert.crypto}-${alert.condition}`}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {alert.crypto}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Alert when price is {alert.condition}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alert.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  }`}
                >
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
