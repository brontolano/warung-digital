import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';
import { api } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports/profit-loss', { params: { store_id: 'default', start_date: new Date().toISOString().split('T')[0], end_date: new Date().toISOString().split('T')[0] } })
      .then(r => setData(r.data)).catch(() => setData(null)).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: '💰', label: 'Penjualan Hari Ini', value: loading ? '...' : 'Rp 0', color: 'from-emerald-500 to-emerald-600' },
    { icon: '📦', label: 'Total Produk', value: loading ? '...' : '0', color: 'from-blue-500 to-blue-600' },
    { icon: '🧾', label: 'Transaksi Hari Ini', value: loading ? '...' : '0x', color: 'from-amber-500 to-amber-600' },
    { icon: '⚠️', label: 'Stok Menipis', value: loading ? '...' : '0', color: 'from-red-500 to-red-600' },
  ];

  return (
    <AdminLayout>
      <div className="page-header"><h1>Dashboard</h1><p className="text-gray-400 text-sm">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="card card-stat relative overflow-hidden animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="icon-bg">{s.icon}</div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Link to="/admin/pos" className="card flex items-center gap-3 hover:shadow-md transition-all p-4 no-underline text-inherit">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">🛒</div>
          <div><p className="font-semibold text-sm">POS Kasir</p><p className="text-xs text-gray-400">Transaksi baru</p></div>
        </Link>
        <Link to="/admin/products" className="card flex items-center gap-3 hover:shadow-md transition-all p-4 no-underline text-inherit">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">📦</div>
          <div><p className="font-semibold text-sm">Produk</p><p className="text-xs text-gray-400">Atur barang</p></div>
        </Link>
        <Link to="/admin/reports" className="card flex items-center gap-3 hover:shadow-md transition-all p-4 no-underline text-inherit">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">📈</div>
          <div><p className="font-semibold text-sm">Laporan</p><p className="text-xs text-gray-400">Lihat keuangan</p></div>
        </Link>
        <Link to="/admin/stock" className="card flex items-center gap-3 hover:shadow-md transition-all p-4 no-underline text-inherit">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">📋</div>
          <div><p className="font-semibold text-sm">Stok Opname</p><p className="text-xs text-gray-400">Cek stok</p></div>
        </Link>
      </div>

      {/* Recent & Stock Alert */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-3 flex items-center gap-2"><span>🕐</span> Transaksi Terakhir</h3>
          <p className="text-gray-400 text-sm text-center py-6">Belum ada transaksi hari ini.</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-3 flex items-center gap-2"><span>⚠️</span> Stok Menipis</h3>
          <p className="text-gray-400 text-sm text-center py-6">Semua stok aman.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
