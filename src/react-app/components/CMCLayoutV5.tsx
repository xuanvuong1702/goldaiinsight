import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Search, Bell, Menu, Globe, FileText, Twitter, Facebook, MessageCircle, ExternalLink, ChevronDown, Star, Share2 } from 'lucide-react';

// Mock data
const chartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  price: 104000 + Math.random() * 3000 - 1500
}));

const marketsData = [
  { exchange: 'Binance', pair: 'BTC/USDT', price: '$103,331.72', volume: '$2,277,995,108', confidence: 'High', liquidity: 1225 },
  { exchange: 'Binance', pair: 'BTC/FDUSD', price: '$103,315.46', volume: '$1,931,241,182', confidence: 'High', liquidity: 950 },
  { exchange: 'Coinbase', pair: 'BTC/USD', price: '$103,298.21', volume: '$1,654,332,891', confidence: 'High', liquidity: 1180 },
  { exchange: 'Kraken', pair: 'BTC/EUR', price: '€95,432.18', volume: '$892,441,273', confidence: 'High', liquidity: 845 },
];

const newsData = [
  { title: 'Bitcoin ETF Sees Record Inflows', time: '2 hours ago', source: 'CryptoNews' },
  { title: 'Major Institution Adds BTC to Balance Sheet', time: '4 hours ago', source: 'Bloomberg' },
  { title: 'Analysis: BTC Could Hit New ATH Soon', time: '6 hours ago', source: 'CoinDesk' },
];

const postsData = [
  { author: 'Crypto-Andy', verified: true, time: '8 hours', content: 'Tuesday Check-in - 🔥 $BTC Calm Before the Next Move', likes: 256, comments: 15 },
  { author: 'BitcoinMaxi', verified: false, time: '12 hours', content: 'The week rolls on with fresh updates from Washington, Asia, and the crypto space 🌐', likes: 189, comments: 8 },
  { author: 'TraderJoe', verified: true, time: '1 day', content: 'Technical analysis shows strong support at $100k level', likes: 421, comments: 23 },
];

// Components
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">C</span>
    </div>
    <span className="font-bold text-lg hidden lg:block">GoldMarketCap</span>
  </div>
);

const NavMenu = () => (
  <nav className="hidden lg:flex items-center gap-6 text-sm">
    <a href="#" className="text-gray-700 hover:text-blue-600">Cryptocurrencies</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Dashboards</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">DexScan</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Exchanges</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Community</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
  </nav>
);

const SearchBar = () => (
  <div className="flex-1 max-w-md mx-4 hidden md:block">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

const UserMenu = () => (
  <div className="flex items-center gap-2">
    <button className="hidden md:flex items-center gap-1 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
      <span>Portfolio</span>
    </button>
    <button className="hidden md:flex items-center gap-1 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
      <span>Watchlist</span>
    </button>
    <button className="p-2 hover:bg-gray-100 rounded-lg">
      <Bell className="w-5 h-5 text-gray-600" />
    </button>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
      Log In
    </button>
    <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
      <Menu className="w-5 h-5 text-gray-600" />
    </button>
  </div>
);

const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
      <Logo />
      <NavMenu />
      <SearchBar />
      <UserMenu />
    </div>
  </header>
);

const CoinHeader = () => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-lg">₿</span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Bitcoin</h1>
          <span className="text-gray-500 text-sm">BTC</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Rank #1</span>
        </div>
      </div>
    </div>
    <div className="text-3xl font-bold mb-1">$104,758.35</div>
    <div className="flex items-center gap-2 text-red-500 font-medium">
      <TrendingDown className="w-4 h-4" />
      <span>6.84%</span>
      <span className="text-gray-500 text-sm">(24h)</span>
    </div>
    <div className="mt-4 text-xs text-gray-500">
      Why is BTC's price down today?
    </div>
  </div>
);

