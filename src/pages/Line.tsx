import { useState, useMemo, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { month: string; sales: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTooltip = (value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Pendapatan'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatYAxis = (value: any) => `${(value / 1000000).toFixed(1)}M`;

export function LineChartComponent({ data }: ChartProps) {
  const [timeframe, setTimeframe] = useState<'1M'|'6M'|'1Y'>('1Y');
  const [endMonthIndex, setEndMonthIndex] = useState<number>(data.length - 1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let minAllowed = 0;
    if (timeframe === '1M') minAllowed = 1;
    if (timeframe === '6M') minAllowed = 5;
    
    if (timeframe === '1Y') {
      setEndMonthIndex(data.length - 1);
    } else if (endMonthIndex < minAllowed) {
      setEndMonthIndex(minAllowed);
    }
  }, [timeframe, endMonthIndex, data.length]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = useMemo(() => {
    if (timeframe === '1Y') return data;
    
    let minAllowed = 0;
    let sliceLength = 0;
    if (timeframe === '1M') { minAllowed = 1; sliceLength = 2; }
    if (timeframe === '6M') { minAllowed = 5; sliceLength = 6; }
    
    const safeEndIndex = Math.max(minAllowed, Math.min(data.length - 1, endMonthIndex));
    const startIndex = safeEndIndex - sliceLength + 1;
    
    return data.slice(startIndex, safeEndIndex + 1);
  }, [data, timeframe, endMonthIndex]);

  const validMonthsToSelect = useMemo(() => {
    let minAllowed = 0;
    if (timeframe === '1M') minAllowed = 1;
    if (timeframe === '6M') minAllowed = 5;
    
    return data.map((d, i) => ({ label: d.month, index: i }))
               .filter(item => item.index >= minAllowed);
  }, [data, timeframe]);

  const buttonBaseStyle = { padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none' };
  const getBtnStyle = (isActive: boolean) => isActive 
    ? { ...buttonBaseStyle, background: '#374151', color: '#FFF' }
    : { ...buttonBaseStyle, background: 'transparent', color: '#9CA3AF' };

  return (
    <div className="chart-container dark-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
         <h3 style={{margin: 0, fontSize: '15px', fontWeight: 500}}>Tren Penjualan (Line Chart)</h3>
         
         <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
           {timeframe !== '1Y' && (
             <div style={{position: 'relative'}} ref={dropdownRef}>
               <button 
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 title="Pilih Bulan Akhir"
                 style={{
                   background: 'transparent', border: '1px solid #374151', color: '#9CA3AF', 
                   borderRadius: '4px', padding: '4px 12px', fontSize: '12px', 
                   cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center'
                 }}
               >
                 Hingga: {data[endMonthIndex]?.month || ''}
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
               </button>

               {isDropdownOpen && (
                 <div style={{
                   position: 'absolute', top: '100%', right: '0', marginTop: '8px', 
                   background: '#1B1D20', border: '1px solid #374151', borderRadius: '8px', 
                   padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '2px',
                   minWidth: '120px', maxHeight: '180px', overflowY: 'auto', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                 }}>
                   {validMonthsToSelect.map((m) => (
                     <button 
                       key={m.index}
                       onClick={() => { setEndMonthIndex(m.index); setIsDropdownOpen(false); }} 
                       style={{
                         background: endMonthIndex === m.index ? 'rgba(110, 231, 183, 0.1)' : 'transparent', 
                         color: endMonthIndex === m.index ? '#6EE7B7' : '#F3F4F6', 
                         border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px'
                       }}
                     >
                       Bulan {m.label}
                     </button>
                   ))}
                 </div>
               )}
             </div>
           )}

           <div style={{ display: 'flex', gap: '8px' }}>
             <button style={getBtnStyle(timeframe === '1M')} onClick={() => setTimeframe('1M')}>1M</button>
             <button style={getBtnStyle(timeframe === '6M')} onClick={() => setTimeframe('6M')}>6M</button>
             <button style={getBtnStyle(timeframe === '1Y')} onClick={() => setTimeframe('1Y')}>1Y</button>
           </div>
         </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#2B2F36" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} width={80} tickFormatter={formatYAxis} />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{ backgroundColor: '#2B2F36', borderColor: '#374151', borderRadius: '8px', color: '#F3F4F6', fontSize: '13px' }}
              itemStyle={{ color: '#6EE7B7' }}
            />
            <Line type="linear" dataKey="sales" stroke="#6EE7B7" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#6EE7B7', stroke: '#1B1D20', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent;
