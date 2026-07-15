import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function SuppliersPage() {
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🚚 Manajemen Supplier</h1><p className="text-gray-400 text-sm">Kelola pemasok barang</p></div><button className="btn-primary">+ Tambah Supplier</button></div>
    <div className="table-wrap"><table><thead><tr><th>Nama Supplier</th><th>Kontak</th><th>Produk</th><th>Total Pesanan</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody><tr><td colSpan={6} className="text-center py-12 text-gray-400">Belum ada supplier. Klik "+ Tambah Supplier" untuk memulai.</td></tr></tbody></table></div>
  </div></AdminLayout>;
}
