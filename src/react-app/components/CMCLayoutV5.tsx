import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Search, Bell, Menu, Globe, FileText, Twitter, Facebook, MessageCircle, ExternalLink, ChevronDown, Star, Share2 } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

// Mock data for markets and posts
const marketsData = [
  { exchange: 'Binance', pair: 'BTC/USDT', price: '$103,331.72', volume: '$2,277,995,108', confidence: 'High', liquidity: 1225 },
  { exchange: 'Binance', pair: 'BTC/FDUSD', price: '$103,315.46', volume: '$1,931,241,182', confidence: 'High', liquidity: 950 },
  { exchange: 'Coinbase', pair: 'BTC/USD', price: '$103,298.21', volume: '$1,654,332,891', confidence: 'High', liquidity: 1180 },
  { exchange: 'Kraken', pair: 'BTC/EUR', price: '€95,432.18', volume: '$892,441,273', confidence: 'High', liquidity: 845 },
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
      <span className="text-white font-bold text-sm">G</span>
    </div>
    <span className="font-bold text-lg hidden lg:block">GoldMarket</span>
  </div>
);

const NavMenu = () => (
  <nav className="hidden lg:flex items-center gap-6 text-sm">
    <a href="#" className="text-gray-700 hover:text-blue-600">Dashboards</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Exchanges</a>
    <a href="#" className="text-gray-700 hover:text-blue-600">Community</a>
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

const UserMenu = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
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
      {isAuthenticated ? (
        <button onClick={logout} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
          Log Out
        </button>
      ) : (
        <button onClick={onLoginClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
          Log In
        </button>
      )}
      <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

const Header = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
      <Logo />
      <NavMenu />
      <SearchBar />
      <UserMenu onLoginClick={onLoginClick} />
    </div>
  </header>
);


const GoldIcon = () => (
  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
    <span className="text-white font-bold text-xl">🏅</span>
  </div>
);

const PriceChange = ({ value, isPositive }) => (
  <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
    {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
    {value}
  </span>
);

const Badge = ({ children }) => (
  <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', onClick, disabled }: any) => {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClass} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const CoinHeader = ({ latestData }) => {
  const sellPrice = latestData ? formatPrice(latestData.vn_sell_price) : 'Loading...';
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <GoldIcon />
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Gold VN</h1>
            <span className="text-gray-500 text-sm">SJC</span>
            <Badge>#1</Badge>
          </div>
        </div>
        <Star className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center space-x-1">
      </div>
    </div>
  );
};

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


const formatPrice = (price) => {
  if (!price) return 'N/A';
  const numPrice = parseFloat(price);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(numPrice);
};

const formatDate = (dateString) => {
  try{
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  catch(e){
    console.error(dateString)
  }
};

const calculateChange = (data) => {
  if (!data || data.length < 2) return { value: 0, isPositive: true };
  
  const latest = parseFloat(data[data.length - 1].sellPriceVN);
  const previous = parseFloat(data[0].sellPriceVN);
  const change = ((latest - previous) / previous) * 100;
  
  return {
    value: Math.abs(change).toFixed(2),
    isPositive: change >= 0
  };
};

const PriceDisplay = ({ latestData, chartData }) => {
  const sellPrice = latestData ? formatPrice(latestData.sellPriceVN) : 'Loading...';
  const change = calculateChange(chartData);
  const lastUpdate = latestData ? formatDate(latestData.time) : '';
  
  return (
    <div className="space-y-2">
      <div className="flex items-baseline space-x-3">
        <span className="text-4xl font-bold">{sellPrice}</span>
        <PriceChange value={`${change.value}%`} isPositive={change.isPositive} />
      </div>
      {lastUpdate && (
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdate}
        </div>
      )}
    </div>
  );
};

const StatsGrid = ({ latestData }) => {
  if (!latestData) return null;
  
  const buyPrice = formatPrice(latestData.buyPriceVN);
  const sellPrice = formatPrice(latestData.sellPriceVN);
  const usdBuy = formatPrice(latestData.buyPriceUS);
  const usdSell = formatPrice(latestData.sellPriceUS);
  const spread = parseFloat(latestData.sellPriceVN) - parseFloat(latestData.buyPriceVN);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
      <StatItem label="VN Buy Price" value={buyPrice} />
      <StatItem label="VN Sell Price" value={sellPrice} />
      <StatItem label="Spread" value={formatPrice(spread)} />
      <StatItem label="USD Buy (VND)" value={usdBuy} />
      <StatItem label="USD Sell (VND)" value={usdSell} />
    </div>
  );
};

const StatItem = ({ label, value, change, isPositive }: any) => (
  <div>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="font-semibold">{value}</div>
    {change && (
      <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {change}
      </div>
    )}
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

const ChartSection = ({ chartData, loading }) => (
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
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-gray-500">Đang tải dữ liệu biểu đồ...</div>
        </div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#999" style={{ fontSize: '12px' }} />
            <YAxis stroke="#999" style={{ fontSize: '12px' }} />
            <Tooltip />
            <Line type="monotone" dataKey="buyPriceVN" stroke="#10b981" strokeWidth={2} dot={false} name="Giá mua VN" />
            <Line type="monotone" dataKey="sellPriceVN" stroke="#ef4444" strokeWidth={2} dot={false} name="Giá bán VN" />
            <Line type="monotone" dataKey="buyPriceUS" stroke="#3b82f6" strokeWidth={2} dot={false} name="Giá mua US" />
            <Line type="monotone" dataKey="sellPriceUS" stroke="#f59e0b" strokeWidth={2} dot={false} name="Giá bán US" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-gray-500">Không có dữ liệu biểu đồ</div>
        </div>
      )}
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

