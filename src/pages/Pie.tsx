import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: { category: string; value: number }[];
}

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTooltip = (value: any) => [`${value}%`, 'Persentase'];

export function PieChartComponent({ data }: ChartProps) {
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  const handleLegendClick = (e: any) => {
    const category = e.value;
    if (hiddenCategories.includes(category)) {
      setHiddenCategories(hiddenCategories.filter(c => c !== category));
    } else {
      setHiddenCategories([...hiddenCategories, category]);
    }
  };

  const activeData = data.map((d, index) => ({ ...d, originalIndex: index }))
                         .filter(d => !hiddenCategories.includes(d.category));

  const customLegendPayload = data.map((entry, index) => ({
    value: entry.category,
    type: 'circle' as const,
    id: entry.category,
    color: hiddenCategories.includes(entry.category) ? 'var(--border-color)' : COLORS[index % COLORS.length]
  }));

  const renderLegendText = (value: string) => {
    const isHidden = hiddenCategories.includes(value);
    return (
      <span 
        onClick={(e) => {
          e.preventDefault();
          if (hiddenCategories.includes(value)) {
            setHiddenCategories(hiddenCategories.filter(c => c !== value));
          } else {
            setHiddenCategories([...hiddenCategories, value]);
          }
        }}
        style={{ 
          color: isHidden ? 'var(--text-secondary)' : 'var(--text-primary)', 
          textDecoration: isHidden ? 'line-through' : 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'inline-block',
          padding: '2px 4px'
        }}
      >
        {value}
      </span>
    );
  };

  const renderCustomLegend = () => {
    return (
      <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {customLegendPayload.slice(0, 3).map((entry, index) => (
            <div key={`top-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div onClick={() => handleLegendClick(entry)} style={{ cursor: 'pointer', width: '8px', height: '8px', backgroundColor: entry.color, borderRadius: '50%' }}></div>
              {renderLegendText(entry.value)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {customLegendPayload.slice(3).map((entry, index) => (
            <div key={`bot-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div onClick={() => handleLegendClick(entry)} style={{ cursor: 'pointer', width: '8px', height: '8px', backgroundColor: entry.color, borderRadius: '50%' }}></div>
              {renderLegendText(entry.value)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="chart-container dark-card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
        <h3 style={{margin: 0}}>Distribusi Kategori (Pie Chart)</h3>
        {hiddenCategories.length > 0 && (
          <button 
            onClick={() => setHiddenCategories([])}
            style={{
              background: 'transparent', 
              border: '1px solid var(--primary-color)', 
              color: 'var(--primary-color)', 
              borderRadius: '4px', 
              padding: '2px 8px', 
              fontSize: '11px', 
              cursor: 'pointer'
            }}
          >
            Tampilkan Semua
          </button>
        )}
      </div>
      <div className="chart-wrapper" style={{ marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
             <Pie
              data={activeData}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
              nameKey="category"
              stroke="none"
              animationDuration={800}
            >
              {activeData.map((entry) => (
                <Cell key={`cell-${entry.category}`} fill={COLORS[entry.originalIndex % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px' }}
            />
            {/* Pengecualian TS: Recharts memiliki definisi tipe yang salah untuk payload Legend. Objek 'any' menghindari error tersebut. */}
            <Legend 
              {...({
                content: renderCustomLegend,
                verticalAlign: "bottom",
                height: 36
              } as any)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;
