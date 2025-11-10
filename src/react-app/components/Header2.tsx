import React, { useState } from 'react';
import { Search, Info, Menu, ChevronRight } from 'lucide-react';

// Main Header Component
function MainHeader() {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Logo />
            <Navigation />
          </div>

          {/* Right Section */}
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <div className="text-white font-bold text-sm">C</div>
      </div>
      <span className="font-bold text-lg">GoldMarket</span>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const navLinks = [
    'Cryptocurrencies',
    'Dashboards'
  ];

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navLinks.map((link) => (
        <a
          key={link}
          href="#"
          className="text-gray-700 hover:text-gray-900 font-medium text-sm"
        >
          {link}
        </a>
      ))}
    </nav>
  );
}

// Header Actions Component
function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      

      <button className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900">
        <span className="text-sm">⭐</span>
        <span className="text-sm font-medium">Watchlist</span>
      </button>

      <SearchBar />

      <button className="p-2 text-gray-600 hover:text-gray-900 bg-blue-100 rounded-lg">
        <Info className="w-5 h-5" />
      </button>

      <button className="hidden md:flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700">
        <span className="text-sm">🤖</span>
        <span className="text-sm font-semibold">CMC AI</span>
      </button>

      <button className="p-2 text-gray-600 hover:text-gray-900">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="12" y="2" width="6" height="6" rx="1" />
          <rect x="2" y="12" width="6" height="6" rx="1" />
          <rect x="12" y="12" width="6" height="6" rx="1" />
        </svg>
      </button>

      <button className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm">
        Log In
      </button>

      <button className="lg:hidden p-2">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}

// Search Bar Component
function SearchBar() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
      />
    </div>
  );
}

// Tabs Component
function TabsSection() {
  const [activeTab, setActiveTab] = useState('Top');
  
  const tabs = [
    'Top',
    'Trending',
    'Four.Meme - X Mode',
    'Most Visited',
    'New',
    'Gainers',
    'Real-World Assets',
    'More'
  ];

  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 text-sm font-medium whitespace-nowrap relative ${
                activeTab === tab
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Highlight Cards Component
function HighlightCards() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MarketCapCard />
          <CMC20Card />
          <FearGreedCard />
          <AltcoinSeasonCard />
        </div>
      </div>
    </div>
  );
}

// Market Cap Card Component
function MarketCapCard() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
        Market Cap
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9V9h2v4zm0-6H9V5h2v2z" />
        </svg>
      </div>
      <div className="text-lg font-bold">$3.57T</div>
      <div className="text-xs text-green-600 font-medium">↑ 4.73%</div>
      <div className="mt-2">
        <svg className="w-full h-8" viewBox="0 0 100 30">
          <polyline
            points="0,25 20,20 40,18 60,15 80,12 100,8"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

// CMC20 Card Component
function CMC20Card() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-xs text-gray-500 mb-1">CMC20</div>
      <div className="text-lg font-bold">$225.62</div>
      <div className="text-xs text-green-600 font-medium">↑ 4.78%</div>
      <div className="mt-2">
        <svg className="w-full h-8" viewBox="0 0 100 30">
          <polyline
            points="0,20 20,18 40,22 60,15 80,12 100,10"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

// Fear & Greed Card Component
function FearGreedCard() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-xs text-gray-500 mb-1">Fear & Greed</div>
      <div className="flex items-center gap-3 mt-2">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#22c55e"
              strokeWidth="6"
              strokeDasharray="176"
              strokeDashoffset="88"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">29</span>
          </div>
        </div>
        <div className="text-xs text-gray-600">Fear</div>
      </div>
    </div>
  );
}

// Altcoin Season Card Component
function AltcoinSeasonCard() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-xs text-gray-500 mb-1">Altcoin Season</div>
      <div className="text-lg font-bold">32/100</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-gray-600">Bitcoin</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-blue-600 rounded-full relative">
          <div 
            className="absolute w-3 h-3 bg-black rounded-full top-1/2 transform -translate-y-1/2" 
            style={{ left: '32%' }} 
          />
        </div>
        <span className="text-xs text-gray-600">Altcoin</span>
      </div>
    </div>
  );
}

// AI Questions Component
function AIQuestions() {
  const questions = [
    { icon: '📈', text: 'Why is the market up today?' },
    { icon: '🔥', text: 'Are altcoins outperforming Bitcoin?' },
    { icon: '💭', text: 'What are the trending narratives?' },
    { icon: '🚀', text: 'What cryptos are showing bullish momentum?' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center gap-4 overflow-x-auto">
          {questions.map((q, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full whitespace-nowrap text-sm text-gray-700 border border-gray-200"
            >
              <span>{q.icon}</span>
              <span>{q.text}</span>
            </button>
          ))}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Export Component
export default function CoinMarketCapHeader() {
  return (
    <div className="w-full bg-white">
      <MainHeader />
      <TabsSection />
      <HighlightCards />
      <AIQuestions />
    </div>
  );
}