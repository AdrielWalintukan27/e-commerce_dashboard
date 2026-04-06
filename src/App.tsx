import { useState, useEffect } from 'react';
import './App.css';
import dashboardData from './data/data.json';
import LineChartComponent from './pages/Line';
import BarChartComponent from './pages/Bar';
import PieChartComponent from './pages/Pie';
import TableComponent from './pages/Table';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const {
    summary,
    salesTrend,
    topProducts,
    categoryDistribution,
    recentTransactions
  } = dashboardData;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const rataRataPenjualan = Math.round(summary.totalSales / summary.totalOrders);
  const topCategoryName = categoryDistribution.reduce((prev, current) => (prev.value > current.value) ? prev : current).category;

  const handleActionClick = (featureName: string) => {
    alert(`Fitur [${featureName}] belum diaktifkan pada Mockup Dashboard ini.`);
  };

  return (
    <div className="dashboard-layout">
      {/* Header Section */}
      <header className="header" style={{ alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ margin: 0 }}>Dashboard Analytics</h1>
          <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>E-Commerce Retail Multikategori (Generic Online Store)</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '6px' }}>
          {/* Theme Toggle Button */}
          <div onClick={() => setIsLightMode(!isLightMode)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={isLightMode ? "Beralih ke Mode Malam" : "Beralih ke Mode Terang"}>
            {isLightMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </div>
          
          <svg onClick={() => handleActionClick('Notifikasi')} style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <div onClick={() => handleActionClick('Profil Pengguna')} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', cursor: 'pointer' }} title="Profil"></div>
        </div>
      </header>

      {/* KPI Section */}
      <section className="kpi-grid">
        <div className="kpi-card dark-card">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <p className="kpi-title">TOTAL DATA PENJUALAN</p>
            <span className="kpi-tooltip" data-tooltip="Pertumbuhan +2.4% dibandingkan bulan lalu." style={{ color: 'var(--positive-color)', fontSize: '11px', fontWeight: 600 }}>+2.4%</span>
          </div>
          <p className="kpi-value">{formatCurrency(summary.totalSales)}</p>
        </div>
        <div className="kpi-card dark-card">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <p className="kpi-title">RATA-RATA ORDER</p>
            <span className="kpi-tooltip" data-tooltip="Pembeli memesan +1.2% lebih banyak dibanding periode sebelumnya." style={{ color: 'var(--positive-color)', fontSize: '11px', fontWeight: 600 }}>+1.2%</span>
          </div>
          <p className="kpi-value">Rp {formatCurrency(rataRataPenjualan)}</p>
        </div>
        <div className="kpi-card dark-card">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <p className="kpi-title">TOTAL PESANAN</p>
            <span className="kpi-tooltip" data-tooltip="Terjadi pelemahan -0.8% dari target kuota pesanan transaksi." style={{ color: 'var(--negative-color)', fontSize: '11px', fontWeight: 600 }}>-0.8%</span>
          </div>
          <p className="kpi-value">{formatNumber(summary.totalOrders)}</p>
        </div>
        <div className="kpi-card dark-card">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <p className="kpi-title">KATEGORI TERATAS</p>
            <span className="kpi-tooltip" data-tooltip="Sektor elektronik mendominasi persentase penjualan tertinggi saat ini." style={{ color: 'var(--positive-color)', fontSize: '11px', fontWeight: 600 }}>Info</span>
          </div>
          <p className="kpi-value" style={{ fontSize: '22px', marginTop: '4px' }}>{topCategoryName}</p>
        </div>
      </section>

      {/* Main Grid 1: Line Chart & Pie Chart */}
      <section className="main-grid">
        <LineChartComponent data={salesTrend} />
        <PieChartComponent data={categoryDistribution} />
      </section>

      {/* Main Grid 2: Table & Bar Chart */}
      <section className="main-grid">
        <TableComponent data={recentTransactions} />
        <BarChartComponent data={topProducts} />
      </section>

      {/* Insight & Recommendation Assignment Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '4px' }}>
        <div className="kpi-card dark-card">
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>INSIGHT UTAMA</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
            Kategori Electronics mendominasi pasar (38%). Secara volume, Smartwatch menjadi produk paling laris dengan total 140 unit terjual, menunjukkan tren perangkat wearable sangat kuat dibanding kategori lainnya
          </p>
        </div>
        <div className="kpi-card dark-card">
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TREN PENJUALAN</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
            Data menunjukkan pertumbuhan konsisten sepanjang tahun. Penjualan meningkat bertahap dari 2,5 Juta (Januari) dan mencapai puncak tertinggi pada Desember (7,2 Juta) akibat lonjakan belanja akhir tahun.
          </p>
        </div>
        <div className="kpi-card dark-card">
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>REKOMENDASI STRATEGIS</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
            Prioritaskan stok Smartwatch dan Gaming Mouse sebagai penggerak utama transaksi. Berikan promo khusus pada kategori Beauty dan Sports (di bawah 10%) untuk menyeimbangkan pendapatan toko.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
