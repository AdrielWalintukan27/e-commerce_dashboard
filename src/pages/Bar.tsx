import { useState, useMemo, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface ChartProps {
  data: { name: string; sales: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTooltip = (value: any) => [value, 'Unit Terjual'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatLabel = (val: any) => val;

export function BarChartComponent({ data }: ChartProps) {
  const [sortMode, setSortMode] = useState<'DESC' | 'ASC'>('DESC');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) =>
      sortMode === 'ASC' ? a.sales - b.sales : b.sales - a.sales
    );
  }, [data, sortMode]);

  return (
    <div className="chart-container dark-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Perbandingan Produk Terjual (Bar Chart)</h3>

        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="Urutkan Data"
            style={{
              background: 'transparent',
              border: '1px solid #374151',
              color: '#9CA3AF',
              borderRadius: '4px',
              padding: '4px 12px',
              fontSize: '12px',
              cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            Urutkan
          </button>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: '0', marginTop: '8px',
              background: '#1B1D20', border: '1px solid #374151', borderRadius: '8px',
              padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '2px',
              minWidth: '200px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }}>
              <button onClick={() => { setSortMode('DESC'); setIsDropdownOpen(false); }} style={{ background: 'transparent', color: sortMode === 'DESC' ? '#6EE7B7' : '#F3F4F6', border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px' }}>Tertinggi ke Terendah</button>
              <button onClick={() => { setSortMode('ASC'); setIsDropdownOpen(false); }} style={{ background: 'transparent', color: sortMode === 'ASC' ? '#6EE7B7' : '#F3F4F6', border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px' }}>Terendah ke Tertinggi</button>
            </div>
          )}
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 13 }}
              width={100}
            />
            <Tooltip
              formatter={formatTooltip}
              cursor={{ fill: 'rgba(110,231,183,0.05)' }}
              contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px' }}
              itemStyle={{ color: 'var(--primary-color)' }}
            />
            <Bar dataKey="sales" fill="var(--primary-color)" radius={[0, 4, 4, 0]} barSize={16}>
              <LabelList dataKey="sales" position="right" fill="var(--text-primary)" fontSize={11} formatter={formatLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
