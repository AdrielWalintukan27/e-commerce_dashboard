import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: { category: string; value: number }[];
}

// Tampilan variasi warna berbeda yang kontras untuk masing-masing kategori
const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTooltip = (value: any) => [`${value}%`, 'Persentase'];

export function PieChartComponent({ data }: ChartProps) {
  return (
    <div className="chart-container dark-card">
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
        <h3 style={{margin: 0}}>Distribusi Kategori (Pie Chart)</h3>
      </div>
      <div className="chart-wrapper" style={{ marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
             <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
              nameKey="category"
              stroke="none"
              cornerRadius={6}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{ backgroundColor: '#2B2F36', borderColor: '#374151', borderRadius: '8px', color: '#F3F4F6', fontSize: '13px' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;
