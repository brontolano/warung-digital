import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports/profit-loss', { params: { store_id: 'default', start_date: new Date().toISOString().split('T')[0], end_date: new Date().toISOString().split('T')[0] } })
      .then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Penjualan Hari Ini', 'Pengeluaran', 'Total Stok', 'Transaksi'].map((title, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500 text-xs">{title}</p>
              <p className="text-2xl font-bold">{loading ? '...' : 'Rp 0'}</p></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-3">⚠️ Stok Menipis</h2>
          <p className="text-gray-400 text-sm">Tidak ada data stok menipis.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-3">Transaksi Terakhir</h2>
          <p className="text-gray-400 text-sm">Belum ada transaksi hari ini.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

