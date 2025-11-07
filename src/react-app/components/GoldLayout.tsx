import { useEffect, useMemo, useState } from "react";
import GoldPriceChart from "./GoldPriceChart";
import MarketStats from "./MarketStat";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
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

  // --- News items + voting/tab state ---
  type NewsItem = {
    id: string;
    title: string;
    source?: string;
    time?: string; // legacy display
    createdAt: string; // ISO,
    content: string;
  };

  const initialItems: NewsItem[] = [
    {
      id: "news-1",
      title: "Vàng tăng do lo ngại lạm phát",
      source: "Reuters",
      time: "2 giờ trước",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: ''
    },
    {
      id: "news-2",
      title: "Thị trường vàng ổn định trước quyết định lãi suất",
      source: "Bloomberg",
      time: "6 giờ trước",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
       content: ''
    },
    {
      id: "news-3",
      title: "Tweet: Giá vàng có thể tiếp tục tăng",
      source: "@goldlover",
      time: "10 giờ trước",
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: `abc`
    },
  ];

  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [tab, setTab] = useState<"top" | "newest">("top");

  type VotesMap = Record<string, { up: number; down: number }>;
  type UserVotesMap = Record<string, "up" | "down" | null>;

  const [votes, setVotes] = useState<VotesMap>({});
  const [userVotes, setUserVotes] = useState<UserVotesMap>({});

  const STORAGE_KEY = "news_votes_v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setVotes(parsed.votes || {});
        setUserVotes(parsed.userVotes || {});
      } else {
        // initialize counts to zero for items
        const init: VotesMap = {};
        initialItems.forEach((it) => (init[it.id] = { up: 0, down: 0 }));
        setVotes(init);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ votes, userVotes }));
    } catch (e) {
      // ignore
    }
  }, [votes, userVotes]);

  function toggleVote(id: string, type: "up" | "down") {
    setVotes((prev) => {
      const cur = prev[id] ?? { up: 0, down: 0 };
      const user = userVotes[id] ?? null;
      const next = { ...prev };
      const nv = { up: cur.up, down: cur.down };

      if (user === type) {
        // remove vote
        if (type === "up") nv.up = Math.max(0, nv.up - 1);
        else nv.down = Math.max(0, nv.down - 1);
        next[id] = nv;
        setUserVotes((uv) => ({ ...uv, [id]: null }));
        return next;
      }

      if (user === null || user === undefined) {
        // add vote
        if (type === "up") nv.up += 1;
        else nv.down += 1;
      } else {
        // switch vote
        if (type === "up") {
          nv.up += 1;
          nv.down = Math.max(0, nv.down - 1);
        } else {
          nv.down += 1;
          nv.up = Math.max(0, nv.up - 1);
        }
      }
      next[id] = nv;
      setUserVotes((uv) => ({ ...uv, [id]: type }));
      return next;
    });
  }

  function timeAgo(iso: string) {
    const then = new Date(iso).getTime();
    const diff = Math.floor((Date.now() - then) / 1000);
    if (diff < 60) return `${diff} giây trước`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m} phút trước`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    return `${d} ngày trước`;
  }

  const sortedItems = useMemo(() => {
    const withScore = items.map((it) => ({
      ...it,
      score: (votes[it.id]?.up ?? 0) - (votes[it.id]?.down ?? 0),
    }));
    if (tab === "top") {
      return withScore.sort((a, b) => (b.score - a.score) || (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    return withScore.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [items, votes, tab]);

  const PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / PER_PAGE));

  // visible items for current page
  const visibleItems = sortedItems.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function goToPage(n: number) {
    const p = Math.min(Math.max(1, Math.floor(n)), totalPages);
    setCurrentPage(p);
  }
  function prevPage() {
    setCurrentPage((p) => Math.max(1, p - 1));
  }
  function nextPage() {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }

  // reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tab, totalPages]);

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
                  //yAxisLeftLabel="VND"
                  //yAxisRightLabel="VND"
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

          <div>
            {/* Tabs: Top / Newest */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-md mb-4 w-full">
              <button
                type="button"
                className={`px-3 py-1 rounded-md text-sm ${tab === "top" ? "bg-white dark:bg-slate-900 shadow" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setTab("top")}
              >
                Top
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-md text-sm ${tab === "newest" ? "bg-white dark:bg-slate-900 shadow" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setTab("newest")}
              >
                Mới nhất
              </button>
            </div>

            <div className="space-y-3">
              {visibleItems.map((it) => (
                <div key={it.id} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-md hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-slate-900 dark:text-white" onClick={() => openArticle(it)}>{it.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{it.source} · {timeAgo(it.createdAt)}</p>

                      <div className="flex items-center gap-2 ml-3">
                      <button
                        onClick={() => toggleVote(it.id, "up")}
                        className={`p-1 rounded-md ${userVotes[it.id] === "up" ? "bg-green-100 text-green-700" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                        aria-label="Upvote"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <div className="text-sm text-slate-700 dark:text-slate-200">{votes[it.id]?.up ?? 0}</div>

                      <button
                        onClick={() => toggleVote(it.id, "down")}
                        className={`p-1 rounded-md ${userVotes[it.id] === "down" ? "bg-red-100 text-red-700" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                        aria-label="Downvote"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <div className="text-sm text-slate-700 dark:text-slate-200">{votes[it.id]?.down ?? 0}</div>
                    </div>
                    </div>

                    
                  </div>
                </div>
              ))}

              {items.length === 0 && <div className="text-sm text-slate-500">Không có tin tức nào.</div>}
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2">
              <button onClick={prevPage} disabled={currentPage === 1} className={`px-2 py-1 rounded-md text-sm ${currentPage === 1 ? "text-slate-300" : "bg-slate-100 dark:bg-slate-800"}`}>
                Prev
              </button>

              <nav aria-label="Pagination" className="inline-flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-2 py-1 rounded-md text-sm ${page === currentPage ? "bg-white dark:bg-slate-900 shadow" : "text-slate-600 dark:text-slate-300"}`}
                    >
                      {page}
                    </button>
                  );
                })}
              </nav>

              <button onClick={nextPage} disabled={currentPage === totalPages} className={`px-2 py-1 rounded-md text-sm ${currentPage === totalPages ? "text-slate-300" : "bg-slate-100 dark:bg-slate-800"}`}>
                Next
              </button>
            </div>

           
          </div>

          {/* Modal for news details and comments */}
          <NewsModal open={modalOpen} onClose={closeArticle} article={selectedArticle} />
        </div>
      </aside>
    </section>
  );
}
