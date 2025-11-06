// GoldPriceChart.jsx
import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

/**
 * Expected props:
 * - data: Array of { date: 'YYYY-MM-DD', vn: number, world: number }
 * - vnLabel (optional), worldLabel (optional)
 */

function formatNumber(n) {
  if (n == null) return '-';
  // show thousands separators, no locale dependency to keep behavior predictable
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function parseDateISO(iso: any) {
  // iso expected 'YYYY-MM-DD'
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDateShort(iso: any) {
  const d = parseDateISO(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// find entry in data where entry.date === iso
function findByDate(dataMap: any, iso: any) {
  return dataMap.get(iso) || null;
}

// given a targetDate (Date object), find the closest entry on or before that date
function getClosestOnOrBefore(dataArray: any, targetDate: any) {
  // dataArray is expected sorted ascending by date (ensure via caller)
  for (let i = dataArray.length - 1; i >= 0; i--) {
    const itemDate = parseDateISO(dataArray[i].date);
    if (itemDate.getTime() <= targetDate.getTime()) return dataArray[i];
  }
  return null;
}

function getDateMinusDays(iso: any, days: any) {
  const d = parseDateISO(iso);
  d.setDate(d.getDate() - days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function CustomTooltip({ active, payload, label, dataSorted }: any) {
  if (!active || !payload || payload.length === 0) return null;

  // label is date string
  const date = label;
  // current entry values
  const current = payload.reduce((acc: any, p: any) => {
    acc[p.dataKey] = p.value;
    return acc;
  }, {});

  // compute prev day and 30 days prior using dataSorted (ascending)
  const prevIso = getDateMinusDays(date, 1);
  const target30Iso = getDateMinusDays(date, 30);

  // find exact prev day or closest on or before
  const prevEntry = getClosestOnOrBefore(dataSorted, parseDateISO(prevIso));
  const entry30 = getClosestOnOrBefore(dataSorted, parseDateISO(target30Iso));

  const calcChange = (now: any, before: any) => {
    if (now == null || before == null) return { abs: null, pct: null };
    const abs = now - before;
    const pct = before === 0 ? null : (abs / before) * 100;
    return { abs, pct };
  };

  const vnChangePrev = calcChange(current.vn, prevEntry ? prevEntry.vn : null);
  const worldChangePrev = calcChange(current.world, prevEntry ? prevEntry.world : null);

  const vnChange30 = calcChange(current.vn, entry30 ? entry30.vn : null);
  const worldChange30 = calcChange(current.world, entry30 ? entry30.world : null);

  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.12)',
      padding: 12,
      borderRadius: 6,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{formatDateShort(date)}</div>

      <div style={{ marginBottom: 6 }}>
        <div style={{ fontWeight: 600 }}>Giá VN</div>
        <div>Hiện tại: {formatNumber(current.vn)} VND</div>
        <div>
          Hôm trước: {prevEntry ? `${formatNumber(prevEntry.vn)} VND` : '-'}
          {vnChangePrev.abs != null && (
            <span> → {vnChangePrev.abs >= 0 ? '+' : ''}{formatNumber(vnChangePrev.abs)} ({vnChangePrev.pct != null ? `${vnChangePrev.pct.toFixed(2)}%` : '—'})</span>
          )}
        </div>
        <div>
          30 ngày trước: {entry30 ? `${formatNumber(entry30.vn)} VND` : '-'}
          {vnChange30.abs != null && (
            <span> → {vnChange30.abs >= 0 ? '+' : ''}{formatNumber(vnChange30.abs)} ({vnChange30.pct != null ? `${vnChange30.pct.toFixed(2)}%` : '—'})</span>
          )}
        </div>
      </div>

      <div>
        <div style={{ fontWeight: 600 }}>Giá Thế giới</div>
        <div>Hiện tại: {formatNumber(current.world)} USD</div>
        <div>
          Hôm trước: {prevEntry ? `${formatNumber(prevEntry.world)} USD` : '-'}
          {worldChangePrev.abs != null && (
            <span> → {worldChangePrev.abs >= 0 ? '+' : ''}{formatNumber(worldChangePrev.abs)} ({worldChangePrev.pct != null ? `${worldChangePrev.pct.toFixed(2)}%` : '—'})</span>
          )}
        </div>
        <div>
          30 ngày trước: {entry30 ? `${formatNumber(entry30.world)} USD` : '-'}
          {worldChange30.abs != null && (
            <span> → {worldChange30.abs >= 0 ? '+' : ''}{formatNumber(worldChange30.abs)} ({worldChange30.pct != null ? `${worldChange30.pct.toFixed(2)}%` : '—'})</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GoldPriceChart({ data = [], vnLabel = 'Giá vàng VN (VND)', worldLabel = 'Giá vàng Thế giới (USD)' }) {
  // Ensure data sorted ascending by date
  const dataSorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a: any, b: any) => parseDateISO(a.date).getTime() - parseDateISO(b.date).getTime());
    return copy;
  }, [data]);

  // Build a Map for quick exact-date lookup if needed
  const dataMap = useMemo(() => {
    const m = new Map();
    dataSorted.forEach((d : any) => m.set(d.date, d));
    return m;
  }, [dataSorted]);

  // Provide default domain for Y axes to look nice
  const worldValues = dataSorted.map((d: any) => d.world).filter(v => v != null);
  const vnValues = dataSorted.map((d: any) => d.vn).filter(v => v != null);

  const worldMin = worldValues.length ? Math.min(...worldValues) : 0;
  const worldMax = worldValues.length ? Math.max(...worldValues) : 100;
  const vnMin = vnValues.length ? Math.min(...vnValues) : 0;
  const vnMax = vnValues.length ? Math.max(...vnValues) : 100;

  return (
    <div style={{ width: '100%', height: 420, padding: 12 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataSorted} margin={{ top: 10, right: 60, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"
                 tickFormatter={formatDateShort}
                 minTickGap={12}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(v) => v >= 1000 ? (v/1000000).toFixed(1) + 'M' : v}
            domain={[Math.floor(vnMin * 0.98), Math.ceil(vnMax * 1.02)]}
            label={{ value: 'VND', angle: -90, position: 'insideLeft', offset: 8 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => v}
            domain={[Math.floor(worldMin * 0.98), Math.ceil(worldMax * 1.02)]}
            label={{ value: 'USD', angle: -90, position: 'insideRight', offset: 8 }}
          />

          <Tooltip content={<CustomTooltip dataSorted={dataSorted} />} />

          <Legend verticalAlign="top" height={36} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="vn"
            name={vnLabel}
            stroke="#b45309" // amber-ish
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="world"
            name={worldLabel}
            stroke="#0369a1" // blue-ish
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
