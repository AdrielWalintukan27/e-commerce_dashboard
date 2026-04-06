import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { month: string; sales: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTooltip = (value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Value'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatYAxis = (value: any) => `${(value / 1000000).toFixed(1)}M`;

export function LineChartComponent({ data }: ChartProps) {
  const [timeframe, setTimeframe] = useState<'1M'|'6M'|'1Y'>('1Y');

  // Filter based on user timeframe selection
  const filteredData = useMemo(() => {
    if (timeframe === '1M') return data.slice(-2); // Grab last 2 months to still show a line trend spanning to the end
    if (timeframe === '6M') return data.slice(-6);
    return data;
  }, [data, timeframe]);

  const buttonBaseStyle = { padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none' };
  const getBtnStyle = (isActive: boolean) => isActive 
    ? { ...buttonBaseStyle, background: '#374151', color: '#FFF' }
    : { ...buttonBaseStyle, background: 'transparent', color: '#9CA3AF' };

  return (
    <div className="chart-container dark-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
         <h3 style={{margin: 0, fontSize: '15px', fontWeight: 500}}>Tren Penjualan (Line Chart)</h3>
         <div style={{ display: 'flex', gap: '8px' }}>
           <button style={getBtnStyle(timeframe === '1M')} onClick={() => setTimeframe('1M')}>1M</button>
           <button style={getBtnStyle(timeframe === '6M')} onClick={() => setTimeframe('6M')}>6M</button>
           <button style={getBtnStyle(timeframe === '1Y')} onClick={() => setTimeframe('1Y')}>1Y</button>
         </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#2B2F36" />
            <XAxis 
               dataKey="month" 
               axisLine={false} 
               tickLine={false} 
               tick={{fill: '#6B7280', fontSize: 11}} 
               dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#6B7280', fontSize: 11}} 
              width={80} 
              tickFormatter={formatYAxis} 
            />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{ backgroundColor: '#2B2F36', borderColor: '#374151', borderRadius: '8px', color: '#F3F4F6', fontSize: '13px' }}
              itemStyle={{ color: '#6EE7B7' }}
            />
            <Line 
              type="linear" 
              dataKey="sales" 
              stroke="#6EE7B7" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 4, fill: '#6EE7B7', stroke: '#1B1D20', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent;
