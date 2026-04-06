import { useState, useMemo, useRef, useEffect } from 'react';

interface Transaction {
  id: number;
  customer: string;
  product: string;
  amount: number;
  date: string;
}

interface TableProps {
  data: Transaction[];
}

export function Table({ data }: TableProps) {
  const [filterMode, setFilterMode] = useState<'ALL' | 'HIGH' | 'LOW'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredData = useMemo(() => {
    let result = data;
    
    // Apply Type Filter
    if (filterMode === 'HIGH') result = result.filter(item => item.amount >= 2000000);
    if (filterMode === 'LOW') result = result.filter(item => item.amount < 2000000);

    // Apply Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => {
        const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }).toLowerCase();

        return item.customer.toLowerCase().includes(lowerSearch) || 
               item.product.toLowerCase().includes(lowerSearch) ||
               item.date.includes(lowerSearch) ||
               formattedDate.includes(lowerSearch) ||
               item.amount.toString().includes(lowerSearch);
      });
    }
    
    return result;
  }, [data, filterMode, searchTerm]);

  return (
    <div className="chart-container dark-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '380px' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #2B2F36'}}>
        <h3 style={{margin: 0}}>Detail Transaksi (Table)</h3>
        
        <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
           {/* Search Input */}
           <div style={{ position: 'relative' }}>
             <svg style={{ position: 'absolute', left: '10px', top: '7px', color: '#9CA3AF' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             <input
               type="text"
               placeholder="Cari transaksi..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{
                 background: '#18181A',
                 border: '1px solid #374151',
                 padding: '6px 14px 6px 30px',
                 borderRadius: '6px',
                 color: '#F3F4F6',
                 outline: 'none',
                 fontSize: '12px',
                 width: '140px'
               }}
             />
           </div>

           {/* Dropdown Filter */}
           <div style={{position: 'relative'}} ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="Filter Transaksi"
            style={{
              background: filterMode !== 'ALL' ? 'rgba(110, 231, 183, 0.1)' : 'transparent', 
              border: `1px solid ${filterMode !== 'ALL' ? '#6EE7B7' : '#374151'}`, 
              color: filterMode !== 'ALL' ? '#6EE7B7' : '#9CA3AF', 
              borderRadius: '4px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters {filterMode === 'HIGH' && '(> 2 Juta)'} {filterMode === 'LOW' && '(< 2 Juta)'}
          </button>

          {isDropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: '0', marginTop: '8px', 
              background: '#1B1D20', border: '1px solid #374151', borderRadius: '8px', 
              padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '2px',
              minWidth: '160px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }}>
              <button onClick={() => {setFilterMode('ALL'); setIsDropdownOpen(false);}} style={{background: 'transparent', color: filterMode === 'ALL' ? '#6EE7B7' : '#F3F4F6', border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px'}}>Semua Transaksi</button>
              <button onClick={() => {setFilterMode('HIGH'); setIsDropdownOpen(false);}} style={{background: 'transparent', color: filterMode === 'HIGH' ? '#6EE7B7' : '#F3F4F6', border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px'}}>Nilai &gt; 2 Juta</button>
              <button onClick={() => {setFilterMode('LOW'); setIsDropdownOpen(false);}} style={{background: 'transparent', color: filterMode === 'LOW' ? '#6EE7B7' : '#F3F4F6', border: 'none', padding: '8px 12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '13px'}}>Nilai &lt; 2 Juta</button>
            </div>
          )}
        </div>

        </div> {/* Closes flex gap wrapper */}
      </div>
      <div className="table-responsive" style={{flexGrow: 1}}>
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Product</th>
              <th>Date</th>
              <th style={{textAlign: 'right'}}>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id}>
                  <td style={{fontWeight: 600}}>{row.customer}</td>
                  <td style={{color: '#9CA3AF'}}>{row.product}</td>
                  <td style={{color: '#9CA3AF'}}>
                    {new Date(row.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td style={{textAlign: 'right', fontFamily: 'monospace', fontSize: '13px', color: '#6EE7B7'}}>
                    {row.amount.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{textAlign: 'center', padding: '24px', color: '#9CA3AF'}}>
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
