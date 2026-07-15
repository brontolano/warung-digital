import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function PpobPage() {
  const bills = [
    { name: 'Listrik', icon: '💡', provider: 'PLN', status: 'Aktif' },
    { name: 'PDAM', icon: '🚰', provider: 'PDAM Kota', status: 'Aktif' },
    { name: 'Pulsa', icon: '📱', provider: 'Telkomsel', status: 'Aktif' },
    { name: 'BPJS', icon: '🏥', provider: 'BPJS Kesehatan', status: 'Segera' },
    { name: 'TV Kabel', icon: '📺', provider: 'Indihome', status: 'Segera' },
    { name: 'Angsuran', icon: '🏦', provider: 'Multifinance', status: 'Segera' },
  ];
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>📱 PPOB — Pembayaran Tagihan</h1><p className="text-gray-400 text-sm">Bayar tagihan pelanggan & dapatkan komisi</p></div></div>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {bills.map((b, i) => (
        <div key={i} className={`card text-center hover:shadow-md cursor-pointer transition-all ${b.status === 'Segera' ? 'opacity-50' : ''}`}>
          <div className="text-3xl mb-1">{b.icon}</div>
          <p className="font-semibold text-sm">{b.name}</p>
          <p className="text-[0.6rem] text-gray-400">{b.provider}</p>
          <span className={`badge ${b.status === 'Aktif' ? 'badge-green' : 'badge-yellow'} text-[0.55rem]`}>{b.status}</span>
        </div>
      ))}
    </div>
    <div className="card"><h3 className="font-bold mb-3">🔍 Cari Tagihan</h3>
      <div className="flex gap-2"><select className="input-field w-48"><option>Listrik PLN</option></select>
        <input className="input-field flex-1" placeholder="Nomor ID Pelanggan / Meter" />
        <button className="btn-primary">Cek Tagihan</button></div>
    </div>
    <div className="card"><h3 className="font-bold mb-2">💵 Komisi PPOB</h3>
      <p className="text-sm text-gray-400">Dapatkan komisi dari setiap pembayaran tagihan yang dilakukan melalui toko Anda.</p>
      <div className="grid grid-cols-3 gap-4 mt-3"><div><p className="text-gray-400 text-xs">Komisi Hari Ini</p><p className="text-xl font-bold text-emerald-600">Rp 0</p></div>
      <div><p className="text-gray-400 text-xs">Bulan Ini</p><p className="text-xl font-bold">Rp 0</p></div>
      <div><p className="text-gray-400 text-xs">Total Pelanggan</p><p className="text-xl font-bold">0</p></div></div></div>
  </div></AdminLayout>;
}
