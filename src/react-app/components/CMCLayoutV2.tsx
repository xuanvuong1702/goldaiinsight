import React, { useState, useMemo } from 'react';
import { Search, Star, ChevronDown, Filter, Menu, TrendingUp, TrendingDown } from 'lucide-react';

// Mock data
const cryptoData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 103182.80, change1h: -0.03, change24h: -3.33, change7d: 1.37, marketCap: 2058248860834, volume: 64354123774, supply: '19.94M BTC' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3431.98, change1h: -0.49, change24h: -5.28, change7d: 3.14, marketCap: 414228823499, volume: 36467181629, supply: '120.69M ETH' },
  { id: 3, name: 'Tether', symbol: 'USDT', price: 0.9996, change1h: 0.00, change24h: -0.01, change7d: -0.06, marketCap: 183428915226, volume: 131619670173, supply: '183.49B USDT' },
  { id: 4, name: 'XRP', symbol: 'XRP', price: 2.39, change1h: -0.31, change24h: -5.55, change7d: 7.66, marketCap: 144028253147, volume: 4300042587, supply: '60.1B XRP' },
  { id: 5, name: 'BNB', symbol: 'BNB', price: 961.55, change1h: -0.23, change24h: -4.27, change7d: 1.94, marketCap: 132442366117, volume: 2592756016, supply: '137.73M BNB' },
  { id: 6, name: 'Solana', symbol: 'SOL', price: 154.18, change1h: -0.72, change24h: -9.71, change7d: -1.10, marketCap: 85407116983, volume: 5954110762, supply: '553.9M SOL' },
  { id: 7, name: 'USDC', symbol: 'USDC', price: 0.9999, change1h: 0.03, change24h: -0.00, change7d: -0.02, marketCap: 75964737741, volume: 14827130440, supply: '75.96B USDC' },
  { id: 8, name: 'TRON', symbol: 'TRX', price: 0.2988, change1h: -0.02, change24h: 0.28, change7d: 4.63, marketCap: 28287092996, volume: 766916189, supply: '94.66B TRX' },
  { id: 9, name: 'Dogecoin', symbol: 'DOGE', price: 0.1718, change1h: -0.50, change24h: -6.17, change7d: 4.72, marketCap: 26074618927, volume: 1860801208, supply: '151.73B DOGE' },
  { id: 10, name: 'Cardano', symbol: 'ADA', price: 0.5584, change1h: -0.29, change24h: -7.11, change7d: 5.66, marketCap: 20030773888, volume: 792574838, supply: '35.87B ADA' },
];

// Header Component
const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CMC</span>
              </div>
              <span className="font-bold text-lg">CoinMarketCap</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-blue-600">Cryptocurrencies</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Dashboards</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">DexScan</a>
              
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search" className="bg-transparent border-none outline-none ml-2 w-full text-sm" />
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
              <Star size={18} />
              <span>Watchlist</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Log In
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Tab Bar Component
const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { name: 'Top', id: 'top' },
    { name: 'Trending', id: 'trending' },
    { name: 'Most Visited', id: 'most-visited' },
    { name: 'New', id: 'new' },
    { name: 'Gainers', id: 'gainers' },
    { name: 'Real-World Assets', id: 'rwa' },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
          <button className="flex items-center gap-1 py-4 px-2 text-sm text-gray-600 hover:text-gray-900">
            More
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Trending Card Component
const TrendingCard = ({ title, value, subtitle, change }: any) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <ChevronDown size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {change !== undefined && (
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change)}%
          </span>
        )}
      </div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
};

