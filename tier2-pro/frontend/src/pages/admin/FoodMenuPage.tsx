import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function FoodMenuPage() {
  const [tab, setTab] = useState('menus');
  const menus = [
    { name: 'Nasi Goreng', price: 25000, category: 'Makanan', sales: 45 },
    { name: 'Mie Goreng', price: 20000, category: 'Makanan', sales: 38 },
    { name: 'Es Teh', price: 5000, category: 'Minuman', sales: 60 },
    { name: 'Ayam Geprek', price: 28000, category: 'Makanan', sales: 22 },
  ];
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🍽️ Food Menu — QR Self Order</h1><p className="text-gray-400 text-sm">Pelanggan scan QR, pesan sendiri dari HP</p></div><button className="btn-primary">+ Tambah Menu</button></div>
    <div className="flex gap-2 border-b pb-2">{['menus', 'qr', 'orders'].map(t => (
      <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
        {t === 'menus' ? '📋 Daftar Menu' : t === 'qr' ? '📱 QR Code' : '🛵 Pesanan Masuk'}</button>
    ))}</div>
    {tab === 'menus' && <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{menus.map((m, i) => (
      <div key={i} className="card text-center hover:shadow-md"><div className="text-4xl mb-2">🍽️</div>
        <p className="font-bold">{m.name}</p><p className="text-emerald-600 font-bold">Rp {m.price.toLocaleString()}</p>
        <p className="text-xs text-gray-400">{m.sales} terjual</p></div>
    ))}</div>}
    {tab === 'qr' && <div className="card text-center py-8"><div className="text-8xl mb-4">📱</div>
      <p className="text-lg font-bold">QR Code Meja</p><p className="text-sm text-gray-400 mb-4">Pelanggan scan untuk lihat menu & pesan</p>
      <div className="flex gap-2 justify-center"><button className="btn-primary">🖨️ Cetak QR Meja 1</button>
        <button className="btn-secondary">🖨️ Cetak Semua</button></div></div>}
    {tab === 'orders' && <div className="card"><p className="text-center py-8 text-gray-400">Belum ada pesanan masuk</p></div>}
  </div></AdminLayout>;
}
