import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ExpensesPage() {
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>💸 Catat Pengeluaran</h1><p className="text-gray-400 text-sm">Pantau biaya operasional toko</p></div><button className="btn-primary">+ Tambah Pengeluaran</button></div>
    <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Kategori</th><th>Deskripsi</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody><tr><td colSpan={6} className="text-center py-12 text-gray-400">Belum ada pengeluaran yang dicatat.</td></tr></tbody></table></div>
    <div className="grid grid-cols-3 gap-4">
      <div className="card"><p className="text-gray-400 text-xs">Total Pengeluaran Bulan Ini</p><p className="text-2xl font-bold text-red-600">Rp 0</p></div>
      <div className="card"><p className="text-gray-400 text-xs">Rata-rata per Hari</p><p className="text-2xl font-bold text-gray-800">Rp 0</p></div>
      <div className="card"><p className="text-gray-400 text-xs">Kategori Terbesar</p><p className="text-2xl font-bold text-gray-800">—</p></div>
    </div>
  </div></AdminLayout>;
}