// Fear & Greed Gauge Component
const FearGreedGauge = () => {
  const value = 26;
  const percentage = (value / 100) * 180;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Fear & Greed</span>
        <ChevronDown size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle cx="48" cy="48" r="40" stroke="#fee2e2" strokeWidth="8" fill="none" />
            <circle 
              cx="48" 
              cy="48" 
              r="40" 
              stroke="#f87171" 
              strokeWidth="8" 
              fill="none"
              strokeDasharray={`${percentage} 360`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{value}</span>
          </div>
        </div>
        <span className="text-lg font-medium">Fear</span>
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-blue-100 text-blue-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

// Table Header Cell Component
const TableHeaderCell = ({ children, sortable, sortKey, currentSort, onSort }: any) => {
  const isActive = currentSort?.key === sortKey;
  
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      {sortable ? (
        <button
          onClick={() => onSort(sortKey)}
          className="flex items-center gap-1 hover:text-gray-900 transition-colors"
        >
          {children}
          {isActive && (
            <span className="text-blue-600">
              {currentSort.direction === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </span>
          )}
        </button>
      ) : (
        children
      )}
    </th>
  );
};

// Coin Logo Component
const CoinLogo = ({ symbol }) => {
  const colors = {
    BTC: 'from-orange-400 to-yellow-400',
    ETH: 'from-blue-400 to-purple-400',
    USDT: 'from-green-400 to-teal-400',
    XRP: 'from-blue-500 to-blue-600',
    BNB: 'from-yellow-400 to-orange-400',
    SOL: 'from-purple-400 to-pink-400',
    USDC: 'from-blue-400 to-blue-500',
    TRX: 'from-red-400 to-pink-400',
    DOGE: 'from-yellow-300 to-yellow-400',
    ADA: 'from-blue-400 to-indigo-400',
  };
  
  return (
    <div className={`w-8 h-8 bg-gradient-to-br ${colors[symbol] || 'from-gray-400 to-gray-500'} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
      {symbol.substring(0, 1)}
    </div>
  );
};

// Mini Chart Component
const MiniChart = ({ data, isPositive }) => {
  const points = [0, 32, 64, 96, 128];
  const values = isPositive ? [12, 8, 10, 6, 4] : [4, 6, 8, 10, 12];
  const pathData = points.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x},${values[i]}`).join(' ');
  
  return (
    <div className="w-32 h-12">
      <svg className="w-full h-full" viewBox="0 0 128 16">
        <path
          d={pathData}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Table Row Component
const CoinRow = ({ coin, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
        >
          <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </td>
      <td className="px-4 py-4 font-medium text-gray-700">{index + 1}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <CoinLogo symbol={coin.symbol} />
          <div>
            <div className="font-semibold text-gray-900">{coin.name}</div>
            <div className="text-sm text-gray-500">{coin.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100 transition-colors">
          Buy
        </button>
      </td>
      <td className="px-4 py-4 font-semibold text-gray-900">
        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className={`px-4 py-4 font-medium ${coin.change1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {coin.change1h >= 0 ? '▲' : '▼'} {Math.abs(coin.change1h)}%
      </td>
      <td className={`px-4 py-4 font-medium ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h)}%
      </td>
      <td className={`px-4 py-4 font-medium ${coin.change7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {coin.change7d >= 0 ? '▲' : '▼'} {Math.abs(coin.change7d)}%
      </td>
      <td className="px-4 py-4 font-medium text-gray-900">
        ${(coin.marketCap / 1e9).toFixed(2)}B
      </td>
      <td className="px-4 py-4">
        <div className="font-medium text-gray-900">
          ${(coin.volume / 1e9).toFixed(2)}B
        </div>
        <div className="text-xs text-gray-500">{(coin.volume / 1e9).toFixed(2)}B</div>
      </td>
      <td className="px-4 py-4 text-gray-700">{coin.supply}</td>
      <td className="px-4 py-4">
        <MiniChart data={coin} isPositive={coin.change7d >= 0} />
      </td>
    </tr>
  );
};

// Main Coin Table Component
const CoinTable = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('All Networks');
  const [sort, setSort] = useState({ key: 'marketCap', direction: 'desc' });
  const [showFilters, setShowFilters] = useState(false);

  const networks = ['All Networks', 'BSC', 'Solana', 'Base', 'Ethereum'];

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedData = useMemo(() => {
    const sorted = [...cryptoData].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  }, [sort]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Table Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {networks.map((network) => (
              <FilterButton
                key={network}
                label={network}
                active={selectedNetwork === network}
                onClick={() => setSelectedNetwork(network)}
              />
            ))}
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              More
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={16} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              Columns
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Filter options would appear here</p>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 w-10"></th>
              <TableHeaderCell sortable sortKey="id" currentSort={sort} onSort={handleSort}>
                #
              </TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <th className="px-4 py-3"></th>
              <TableHeaderCell sortable sortKey="price" currentSort={sort} onSort={handleSort}>
                Price
              </TableHeaderCell>
              <TableHeaderCell sortable sortKey="change1h" currentSort={sort} onSort={handleSort}>
                1h %
              </TableHeaderCell>
              <TableHeaderCell sortable sortKey="change24h" currentSort={sort} onSort={handleSort}>
                24h %
              </TableHeaderCell>
              <TableHeaderCell sortable sortKey="change7d" currentSort={sort} onSort={handleSort}>
                7d %
              </TableHeaderCell>
              <TableHeaderCell sortable sortKey="marketCap" currentSort={sort} onSort={handleSort}>
                Market Cap
              </TableHeaderCell>
              <TableHeaderCell sortable sortKey="volume" currentSort={sort} onSort={handleSort}>
                Volume(24h)
              </TableHeaderCell>
              <TableHeaderCell>Circulating Supply</TableHeaderCell>
              <TableHeaderCell>Last 7 Days</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((coin, index) => (
              <CoinRow key={coin.id} coin={coin} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Showing 1-10 of 10 cryptocurrencies
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="space-y-6">
      {/* Trending Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TrendingCard
          title="Market Cap"
          value="$3.46T"
          change={-3.86}
        />
        <TrendingCard
          title="CMC20"
          value="$217.74"
          change={-4.01}
        />
        <FearGreedGauge />
        <TrendingCard
          title="Average Crypto RSI"
          value="46.67"
          subtitle="Oversold"
        />
      </div>

      {/* Coin Table */}
      <CoinTable />
    </div>
  );
};

// Placeholder Page Component
const PlaceholderPage = ({ title }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-6">This page is under construction</p>
      <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
        <span className="text-4xl">🚧</span>
      </div>
    </div>
  </div>
);

// Main App Component
const CMCLayoutV2 = () => {
  const [activeTab, setActiveTab] = useState('top');

  const renderContent = () => {
    switch (activeTab) {
      case 'top':
        return <HomePage />;
      case 'trending':
        return <PlaceholderPage title="Trending Cryptocurrencies" />;
      case 'most-visited':
        return <PlaceholderPage title="Most Visited" />;
      case 'new':
        return <PlaceholderPage title="New Cryptocurrencies" />;
      case 'gainers':
        return <PlaceholderPage title="Top Gainers" />;
      case 'rwa':
        return <PlaceholderPage title="Real-World Assets" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default CMCLayoutV2;