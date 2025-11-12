import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Star, Bell, Search, Menu, ChevronDown, RefreshCw } from 'lucide-react';

// Components
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">G</span>
    </div>
    <span className="font-bold text-xl">GoldMarket</span>
  </div>
);

const NavLink = ({ children }) => (
  <a href="#" className="text-gray-700 hover:text-gray-900 text-sm">{children}</a>
);

const Navigation = () => (
  <nav className="hidden md:flex space-x-6">
    <NavLink>Gold Prices</NavLink>
    <NavLink>Markets</NavLink>
    <NavLink>Analysis</NavLink>
    <NavLink>News</NavLink>
  </nav>
);

const IconButton = ({ children, onClick }: any) => (
  <button onClick={onClick} className="text-gray-600 hover:text-gray-900 p-2">
    {children}
  </button>
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

const Header = ({ onRefresh, isLoading }: any) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center space-x-4">
          <IconButton onClick={onRefresh}>
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </IconButton>
          <IconButton><Bell className="w-5 h-5" /></IconButton>
          <IconButton><Search className="w-5 h-5" /></IconButton>
          <Button variant="primary">Log in</Button>
        </div>
      </div>
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
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const calculateChange = (data) => {
  if (!data || data.length < 2) return { value: 0, isPositive: true };
  
  const latest = parseFloat(data[data.length - 1].vn_sell_price);
  const previous = parseFloat(data[0].vn_sell_price);
  const change = ((latest - previous) / previous) * 100;
  
  return {
    value: Math.abs(change).toFixed(2),
    isPositive: change >= 0
  };
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
      <div className="flex items-center space-x-2">
        <Button variant="primary">Buy Gold</Button>
        <Button variant="secondary">+ Follow</Button>
      </div>
    </div>
  );
};

const PriceDisplay = ({ latestData, chartData }) => {
  const sellPrice = latestData ? formatPrice(latestData.vn_sell_price) : 'Loading...';
  const change = calculateChange(chartData);
  const lastUpdate = latestData ? formatDate(latestData.date) : '';
  
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

const StatsGrid = ({ latestData }) => {
  if (!latestData) return null;
  
  const buyPrice = formatPrice(latestData.vn_buy_price);
  const sellPrice = formatPrice(latestData.vn_sell_price);
  const usdBuy = formatPrice(latestData.usd_buy_in_vnd);
  const usdSell = formatPrice(latestData.usd_sell_in_vnd);
  const spread = parseFloat(latestData.vn_sell_price) - parseFloat(latestData.vn_buy_price);
  
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

const ChartControls = ({ timeframe, onTimeframeChange, priceType, onPriceTypeChange }) => {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'All'];
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onPriceTypeChange('sell')}
          className={`text-sm ${priceType === 'sell' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Sell Price
        </button>
        <button 
          onClick={() => onPriceTypeChange('buy')}
          className={`text-sm ${priceType === 'buy' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Buy Price
        </button>
        <button 
          onClick={() => onPriceTypeChange('both')}
          className={`text-sm ${priceType === 'both' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Both
        </button>
      </div>
      <TimeframeSelector 
        timeframes={timeframes}
        activeTimeframe={timeframe}
        onTimeframeChange={onTimeframeChange}
      />
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
      <p className="text-xs text-gray-500 mb-2">{payload[0].payload.formattedDate}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between space-x-4">
          <span className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}:
          </span>
          <span className="text-xs font-bold">
            {formatPrice(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const PriceChart = ({ data, priceType }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        Loading chart data...
      </div>
    );
  }

  const chartData = data.map(item => ({
    ...item,
    vn_buy_price: parseFloat(item.vn_buy_price),
    vn_sell_price: parseFloat(item.vn_sell_price),
    formattedDate: new Intl.DateTimeFormat('vi-VN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(item.date))
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(priceType === 'sell' || priceType === 'both') && (
            <Line 
              type="monotone" 
              dataKey="vn_sell_price" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={false}
              name="Giá bán ra"
            />
          )}
          {(priceType === 'buy' || priceType === 'both') && (
            <Line 
              type="monotone" 
              dataKey="vn_buy_price" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
              name="Giá mua vào"
            />
          )}
          <Line 
              type="monotone" 
              dataKey="usd_sell_in_vnd" 
              stroke="#d87f1fff" 
              strokeWidth={2}
              dot={false}
              name="Thế Giới"
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const SentimentBar = ({ bullish, bearish }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">Market sentiment</span>
      <span className="text-gray-500">1.2K votes</span>
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
    <SentimentBar bullish={75} bearish={25} />
    <VoteButtons />
  </div>
);

const NewsCard = ({ author, time, title, preview }) => (
  <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
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

const NewsModal = ({ isOpen, onClose, article }) => {
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

const CommunityFeed = ({ newsData, isLoading, onArticleClick }) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex space-x-4">
        <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">Latest News</button>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
          Loading news...
        </div>
      ) : newsData.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No news available
        </div>
      ) : (
        newsData.slice(0, 10).map((article, index) => (
          <div key={index} onClick={() => onArticleClick(article)}>
            <NewsCard 
              author={article.source || 'News Source'}
              time={formatDate(article.published_date)}
              title={article.title}
              preview={article.description || article.content?.substring(0, 150) + '...'}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

// Main App Component
export default function GoldMarketApp() {
  const [activeTab, setActiveTab] = useState('Chart');
  const [timeframe, setTimeframe] = useState('1D');
  const [priceType, setPriceType] = useState('both');
  const [chartData, setChartData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['Chart', 'Markets', 'News', 'Analysis'];

  const fetchChartData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const response = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/chart-data', requestOptions as RequestInit);
      
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setChartData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching chart data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewsData = async () => {
    setIsLoadingNews(true);
    try {
      //const response = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/news');

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
      setNewsData(data);
    } catch (err) {
      console.error('Error fetching news data:', err);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    fetchChartData();
    fetchNewsData();
    
    // Auto refresh every 5 minutes
    const chartInterval = setInterval(fetchChartData, 5 * 60 * 1000);
    const newsInterval = setInterval(fetchNewsData, 10 * 60 * 1000); // Refresh news every 10 minutes
    
    return () => {
      clearInterval(chartInterval);
      clearInterval(newsInterval);
    };
  }, []);

  const latestData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onRefresh={fetchChartData} isLoading={isLoading} />
      
      <NewsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        article={selectedArticle}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            Error loading data: {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coin Info Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <CoinHeader latestData={latestData} />
              <PriceDisplay latestData={latestData} chartData={chartData} />
              <StatsGrid latestData={latestData} />
            </div>

            {/* Tabs and Chart */}
            <div className="bg-white rounded-lg shadow-sm">
              <TabList tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              
              {activeTab === 'Chart' && (
                <div className="p-6">
                  <ChartControls 
                    timeframe={timeframe} 
                    onTimeframeChange={setTimeframe}
                    priceType={priceType}
                    onPriceTypeChange={setPriceType}
                  />
                  <PriceChart data={chartData} priceType={priceType} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <CommunitySentiment />
            <CommunityFeed 
              newsData={newsData}
              isLoading={isLoadingNews}
              onArticleClick={handleArticleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}