const StatItem = ({ label, value, sublabel }) => (
  <div className="py-3 border-b border-gray-200 last:border-0">
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
    {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
  </div>
);

const StatGrid = () => (
  <div className="mb-6">
    <StatItem label="Market cap" value="$2.08T" sublabel="↓ -6.47%" />
    <StatItem label="Volume (24h)" value="$60.73B" sublabel="↑ +13.38%" />
    <StatItem label="Vol/Mkt cap (24h)" value="3.07%" />
    <StatItem label="Circulating supply" value="19.94M BTC" />
    <StatItem label="Total supply" value="19.94M BTC" />
    <StatItem label="Max. supply" value="21M BTC" />
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
    </div>
  </div>
);

const LinkList = () => (
  <div className="mb-6">
    <div className="text-sm font-semibold mb-3">Explorers</div>
    <div className="flex flex-wrap gap-2 mb-4">
      <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
        blockchain.info
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
    <div className="text-sm font-semibold mb-3">Wallets</div>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Ledger</span>
    </div>
    <div className="text-sm font-semibold mb-3">Socials</div>
    <div className="flex gap-2">
      <a href="#" className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
        <Twitter className="w-4 h-4 text-gray-600" />
      </a>
      <a href="#" className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
        <MessageCircle className="w-4 h-4 text-gray-600" />
      </a>
    </div>
  </div>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
      active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
);

const Tabs = ({ activeTab, onTabChange }) => (
  <div className="border-b border-gray-200 mb-6 flex overflow-x-auto -mx-6 px-6">
    {['Chart', 'Markets', 'News', 'Yield', 'Market Cycles', 'About'].map(tab => (
      <TabButton key={tab} active={activeTab === tab} onClick={() => onTabChange(tab)}>
        {tab}
      </TabButton>
    ))}
  </div>
);

const ChartSection = () => (
  <section id="chart" className="mb-12">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
          Price <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
          Market cap <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-1">
        {['24h', '1W', '1M', '1Y', 'All', 'Log'].map(period => (
          <button key={period} className={`px-3 py-1 text-xs rounded ${period === '24h' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            {period}
          </button>
        ))}
      </div>
    </div>
    <div className="bg-white rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" stroke="#999" style={{ fontSize: '12px' }} />
          <YAxis stroke="#999" style={{ fontSize: '12px' }} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

const MarketsSection = () => (
  <section id="markets" className="mb-12">
    <h2 className="text-xl font-bold mb-4">Bitcoin Markets</h2>
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Exchange</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Pair</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Volume (24h)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Confidence</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Liquidity score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {marketsData.map((market, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{market.exchange}</td>
                <td className="px-4 py-3 text-blue-600 font-medium">{market.pair}</td>
                <td className="px-4 py-3">{market.price}</td>
                <td className="px-4 py-3">{market.volume}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">{market.confidence}</span>
                </td>
                <td className="px-4 py-3">{market.liquidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const NewsSection = () => (
  <section id="news" className="mb-12">
    <h2 className="text-xl font-bold mb-4">Latest News</h2>
    <div className="space-y-3">
      {newsData.map((news, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
          <h3 className="font-medium mb-2 flex items-center gap-2 text-sm">
            {news.title}
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{news.source}</span>
            <span>•</span>
            <span>{news.time}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="mb-12">
    <h2 className="text-xl font-bold mb-4">About Bitcoin</h2>
    <div className="prose max-w-none text-sm text-gray-700 leading-relaxed space-y-4">
      <p>
        Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto.
      </p>
      <p>
        The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak.
      </p>
      <p>
        The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way.
      </p>
    </div>
  </section>
);

const SentimentBar = () => (
  <div className="py-6">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-sm">Community sentiment</h3>
      <span className="text-xs text-gray-500">5.4M votes</span>
    </div>
    <div className="flex gap-2 mb-3">
      <button className="flex-1 bg-green-500 text-white py-2.5 rounded font-medium text-sm hover:bg-green-600 flex items-center justify-center gap-1">
        <span>🐂</span>
        <span>Bullish</span>
      </button>
      <button className="flex-1 bg-red-500 text-white py-2.5 rounded font-medium text-sm hover:bg-red-600 flex items-center justify-center gap-1">
        <span>🐻</span>
        <span>Bearish</span>
      </button>
    </div>
    <div className="flex w-full h-2 rounded-full overflow-hidden">
      <div className="bg-green-500" style={{ width: '82%' }}></div>
      <div className="bg-red-500" style={{ width: '18%' }}></div>
    </div>
    <div className="flex justify-between mt-2 text-xs text-gray-600">
      <span>82%</span>
      <span>18%</span>
    </div>
  </div>
);

const PostItem = ({ post }) => (
  <div className="py-4 border-b border-gray-100 last:border-0">
    <div className="flex gap-3">
      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
        {post.author[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-semibold text-sm">{post.author}</span>
          {post.verified && <span className="text-blue-500 text-xs">✓</span>}
          <span className="text-gray-500 text-xs">• {post.time}</span>
        </div>
        <p className="text-sm text-gray-700 mb-2">{post.content}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-600">
            <span>👍</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.comments}</span>
          </button>
          <button className="hover:text-blue-600">
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PostList = () => (
  <div className="py-6 border-t border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-sm">Top</h3>
      <button className="text-xs text-blue-600 hover:underline">See more #BTC Price Analysis</button>
    </div>
    {postsData.map((post, i) => <PostItem key={i} post={post} />)}
  </div>
);

const RightSidebarAd = () => (
  <div className="py-6">
    <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg p-4 text-white relative overflow-hidden h-48">
      <div className="relative z-10">
        <div className="text-xl font-bold mb-2">Today's Check-In</div>
        <div className="text-sm opacity-90">Top Headlines</div>
      </div>
      <div className="absolute right-4 bottom-4 opacity-20">
        <div className="text-6xl">₿</div>
      </div>
    </div>
  </div>
);

// Main App
export default function CMCLayoutV5() {
  const [activeTab, setActiveTab] = useState('Chart');
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const tabName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            if (['Chart', 'Markets', 'News', 'About'].includes(tabName)) {
              setActiveTab(tabName);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const sectionId = tab.toLowerCase().replace(' ', '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-20">
              <CoinHeader />
              <StatGrid />
              <LinkList />
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Watch</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
              <div ref={el => sectionsRef.current.chart = el}>
                <ChartSection />
              </div>
              <div ref={el => sectionsRef.current.markets = el}>
                <MarketsSection />
              </div>
              <div ref={el => sectionsRef.current.news = el}>
                <NewsSection />
              </div>
              <div ref={el => sectionsRef.current.about = el}>
                <AboutSection />
              </div>
            </div>
          </main>

          {/* Right Sidebar - NO border/rounded box, just content */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 space-y-0">
              <RightSidebarAd />
              <SentimentBar />
              <PostList />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}