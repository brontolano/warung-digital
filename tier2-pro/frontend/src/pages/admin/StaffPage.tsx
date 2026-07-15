import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function StaffPage() {
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>👤 Manajemen Karyawan</h1><p className="text-gray-400 text-sm">Atur akun & hak akses staf</p></div><button className="btn-primary">+ Tambah Karyawan</button></div>
    <div className="table-wrap"><table><thead><tr><th>Nama</th><th>Posisi</th><th>Email</th><th>WhatsApp</th><th>Status</th><th>Terakhir Login</th><th>Aksi</th></tr></thead>
    <tbody><tr><td colSpan={7} className="text-center py-12 text-gray-400">Belum ada karyawan.</td></tr></tbody></table></div>
  </div></AdminLayout>;
}