const NewsSection = ({ newsData, loading, onNewsClick }) => (
  <section id="news" className="mb-12">
    <h2 className="text-xl font-bold mb-4">Latest News</h2>
    {loading ? (
      <div className="text-center py-8 text-gray-500">Đang tải tin tức...</div>
    ) : newsData.length > 0 ? (
      <div className="space-y-3">
        {newsData.map((news, i) => (
          <div 
            key={i} 
            onClick={() => onNewsClick(news)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <h3 className="font-medium mb-2 flex items-center gap-2 text-sm">
              {news.title}
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{news.source || 'Gold News'}</span>
              <span>•</span>
              <span>{news.time || news.publishedAt}</span>
            </div>
            {news.summary && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{news.summary}</p>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">Không có tin tức</div>
    )}
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


type AuthMode = 'login' | 'register';

const AuthModal = ({ isOpen, mode, onClose, onSwitchMode }: { isOpen: boolean; mode: AuthMode; onClose: () => void; onSwitchMode: (mode: AuthMode) => void; }) => {
  const { login, register, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      if (mode === 'register') {
        if (password !== confirm) {
          setLocalError('Mật khẩu xác nhận không khớp');
          return;
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch {
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onClick={onClose}>
      <div className="fixed inset-0 bg-gray-500/50 bg-opacity-75 transition-opacity" />
      <div className="flex items-center justify-center min-h-screen px-4 py-6" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full z-50">
          <div className="px-6 py-4 border-b border-gray-200 rounded-t-lg flex items-center justify-between">
            <h3 id="auth-modal-title" className="text-lg font-semibold">{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Họ tên</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Xác nhận mật khẩu</label>
                <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            {(localError || error) && <div className="text-sm text-red-600">{localError || error}</div>}
            <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-50">
              {isLoading ? 'Đang xử lý...' : (mode === 'login' ? 'Đăng nhập' : 'Đăng ký')}
            </button>
            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <button type="button" onClick={() => onSwitchMode('register')} className="text-blue-600 hover:underline">Chưa có tài khoản? Đăng ký</button>
              ) : (
                <button type="button" onClick={() => onSwitchMode('login')} className="text-blue-600 hover:underline">Đã có tài khoản? Đăng nhập</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const NewsModalV4 = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500/50 bg-opacity-75 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Modal */}
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{article.source?.[0] || 'N'}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{article.source || 'News Source'}</h3>
                  <p className="text-sm text-gray-500">{formatDate(article.published_date)}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto rounded-b-lg">
            <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
            
            {article.image_url && (
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {article.content || article.description || 'No content available'}
              </p>
            </div>
            
            {article.url && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read full article
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsModal = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold pr-8">{news.title}</h2>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <span className="text-2xl text-gray-500">&times;</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>{news.source || 'Gold News'}</span>
            <span>•</span>
            <span>{news.time || news.publishedAt}</span>
          </div>

          {news.image && (
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-auto rounded-lg mb-6"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}

          {news.summary && (
            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-700 font-medium">{news.summary}</p>
            </div>
          )}

          {news.content && (
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br />') }} />
            </div>
          )}

          {!news.content && news.description && (
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p>{news.description}</p>
            </div>
          )}

          {news.url && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a 
                href={news.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                <span>Đọc bài viết gốc</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
export default function App() {
  const [activeTab, setActiveTab] = useState('Chart');
  const [chartData, setChartData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const sectionsRef = useRef({});
   const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

   const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };


  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoadingChart(true);
       const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const response = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/chart-data', requestOptions as RequestInit);
      
        const data = await response.json();

        
        
        // Transform data for chart
        const transformed = data.map(item => ({
          time: formatDate(item.date),
          buyPriceVN: item.vn_buy_price,
          sellPriceVN: item.vn_sell_price,
          buyPriceUS: item.usd_buy_in_vnd,
          sellPriceUS: item.usd_sell_in_vnd,
        }));
        
        setChartData(transformed);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, []);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const PER_PAGE = 10;
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
         body: JSON.stringify({
            page_size: PER_PAGE,
            page_number: 0,
            order_by:  "created_at",
          }),
      };

      const response = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/news', requestOptions as RequestInit);

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
        
        // Handle both array and single object responses
        const articles = Array.isArray(data) ? data : [data];
        setNewsData(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsData([]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

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

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const latestData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={() => { setAuthMode('login'); setIsAuthOpen(true); }} />

      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />

      <NewsModalV4
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        article={selectedArticle}
      />
      
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-20">
              <CoinHeader latestData={latestData} />
              <PriceDisplay latestData={latestData} chartData={chartData}/>
              <StatsGrid latestData={latestData} />
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
                <ChartSection chartData={chartData} loading={loadingChart} />
              </div>
              <div ref={el => sectionsRef.current.markets = el}>
                <MarketsSection />
              </div>
              <div ref={el => sectionsRef.current.news = el}>
                <NewsSection newsData={newsData} loading={loadingNews} onNewsClick={handleArticleClick} />
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
