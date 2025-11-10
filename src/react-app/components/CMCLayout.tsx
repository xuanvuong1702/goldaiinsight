import React, { useState } from 'react';
import { Search, Info, Menu, ChevronRight, X, Send } from 'lucide-react';
import GoldPriceChartV2 from './GoldPriceChartV2';
import GoldMarketDashboard from './GoldDashboard';

// Main Header Component
function MainHeader({ onLoginClick, onAIChatOpen }) {
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
          <HeaderActions onLoginClick={onLoginClick} onAIChatOpen={onAIChatOpen} />
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
    'Tin tức',
    'Dashboards',
    'DexScan'
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
function HeaderActions({ onLoginClick, onAIChatOpen }) {
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

      <button 
        onClick={onAIChatOpen}
        className="hidden md:flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700"
      >
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

      <button 
        onClick={onLoginClick}
        className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-sm"
      >
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

// Login Modal Component
function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="text-white font-bold text-2xl">C</div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Log in to your CoinMarketCap account</p>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            <span className="text-blue-600 text-xl">f</span>
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Email Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}

// AI Chat Sidebar Component
function AIChatSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m CMC AI. Ask me anything about crypto markets, prices, or trends!' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Based on current market data, Bitcoin is showing strong momentum with a 4.40% increase in the last 24 hours. The overall market sentiment is bullish with a Fear & Greed index of 29.' 
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h3 className="font-bold text-lg">CMC AI</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Suggested Questions */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Popular questions:</p>
          <div className="space-y-2">
            {['Why is the market up today?', 'Best performing altcoins?', 'Bitcoin price prediction?'].map((q, i) => (
              <button
                key={i}
                onClick={() => setInputValue(q)}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Tabs Component
function TabsSection() {
  const [activeTab, setActiveTab] = useState('Top');
  
  const tabs = [
    'Top',
    'USA',
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
                <div className="absolute bottom-0 right-0 right-0 h-0.5 bg-blue-600" />
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
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
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="text-xs text-gray-500 mb-1">Altcoin Season</div>
      <div className="text-lg font-bold">32/100</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-gray-600">Bitcoin</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-blue-600 rounded-full relative">
          <div 
            className="absolute w-3 h-3 bg-gray rounded-full top-1/2 transform -translate-y-1/2" 
            style={{ left: '32%' }} 
          />
        </div>
        <span className="text-xs text-gray-600">Altcoin</span>
      </div>
    </div>
  );
}

// AI Questions Component
function AIQuestions({ onQuestionClick }) {
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
              onClick={onQuestionClick}
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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="w-full bg-white">
      <MainHeader 
        onLoginClick={() => setIsLoginOpen(true)}
        onAIChatOpen={() => setIsAIChatOpen(true)}
      />
      <TabsSection />
      <HighlightCards />
      <AIQuestions onQuestionClick={() => setIsAIChatOpen(true)} />
      
      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <AIChatSidebar isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}

// Layout Component để wrap content với sidebar
export function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CoinMarketCapHeader />
      
      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <main className="flex-1">
            {children}

            <GoldMarketDashboard></GoldMarketDashboard>
          </main>
          
          {/* Right Sidebar */}
          <aside className="hidden xl:block w-80">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

// Right Sidebar Component
// Right Sidebar Component
function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* CMC AI Widget */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🤖</span>
          <h3 className="font-bold text-sm">CMC AI</h3>
          <span className="ml-auto text-xs text-gray-400">ⓘ</span>
        </div>
        <p className="text-xs text-gray-600 mb-3">
          Why is the market up today?
        </p>
        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
          Researched for 17s ▼
        </button>
      </div>

      {/* TLDR Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600">⚡</span>
          <h3 className="font-bold text-sm">TLDR</h3>
        </div>
        <div className="space-y-3 text-xs text-gray-700">
          <p>The crypto market rose 4.21% over the last 24h, rebounding from a 13.74% 30-day decline.</p>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-blue-600 font-bold">1</span>
              <div>
                <p className="font-semibold">Derivatives reset</p>
                <p className="text-gray-600">Perpetuals open interest rose 1.06%</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-bold">2</span>
              <div>
                <p className="font-semibold">Starknet's staking upgrade</p>
                <p className="text-gray-600">STRK surged 29.98% post-mainnet v2 launch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending News */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-sm mb-3">Trending News</h3>
        <div className="space-y-3">
          <NewsItem 
            emoji="🔥"
            title="BREAKING: US U.S. SENATORS HAVE REACHED A DEAL TO END THE..."
            time="7 hours"
          />
        </div>
      </div>
    </div>
  );
}

// News Item Component
function NewsItem({ emoji, title, time }) {
  return (
    <div className="flex gap-2">
      <span className="text-sm">{emoji}</span>
      <div className="flex-1">
        <p className="text-xs text-gray-700 leading-relaxed">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">Crypto...</span>
          <span className="text-xs text-gray-400">✓ {time}</span>
        </div>
      </div>
    </div>
  );
}