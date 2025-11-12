import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Star, Bell, Search, Menu, ChevronDown, ExternalLink } from 'lucide-react';

// Mock Data
const chartData = [
  { time: '12:00 PM', price: 106470 },
  { time: '3:00 PM', price: 105200 },
  { time: '6:00 PM', price: 104800 },
  { time: '9:00 PM', price: 103900 },
  { time: '12 Nov', price: 103500 },
  { time: '3:00 AM', price: 103200 },
  { time: '6:00 AM', price: 103800 },
  { time: '9:00 AM', price: 103394 }
];

const marketsData = [
  { exchange: 'Binance', pair: 'BTC/USDT', price: '$103,394.23', depth2: '0.1%', depthMinus2: '0.1%', volume: '$2.1B', volumePercent: '33.2%', confidence: 'High' },
  { exchange: 'Coinbase', pair: 'BTC/USD', price: '$103,389.50', depth2: '0.1%', depthMinus2: '0.1%', volume: '$1.8B', volumePercent: '28.5%', confidence: 'High' },
  { exchange: 'Kraken', pair: 'BTC/USD', price: '$103,385.12', depth2: '0.2%', depthMinus2: '0.2%', volume: '$890M', volumePercent: '14.1%', confidence: 'High' }
];

// Components
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">G</span>
    </div>
    <span className="font-bold text-xl">GoldMarketCap</span>
  </div>
);

const NavLink = ({ children }) => (
  <a href="#" className="text-gray-700 hover:text-gray-900 text-sm">{children}</a>
);

const Navigation = () => (
  <nav className="hidden md:flex space-x-6">
    <NavLink>Cryptocurrencies</NavLink>
    <NavLink>Dashboards</NavLink>
    <NavLink>DexScan</NavLink>
  </nav>
);

const IconButton = ({ children, onClick }: any) => (
  <button onClick={onClick} className="text-gray-600 hover:text-gray-900 p-2">
    {children}
  </button>
);

const Button = ({ children, variant = 'primary', onClick }: any) => {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  
  return (
    <button onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center space-x-4">
          <IconButton><Bell className="w-5 h-5" /></IconButton>
          <IconButton><Search className="w-5 h-5" /></IconButton>
          <Button variant="primary">Log in</Button>
          <IconButton><Menu className="w-5 h-5" /></IconButton>
        </div>
      </div>
    </div>
  </header>
);

const CoinIcon = () => (
  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
    <span className="text-white font-bold text-xl">₿</span>
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

const CoinHeader = () => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <CoinIcon />
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Bitcoin</h1>
          <span className="text-gray-500 text-sm">BTC</span>
          <Badge>#1</Badge>
        </div>
      </div>
      <Star className="w-5 h-5 text-gray-400" />
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="primary">Buy BTC</Button>
      <Button variant="secondary">+ Follow</Button>
    </div>
  </div>
);

const PriceDisplay = () => (
  <div className="space-y-2">
    <div className="flex items-baseline space-x-3">
      <span className="text-4xl font-bold">$103,394.23</span>
      <PriceChange value="2.62% (24h)" isPositive={false} />
    </div>
    <button className="text-blue-600 text-sm hover:underline flex items-center">
      Why is BTC's price down today?
      <ChevronDown className="w-4 h-4 ml-1" />
    </button>
  </div>
);

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

const StatsGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
    <StatItem label="Market cap" value="$2.06T" change="2.62%" isPositive={false} />
    <StatItem label="Volume (24h)" value="$63.29B" change="5.05%" isPositive={true} />
    <StatItem label="Vol/Mkt cap (24h)" value="3.07%" />
    <StatItem label="Total supply" value="19.94M BTC" />
    <StatItem label="Circulating supply" value="19.94M BTC" />
    <StatItem label="Max. supply" value="21M BTC" />
  </div>
);

const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 font-medium transition-colors ${
      active 
        ? 'text-blue-600 border-b-2 border-blue-600' 
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
);

const TabList = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex border-b border-gray-200">
    {tabs.map(tab => (
      <Tab 
        key={tab} 
        active={activeTab === tab} 
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </Tab>
    ))}
  </div>
);

const TimeframeButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded transition-colors ${
      active 
        ? 'bg-blue-100 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const TimeframeSelector = ({ timeframes, activeTimeframe, onTimeframeChange }) => (
  <div className="flex space-x-2">
    {timeframes.map(tf => (
      <TimeframeButton
        key={tf}
        active={activeTimeframe === tf}
        onClick={() => onTimeframeChange(tf)}
      >
        {tf}
      </TimeframeButton>
    ))}
  </div>
);

const ChartControls = ({ timeframe, onTimeframeChange }) => {
  const timeframes = ['24h', '1W', '1M', '1Y', 'All', 'Log'];
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-600 hover:text-gray-900">Price</button>
        <button className="text-sm text-gray-600 hover:text-gray-900">Mkt Cap</button>
        <button className="text-sm text-blue-600">TradingView</button>
      </div>
      <TimeframeSelector 
        timeframes={timeframes}
        activeTimeframe={timeframe}
        onTimeframeChange={onTimeframeChange}
      />
    </div>
  );
};

