import  { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GoldPriceChartV2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  useEffect(() => {
    fetchGoldData();
  }, []);

  const fetchGoldData = async () => {
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
  
      const res = await fetch('https://gold-ai-insight.app.n8n.cloud/webhook/chart-data', requestOptions as RequestInit);
      
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch gold price data');
      console.error(err);
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

  const calculateChange = (data, key) => {
    if (data.length < 2) return { value: 0, percentage: 0 };
    const latest = parseFloat(data[data.length - 1][key]);
    const previous = parseFloat(data[data.length - 2][key]);
    const change = latest - previous;
    const percentage = ((change / previous) * 100).toFixed(2);
    return { value: change, percentage };
  };

  const chartData = data.map(item => ({
    date: formatDate(item.date),
    vnBuy: parseFloat(item.vn_buy_price) / 1000000,
    vnSell: parseFloat(item.vn_sell_price) / 1000000,
    worldSell: parseFloat(item.usd_sell_in_vnd) / 1000000,
    worldBuy: parseFloat(item.usd_buy_in_vnd) / 1000000,
  }));

  const latestData = data.length > 0 ? data[data.length - 1] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchGoldData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const vnBuyChange = calculateChange(data, 'vn_buy_price');
  const vnSellChange = calculateChange(data, 'vn_sell_price');
  const worldChange = calculateChange(data, 'usd_sell_in_vnd');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gold Prices</h2>
          <p className="text-sm text-gray-500">Vietnam & World Market</p>
        </div>
        <button 
          onClick={fetchGoldData}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vietnam Buy Price */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Vietnam Buy</h3>
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">VND</span>
          </div>
          {latestData && (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(latestData.vn_buy_price)}
              </p>
              <div className={`flex items-center gap-1 text-sm ${
                vnBuyChange.value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {vnBuyChange.value >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{formatPrice(Math.abs(vnBuyChange.value))} ({vnBuyChange.percentage}%)</span>
              </div>
            </>
          )}
        </div>

        {/* Vietnam Sell Price */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Vietnam Sell</h3>
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">VND</span>
          </div>
          {latestData && (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(latestData.vn_sell_price)}
              </p>
              <div className={`flex items-center gap-1 text-sm ${
                vnSellChange.value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {vnSellChange.value >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{formatPrice(Math.abs(vnSellChange.value))} ({vnSellChange.percentage}%)</span>
              </div>
            </>
          )}
        </div>

        {/* World Price */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">World Price</h3>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">USD</span>
          </div>
          {latestData && (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(latestData.usd_sell_in_vnd)}
              </p>
              <div className={`flex items-center gap-1 text-sm ${
                worldChange.value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {worldChange.value >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{formatPrice(Math.abs(worldChange.value))} ({worldChange.percentage}%)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-2">
        {['1h', '6h', '24h', '7d', '30d'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Price Trends (Million VND)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value) => [`${formatPrice(value)}M VND`, '']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="vnBuy" 
              stroke="#eab308" 
              strokeWidth={2}
              name="VN Buy"
              dot={{ fill: '#eab308', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="vnSell" 
              stroke="#f97316" 
              strokeWidth={2}
              name="VN Sell"
              dot={{ fill: '#f97316', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="worldSell" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="World"
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Price Difference Analysis */}
      {latestData && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Price Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">VN Spread (Sell - Buy)</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(parseFloat(latestData.vn_sell_price) - parseFloat(latestData.vn_buy_price))} VND
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">VN vs World Premium</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(parseFloat(latestData.vn_sell_price) - parseFloat(latestData.usd_sell_in_vnd))} VND
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ({(((parseFloat(latestData.vn_sell_price) - parseFloat(latestData.usd_sell_in_vnd)) / parseFloat(latestData.usd_sell_in_vnd)) * 100).toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {latestData && (
        <p className="text-xs text-gray-400 text-center">
          Last updated: {formatDate(latestData.date)}
        </p>
      )}
    </div>
  );
}