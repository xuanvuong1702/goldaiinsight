import { useEffect, useMemo, useState } from "react";
import GoldPriceChart from "./GoldPriceChart";
import MarketStats from "./MarketStat";
import { Search } from "lucide-react";
import NewsModal from "./NewsModal";

const API_URL = "https://phungxuanvuong97.app.n8n.cloud/webhook/chart-data";

type ApiItem = {
  date: string;
  vn_buy_price?: string;
  vn_sell_price?: string;
  usd_sell_in_vnd?: string;
  usd_buy_in_vnd?: string;
};

type ChartPoint = {
  date: string; // YYYY-MM-DD
  vn: number | null;
  world: number | null;
};

function toYYYYMMDD(isoLike: string): string {
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toNumOrNull(v?: string): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function GoldLayout() {
  const [data, setData] = useState<ChartPoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
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
  
      const res = await fetch(API_URL, requestOptions as RequestInit);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as ApiItem[];
        const mapped: ChartPoint[] = json
          .map((item) => {
            const date = toYYYYMMDD(item.date);
            const vn = toNumOrNull(item.vn_sell_price) ?? toNumOrNull(item.vn_buy_price);
            const world = toNumOrNull(item.usd_sell_in_vnd) ?? toNumOrNull(item.usd_buy_in_vnd);
            return date ? { date, vn, world } : null;
          })
          .filter((x): x is ChartPoint => !!x);

        if (!cancelled) {
          // sort ascending by date
          mapped.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
          setData(mapped);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Fetch error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasData = useMemo(() => Array.isArray(data) && data.length > 0, [data]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{ title: string; source?: string; time?: string } | null>(null);

  const openArticle = (item: { title: string; source?: string; time?: string }) => {
    setSelectedArticle(item);
    setModalOpen(true);
  };

  const closeArticle = () => {
    setModalOpen(false);
    setSelectedArticle(null);
  };

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
            <div className="mx-auto my-[20px] max-w-[1100px] min-w-[600px] font-sans w-full">
              {loading && (
                <div className="text-sm text-slate-500">Đang tải dữ liệu…</div>
              )}
              {!loading && error && (
                <div className="text-sm text-red-500">Không thể tải dữ liệu: {error}</div>
              )}
              {!loading && !error && hasData && (
                <GoldPriceChart
                  data={data as ChartPoint[]}
                  vnLabel="Giá vàng VN (VND)"
                  worldLabel="Giá vàng Thế giới (VND)"
                  yAxisLeftLabel="VND"
                  yAxisRightLabel="VND"
                />
              )}
              {!loading && !error && !hasData && (
                <div className="text-sm text-slate-500">Không có dữ liệu để hiển thị</div>
              )}
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
              <button
                key={item.title}
                type="button"
                onClick={() => openArticle(item)}
                className="w-full text-left p-3 bg-slate-50 dark:bg-slate-800 rounded-md hover:shadow-sm"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.source} · {item.time}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm">Xem thêm</button>
          </div>

          {/* Modal for news details and comments */}
          <NewsModal open={modalOpen} onClose={closeArticle} article={selectedArticle} />
        </div>
      </aside>
    </section>
  );
}
