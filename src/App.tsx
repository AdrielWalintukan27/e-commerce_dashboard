import './App.css';
import dashboardData from './data/data.json';
import LineChartComponent from './pages/Line';
import BarChartComponent from './pages/Bar';
import PieChartComponent from './pages/Pie';
import TableComponent from './pages/Table';

function App() {
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
          <svg onClick={() => handleActionClick('Pengaturan')} style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <svg onClick={() => handleActionClick('Notifikasi')} style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
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
      <section className="kpi-grid" style={{ marginTop: '4px' }}>
        <div className="kpi-card dark-card" style={{ gridColumn: 'span 2' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#F3F4F6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Insight Utama Ekosistem Bisnis</h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#9CA3AF', lineHeight: 1.7, textAlign: 'justify' }}>
            Berdasarkan agregasi data keseluruhan, ekosistem penjualan didominasi sangat kuat oleh produk teknologi perangkat keras. Kategori <strong>Electronics</strong> menjadi tulang punggung utama dengan kontribusi omzet mencapai <strong>38%</strong>, diikuti pengikut setianya di sektor <strong>Fashion (27%)</strong>. Ketika dibedah lebih jauh melalui komparasi produk individual, <em>Smartwatch</em> (140 Unit Terjual) dan <em>Gaming Mouse</em> (125 Unit Terjual) justru menempati kasta tertinggi melampaui perangkat tradisional seperti <em>Smartphone</em>. Hal ini menjadi indikator vital bahwa demografi pembeli utama platform ini didominasi oleh kalangan pekerja modern atau komunitas <em>gamers</em> yang aktif berburu suku cadang komplementer.
          </p>
        </div>
        <div className="kpi-card dark-card" style={{ gridColumn: 'span 2' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#F3F4F6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Analisis Tren Penjualan Tahunan</h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#9CA3AF', lineHeight: 1.7, textAlign: 'justify' }}>
            Kurva stabilitas tren menunjukkan fundamental performa yang amat sehat. Meskipun sempat memulai Kuartal 1 dengan stagnasi yang moderat (Rp 2,5 juta), lintasan omzet menanjak naik hingga menebus level resistensi pertama di pertengahan tahun (Rp 4,2 juta di bulan Juni). Secara luar biasa, momentum <em>bullish</em> kembali meledak pasca September dan mencapai titik keemasan absolut atau <em>All-Time High</em> pada siklus <strong>Desember dengan omzet fantastis Rp 7.200.000</strong>. Pola grafik musiman seperti ini mengkonfirmasi eksistensi sentimen konsumerisme liburan panjang akhir tahun.
          </p>
        </div>
        <div className="kpi-card dark-card" style={{ gridColumn: 'span 4' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#F3F4F6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rumusan Rekomendasi Strategis</h4>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Penguatan Rantai Pasok Kuartal ke-4:</strong> Fokuskan injeksi anggaran modal guna pemenuhan stok ruang gudang secara agresif sedari bulan Oktober, dikhususkan untuk inventaris gawai <em>peripherals</em> (Mouse, Keyboard, Smartwatch) sebagai mitigasi pencegahan <em>out-of-stock</em> jelang momentum bulan Desember.</li>
            <li><strong>Eksekusi Paket <em>Bundling</em>:</strong> Menerapkan taktik penetapan harga rakitan; menumpang jual produk dengan utilitas lambat (seperti <em>Backpack / Tas</em>) secara sepaket dengan produk pemicu primadona (contoh: Pembelian <em>Laptop</em> + Tas diskon 30%) untuk mengamankan <em>Average Order Value</em> pengguna ke tingkatan maksimal.</li>
            <li><strong>Penyelarasan Roda Promosi (Campaign):</strong> Mulai memanaskan algoritma iklan digital dan kampanye periklanan secara bertahap (<em>soft-selling</em>) semenjak bulan Agustus guna menabung sentimen ketertarikan masyarakat sedini mungkin sebelum mereka menghamburkan uangnya saat tunjangan liburan tiba.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
