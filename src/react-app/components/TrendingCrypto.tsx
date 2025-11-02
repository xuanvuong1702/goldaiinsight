import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TrendingCrypto {
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  change7d: number;
}

const trendingCryptos: TrendingCrypto[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "₿",
    price: 42850.5,
    change24h: 2.3,
    change7d: 5.8,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "Ξ",
    price: 2245.75,
    change24h: -1.2,
    change7d: 3.2,
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: "◎",
    price: 142.35,
    change24h: 4.8,
    change7d: 12.5,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "Ð",
    price: 0.42,
    change24h: 3.2,
    change7d: 8.4,
  },
  {
    name: "XRP",
    symbol: "XRP",
    logo: "✕",
    price: 2.15,
    change24h: -2.1,
    change7d: -1.5,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    logo: "₳",
    price: 1.08,
    change24h: 1.5,
    change7d: 2.1,
  },
];

export default function TrendingCryptos() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Trending Cryptocurrencies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingCryptos.map((crypto) => (
          <div
            key={crypto.symbol}
            className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  {crypto.logo}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {crypto.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {crypto.symbol}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${crypto.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {crypto.change24h >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  24h: {Math.abs(crypto.change24h)}%
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    crypto.change7d >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {crypto.change7d >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  7d: {Math.abs(crypto.change7d)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
