import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Building2, MapPin, Award, Newspaper } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function GoldMarketDashboard() {
  const [priceData, setPriceData] = useState([]);
  const [stats, setStats] = useState(null);
  const [news, setNews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const res = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/chart-data', requestOptions as RequestInit);
      
      const chartData = await res.json();
      setPriceData(chartData);

      // Set mock stats (replace with real API calls)
      setStats({
        avgPrice: chartData.length > 0 ? parseFloat(chartData[chartData.length - 1].vn_sell_price) : 0,
        priceChange: 2.5,
        totalCompanies: 15,
        activeRegions: 8,
        newsCount: 24,
        marketVolatility: 'Low'
      });

      // Mock news data (replace with real API)
      setNews([
        { id: 1, title: 'Gold prices surge amid global uncertainty', votes: 45, time: '2h ago' },
        { id: 2, title: 'Central banks increase gold reserves', votes: 32, time: '5h ago' },
        { id: 3, title: 'Vietnam gold market sees strong demand', votes: 28, time: '8h ago' }
      ]);

      // Mock companies data
      setCompanies([
        { name: 'SJC', price: 147000000, change: 2.3 },
        { name: 'PNJ', price: 146500000, change: 1.8 },
        { name: 'DOJI', price: 146800000, change: 2.1 }
      ]);

    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const chartData = priceData.map(item => ({
    date: formatDate(item.date),
    vnSell: parseFloat(item.vn_sell_price) / 1000000,
    vnBuy: parseFloat(item.vn_buy_price) / 1000000,
    world: parseFloat(item.usd_sell_in_vnd) / 1000000,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
       
        <button 
          onClick={fetchAllData}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Price Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-yellow-200 rounded-lg">
              <Award className="w-5 h-5 text-yellow-700" />
            </div>
            <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full">LIVE</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Current Gold Price</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatPrice(stats?.avgPrice || 0)}
          </p>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+{stats?.priceChange}% today</span>
          </div>
        </div>

        {/* Companies Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Companies</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats?.totalCompanies}</p>
          <p className="text-xs text-gray-500">Trading nationwide</p>
        </div>

        {/* Regions Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-200 rounded-lg">
              <MapPin className="w-5 h-5 text-green-700" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Coverage Regions</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats?.activeRegions}</p>
          <p className="text-xs text-gray-500">Across Vietnam</p>
        </div>

        {/* News Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-200 rounded-lg">
              <Newspaper className="w-5 h-5 text-purple-700" />
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-1 rounded-full">NEW</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Market News</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats?.newsCount}</p>
          <p className="text-xs text-gray-500">Today's updates</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Price Trends</h3>
            <p className="text-sm text-gray-500">Historical gold prices (Million VND)</p>
          </div>
          <div className="flex gap-2">
            {['24H', '7D', '1M', '3M', '1Y'].map((period) => (
              <button
                key={period}
                className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-colors"
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value) => [`${formatPrice(value)}M`, '']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="vnSell" 
              stroke="#eab308" 
              strokeWidth={3}
              name="VN Sell Price"
              dot={{ fill: '#eab308', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="vnBuy" 
              stroke="#f97316" 
              strokeWidth={2}
              name="VN Buy Price"
              dot={{ fill: '#f97316', r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="world" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="World Price"
              dot={{ fill: '#3b82f6', r: 3 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Companies</h3>
          <div className="space-y-3">
            {companies.map((company, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{company.name}</p>
                    <p className="text-xs text-gray-500">Nationwide</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatPrice(company.price)}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{company.change}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending News */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Trending News</h3>
          <div className="space-y-3">
            {news.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <p className="font-medium text-gray-900 text-sm mb-2">{item.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    {item.votes} votes
                  </span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            View All News →
          </button>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Market Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Market Volatility</p>
            <p className="text-2xl font-bold text-green-600">{stats?.marketVolatility}</p>
            <p className="text-xs text-gray-500 mt-1">Stable conditions</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Trading Volume</p>
            <p className="text-2xl font-bold text-blue-600">High</p>
            <p className="text-xs text-gray-500 mt-1">Above average</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Market Sentiment</p>
            <p className="text-2xl font-bold text-yellow-600">Bullish</p>
            <p className="text-xs text-gray-500 mt-1">Positive outlook</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-400">
        <p>Data updated every 5 minutes • Last update: {priceData.length > 0 ? formatDate(priceData[priceData.length - 1].date) : 'N/A'}</p>
      </div>
    </div>
  );
}

/* 
======================
SQL QUERIES FOR APIs
======================

-- 1. Get latest gold prices with company and region info
SELECT 
    gp.id,
    gp.recorded_at as date,
    gp.buy_price as vn_buy_price,
    gp.sell_price as vn_sell_price,
    c.name as company_name,
    r.name as region_name,
    gt.name as gold_type,
    gp.currency
FROM gold_market.gold_prices gp
JOIN gold_market.company_regions cr ON gp.company_region_id = cr.id
JOIN gold_market.companies c ON cr.company_id = c.id
JOIN gold_market.regions r ON cr.region_id = r.id
JOIN gold_market.gold_types gt ON gp.gold_type_id = gt.id
WHERE gp.recorded_at >= NOW() - INTERVAL '24 hours'
ORDER BY gp.recorded_at DESC
LIMIT 100;

-- 2. Get top companies by average price
SELECT 
    c.id,
    c.name,
    c.logo_url,
    AVG(gp.sell_price) as avg_sell_price,
    COUNT(DISTINCT cr.region_id) as region_count,
    MAX(gp.recorded_at) as last_update
FROM gold_market.companies c
JOIN gold_market.company_regions cr ON c.id = cr.company_id
JOIN gold_market.gold_prices gp ON cr.id = gp.company_region_id
WHERE gp.recorded_at >= NOW() - INTERVAL '1 day'
GROUP BY c.id, c.name, c.logo_url
ORDER BY avg_sell_price DESC
LIMIT 10;

-- 3. Get market statistics
SELECT 
    COUNT(DISTINCT c.id) as total_companies,
    COUNT(DISTINCT r.id) as total_regions,
    AVG(gp.sell_price) as avg_price,
    MAX(gp.sell_price) as max_price,
    MIN(gp.sell_price) as min_price,
    STDDEV(gp.sell_price) as price_volatility
FROM gold_market.companies c
CROSS JOIN gold_market.regions r
LEFT JOIN gold_market.company_regions cr ON c.id = cr.company_id AND r.id = cr.region_id
LEFT JOIN gold_market.gold_prices gp ON cr.id = gp.company_region_id
WHERE gp.recorded_at >= NOW() - INTERVAL '1 day';

-- 4. Get trending news with votes
SELECT 
    n.id,
    n.title,
    n.content,
    n.source,
    n.category,
    n.published_at,
    n.upvotes_count,
    n.downvotes_count,
    n.vote_score,
    COUNT(c.id) as comment_count
FROM gold_market.news n
LEFT JOIN gold_market.comments c ON n.id = c.news_id
WHERE n.published_at >= NOW() - INTERVAL '7 days'
GROUP BY n.id
ORDER BY n.vote_score DESC, n.published_at DESC
LIMIT 20;

-- 5. Get price performance by company
SELECT 
    c.name as company_name,
    r.name as region_name,
    gt.name as gold_type,
    gperf.performance_date,
    gperf.current_sell_price,
    gperf.change_1d,
    gperf.change_1d_percentage,
    gperf.change_7d_percentage,
    gperf.change_30d_percentage,
    gperf.highest_price_30d,
    gperf.lowest_price_30d,
    gperf.average_price_30d
FROM gold_market.gold_performance gperf
JOIN gold_market.companies c ON gperf.company_id = c.id
JOIN gold_market.regions r ON gperf.region_id = r.id
JOIN gold_market.gold_types gt ON gperf.gold_type_id = gt.id
WHERE gperf.performance_date = CURRENT_DATE
ORDER BY gperf.current_sell_price DESC;

-- 6. Get regional price comparison
SELECT 
    r.name as region_name,
    r.code as region_code,
    AVG(gp.sell_price) as avg_sell_price,
    AVG(gp.buy_price) as avg_buy_price,
    COUNT(gp.id) as price_updates,
    MAX(gp.recorded_at) as last_update
FROM gold_market.regions r
JOIN gold_market.company_regions cr ON r.id = cr.region_id
JOIN gold_market.gold_prices gp ON cr.id = gp.company_region_id
WHERE gp.recorded_at >= NOW() - INTERVAL '1 day'
GROUP BY r.id, r.name, r.code
ORDER BY avg_sell_price DESC;

-- 7. Get exchange rates with gold prices
SELECT 
    eru.time_last_update_utc,
    eru.base_code,
    cr.target_currency,
    cr.rate,
    AVG(gp.sell_price) as avg_gold_price_vnd
FROM gold_market.exchange_rate_updates eru
JOIN gold_market.currency_rates cr ON eru.id = cr.update_id
CROSS JOIN gold_market.gold_prices gp
WHERE gp.recorded_at >= NOW() - INTERVAL '1 day'
    AND gp.currency = 'VND'
GROUP BY eru.id, eru.time_last_update_utc, eru.base_code, cr.target_currency, cr.rate
ORDER BY eru.time_last_update_utc DESC
LIMIT 10;

-- 8. Get user alerts summary
SELECT 
    u.username,
    COUNT(a.id) as total_alerts,
    SUM(CASE WHEN a.is_active THEN 1 ELSE 0 END) as active_alerts,
    a.alert_type
FROM gold_market.users u
JOIN gold_market.alerts a ON u.id = a.user_id
GROUP BY u.id, u.username, a.alert_type
ORDER BY total_alerts DESC;

*/