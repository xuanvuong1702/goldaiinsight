import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import { useState } from "react";

interface Crypto {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
}

const mockCryptos: Crypto[] = [
  {
    id: 1,
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "₿",
    price: 42850.5,
    change24h: 2.3,
    marketCap: 840.2,
    volume24h: 28.5,
    circulatingSupply: 21.0,
  },
  {
    id: 2,
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "Ξ",
    price: 2245.75,
    change24h: -1.2,
    marketCap: 270.5,
    volume24h: 15.2,
    circulatingSupply: 120.4,
  },
  {
    id: 3,
    rank: 3,
    name: "Solana",
    symbol: "SOL",
    logo: "◎",
    price: 142.35,
    change24h: 4.8,
    marketCap: 65.3,
    volume24h: 3.2,
    circulatingSupply: 459.0,
  },
  {
    id: 4,
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    logo: "✕",
    price: 2.15,
    change24h: -2.1,
    marketCap: 115.8,
    volume24h: 4.5,
    circulatingSupply: 53.9,
  },
  {
    id: 5,
    rank: 5,
    name: "Cardano",
    symbol: "ADA",
    logo: "₳",
    price: 1.08,
    change24h: 1.5,
    marketCap: 40.2,
    volume24h: 1.8,
    circulatingSupply: 37.3,
  },
  {
    id: 6,
    rank: 6,
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "Ð",
    price: 0.42,
    change24h: 3.2,
    marketCap: 62.5,
    volume24h: 2.1,
    circulatingSupply: 148.9,
  },
  {
    id: 7,
    rank: 7,
    name: "Polkadot",
    symbol: "DOT",
    logo: "●",
    price: 8.75,
    change24h: -0.8,
    marketCap: 14.2,
    volume24h: 0.9,
    circulatingSupply: 1.62,
  },
  {
    id: 8,
    rank: 8,
    name: "Avalanche",
    symbol: "AVAX",
    logo: "▲",
    price: 38.45,
    change24h: 2.1,
    marketCap: 15.6,
    volume24h: 0.7,
    circulatingSupply: 0.406,
  },
];

export default function CryptoTable() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
                Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                Volume (24h)
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                Circulating Supply
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockCryptos.map((crypto) => (
              <tr
                key={crypto.id}
                className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {crypto.rank}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {crypto.logo}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {crypto.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {crypto.symbol}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white text-right">
                  ${crypto.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${
                      crypto.change24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.change24h >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {Math.abs(crypto.change24h)}%
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
                  ${crypto.marketCap.toFixed(1)}B
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
                  ${crypto.volume24h.toFixed(1)}B
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 text-right">
                  {crypto.circulatingSupply.toFixed(2)}M
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleFavorite(crypto.id)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        favorites.has(crypto.id)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
