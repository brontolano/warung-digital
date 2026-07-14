import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ReportsPage() {
  const [period, setPeriod] = useState('today');

  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto"><h1 className="text-2xl font-bold">📊 Laporan</h1>
    <div className="flex gap-2">{['today', 'week', 'month', 'year'].map(p => (
      <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-lg text-sm ${period === p ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
        {p === 'today' ? 'Hari Ini' : p === 'week' ? 'Minggu Ini' : p === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
      </button>
    ))}</div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-4"><p className="text-gray-500 text-sm">Total Penjualan</p><p className="text-3xl font-bold text-green-600">Rp 0</p></div>
      <div className="bg-white rounded-xl shadow p-4"><p className="text-gray-500 text-sm">Pengeluaran</p><p className="text-3xl font-bold text-red-600">Rp 0</p></div>
      <div className="bg-white rounded-xl shadow p-4"><p className="text-gray-500 text-sm">Laba Bersih</p><p className="text-3xl font-bold text-blue-600">Rp 0</p></div>
    </div>
    <div className="bg-white rounded-xl shadow p-4"><h2 className="font-bold mb-3">Top Produk</h2><p className="text-gray-400 text-sm">Belum ada data.</p></div>
  </div></AdminLayout>;
}

