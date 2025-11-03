import { Search, TrendingUp, Menu, X, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import LoginModal from "./Login";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
  
    const navigationItems = [
      { label: "Biểu đồ", href: "/" },
      { label: "Tin tức", href: "#" },
      { label: "Đầu tư", href: "#" },
    ];
  
    const rightItems = [
      { label: "Watchlist", href: "#" }
    ];
  
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div  className="flex items-center gap-2 flex-shrink-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white " />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white hidden sm:inline">
                Thị trường vàng
              </span>
            </div>
  
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {item.label}
                </div>
              ))}
            </nav>
  
            {/* Right Side Items */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              {isAuthenticated && (
                <div
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </div>
              )}
              {/* Right Navigation divs */}
              {!isAuthenticated && (
                <div className="flex items-center gap-4">
                  {rightItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
  
            {/* Authenticated User Display */}
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {user.name || user.email}
                  </p>
                </div>
              </div>
            )}
  
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated && (
                <>
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-8 pr-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
  
                  {/* Currency Selector */}
                  <button className="flex items-center gap-1 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-900 dark:text-white">
                    $ USD
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
  
            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  {/* Log In Button */}
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    Log In
                  </button>
  
                  {/* User Account Icon (disabled when not logged in) */}
                  <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors opacity-50 cursor-not-allowed">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </>
              ) : (
                <div className="relative">
                  {/* User Account Icon - opens menu when logged in */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                    title="Account menu"
                  >
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {user?.name || user?.email}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        {/* <LogOut className="w-4 h-4" /> */}
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
  
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-900 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
              )}
            </button>
          </div>
  
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
              <nav className="flex flex-col gap-1 mt-4">
                {navigationItems.map((item) => (
                  <div
                    key={item.label}
                    //to={item.href}
                    className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    {item.label}
                  </div>
                ))}
              </nav>
              <div className="mt-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-900 dark:text-white">
                    $ USD
                  </button>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
  
        {/* Login Modal */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </header>
    );
  }
  