const PriceChart = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis 
          dataKey="time" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          domain={['dataMin - 1000', 'dataMax + 1000']}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#EF4444" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const MarketRow = ({ market }) => (
  <tr className="border-t border-gray-100 hover:bg-gray-50">
    <td className="px-4 py-3">
      <div className="font-medium">{market.exchange}</div>
    </td>
    <td className="px-4 py-3 text-gray-600">{market.pair}</td>
    <td className="px-4 py-3 font-medium">{market.price}</td>
    <td className="px-4 py-3 text-green-600">{market.depth2}</td>
    <td className="px-4 py-3 text-red-600">{market.depthMinus2}</td>
    <td className="px-4 py-3">{market.volume}</td>
    <td className="px-4 py-3 text-gray-600">{market.volumePercent}</td>
    <td className="px-4 py-3">
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
        {market.confidence}
      </span>
    </td>
  </tr>
);

const MarketsTable = ({ markets }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
          <th className="px-4 py-3 font-medium">#</th>
          <th className="px-4 py-3 font-medium">Exchange</th>
          <th className="px-4 py-3 font-medium">Pair</th>
          <th className="px-4 py-3 font-medium">Price</th>
          <th className="px-4 py-3 font-medium">+2% Depth</th>
          <th className="px-4 py-3 font-medium">-2% Depth</th>
          <th className="px-4 py-3 font-medium">Volume (24h)</th>
          <th className="px-4 py-3 font-medium">Volume %</th>
          <th className="px-4 py-3 font-medium">Confidence</th>
        </tr>
      </thead>
      <tbody>
        {markets.map((market, idx) => (
          <MarketRow key={idx} market={market} />
        ))}
      </tbody>
    </table>
  </div>
);

const SentimentBar = ({ bullish, bearish }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">Community sentiment</span>
      <span className="text-gray-500">5.4M votes</span>
    </div>
    <div className="flex h-2 rounded-full overflow-hidden">
      <div className="bg-green-500" style={{ width: `${bullish}%` }} />
      <div className="bg-red-500" style={{ width: `${bearish}%` }} />
    </div>
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-green-500 font-semibold">{bullish}%</span>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex items-center space-x-2">
        <TrendingDown className="w-4 h-4 text-red-500" />
        <span className="text-red-500 font-semibold">{bearish}%</span>
      </div>
    </div>
  </div>
);

const VoteButtons = () => (
  <div className="grid grid-cols-2 gap-3 mt-4">
    <button className="flex items-center justify-center space-x-2 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50">
      <TrendingUp className="w-4 h-4" />
      <span className="font-medium">Bullish</span>
    </button>
    <button className="flex items-center justify-center space-x-2 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">
      <TrendingDown className="w-4 h-4" />
      <span className="font-medium">Bearish</span>
    </button>
  </div>
);

const CommunitySentiment = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <SentimentBar bullish={82} bearish={18} />
    <VoteButtons />
  </div>
);

const NewsCard = ({ author, time, title, preview }) => (
  <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{author[0]}</span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-medium text-sm">{author}</span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <h3 className="font-medium text-sm mb-1">{title}</h3>
      <p className="text-gray-600 text-xs line-clamp-2">{preview}</p>
    </div>
  </div>
);

const CommunityFeed = () => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex space-x-4">
        <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">Top</button>
        <button className="text-sm text-gray-600 hover:text-gray-900 pb-2">Latest</button>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      <NewsCard 
        author="Crypto.Andy"
        time="15 hours"
        title="Tuesday Check-In - 💰 $BTC Calm Before the Next Move"
        preview="The week rolls on with fresh updates from Washington, Asia, and the crypto space..."
      />
      <NewsCard 
        author="BitcoinMag"
        time="18 hours"
        title="Bitcoin Holds Strong Above $103K"
        preview="Despite market volatility, Bitcoin continues to maintain its position..."
      />
    </div>
  </div>
);

// Main App Component
export default function CMCLayoutV3() {
  const [activeTab, setActiveTab] = useState('Chart');
  const [timeframe, setTimeframe] = useState('24h');

  const tabs = ['Chart', 'Markets', 'News', 'Yield', 'Market Cycles', 'About'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coin Info Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <CoinHeader />
              <PriceDisplay />
              <StatsGrid />
            </div>

            {/* Tabs and Chart */}
            <div className="bg-white rounded-lg shadow-sm">
              <TabList tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              
              {activeTab === 'Chart' && (
                <div className="p-6">
                  <ChartControls timeframe={timeframe} onTimeframeChange={setTimeframe} />
                  <PriceChart data={chartData} />
                </div>
              )}

              {activeTab === 'Markets' && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Bitcoin Markets</h2>
                  <MarketsTable markets={marketsData} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <CommunitySentiment />
            <CommunityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}