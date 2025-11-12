import Header from "./Header1";
import { BarChart3, TrendingUp, Wallet, Activity, Search, Info, Menu } from "lucide-react";
import GoldLayout from "./GoldLayout";
import { useState } from "react";

export default function Dashboards1() {
  //const { user } = useAuth();

  const dashboardCards = [
    {
      title: "Portfolio Value",
      value: "$45,230",
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


  const [activeTab, setActiveTab] = useState('Top');

  const tabs = [
    'Top',
    'Trending',
    'Four.Meme - X Mode',
    'Most Visited',
    'New',
    'Gainers',
    'Real-World Assets',
    'More'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Keep existing Gold layout and Alerts below */}
        <GoldLayout />

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Price Alerts</h2>
          <div className="space-y-3">
            {[{ crypto: 'Bitcoin', condition: '> $45,000', status: 'Active' }, { crypto: 'Ethereum', condition: '< $2,000', status: 'Active' }, { crypto: 'Solana', condition: '> $150', status: 'Triggered' }].map((alert) => (
              <div key={`${alert.crypto}-${alert.condition}`} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{alert.crypto}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Alert when price is {alert.condition}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alert.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'}`}>{alert.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
