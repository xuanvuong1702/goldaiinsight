import GoldChart from "./GoldChart";
import MarketStats from "./MarketStat";
import { Search } from "lucide-react";

export default function GoldLayout() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      {/* Left: Performance */}
      <aside className="lg:col-span-3">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance</h3>
          <MarketStats />
        </div>
      </aside>

      {/* Center: Price Chart */}
      <main className="lg:col-span-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Biểu đồ giá vàng</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Giá vàng hiện tại và lịch sử</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  placeholder="Tìm kiếm tin tức"
                  className="pl-9 pr-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm"
                />
                <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="h-96 flex items-center justify-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-100 dark:border-slate-800 rounded-md">
            {/* Chart placeholder - integrate chart library here */}
            <GoldChart></GoldChart>
            {/* <div className="text-center">
              <div className="text-xl font-semibold text-slate-700 dark:text-white">Chart area</div>
              <div className="text-sm mt-2">Kết nối với API để vẽ biểu đồ giá vàng</div>
            </div> */}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">24h Change</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">+0.66%</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400">Market Cap</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">$2.9B</p>
            </div>
          </div>
        </div>
      </main>

      {/* Right: News / Tweets */}
      <aside className="lg:col-span-3">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tin tức & Nhiệt tình</h3>

          <div className="space-y-4">
            {[
              {
                title: "Vàng tăng do lo ngại lạm phát",
                source: "Reuters",
                time: "2 giờ trước",
              },
              {
                title: "Thị trường vàng ổn định trước quyết định lãi suất",
                source: "Bloomberg",
                time: "6 giờ trước",
              },
              {
                title: "Tweet: Giá vàng có thể tiếp tục tăng",
                source: "@goldlover",
                time: "10 giờ trước",
              },
            ].map((item) => (
              <article key={item.title} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.source} · {item.time}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm">Xem thêm</button>
          </div>
        </div>
      </aside>
    </section>
  );
}
