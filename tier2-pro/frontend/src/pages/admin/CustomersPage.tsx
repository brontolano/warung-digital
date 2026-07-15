import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: 'c1', name: 'Budi Santoso', wa: '628123456789', total: 250000, visits: 5, last: '2026-07-12' },
    { id: 'c2', name: 'Siti Rahmawati', wa: '628987654321', total: 180000, visits: 3, last: '2026-07-10' },
    { id: 'c3', name: 'Ahmad Hidayat', wa: '628555123456', total: 420000, visits: 8, last: '2026-07-14' },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header">
          <div><h1>👥 Manajemen Pelanggan</h1><p className="text-gray-400 text-sm">{customers.length} pelanggan terdaftar</p></div>
          <button className="btn-primary">+ Tambah Pelanggan</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Nama</th><th>WhatsApp</th><th>Total Belanja</th><th>Kunjungan</th><th>Terakhir</th><th>Aksi</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td className="font-medium">{c.name}</td>
                  <td className="font-mono text-sm">{c.wa}</td>
                  <td className="font-semibold">Rp {c.total.toLocaleString()}</td>
                  <td>{c.visits}x</td>
                  <td className="text-sm text-gray-400">{c.last}</td>
                  <td><button className="btn btn-sm btn-secondary">Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
