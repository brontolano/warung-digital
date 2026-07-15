import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function StorefrontPage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto"><h1 className="text-2xl font-bold">🏪 Pengaturan Toko</h1>
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <h2 className="font-bold">Landing Page Publik</h2>
      <p className="text-sm text-gray-500">Pengaturan halaman toko yang dilihat pelanggan.</p>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="card"><p className="text-sm font-medium">URL Toko</p><p className="text-green-600 text-xs">http://localhost:8080/</p></div>
        <div className="card"><p className="text-sm font-medium">Status</p><p className="text-green-600 text-xs">✅ Online</p></div>
        <div className="card"><p className="text-sm font-medium">WhatsApp Bisnis</p><p className="text-gray-500 text-xs">628123456789</p></div>
        <div className="card"><p className="text-sm font-medium">Metode Pembayaran</p><p className="text-gray-500 text-xs">COD</p></div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow p-4"><h2 className="font-bold mb-3">🔗 Link Cepat</h2>
      <div className="flex flex-wrap gap-2">
        <a href="/" target="_blank" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">Buka Toko →</a>
        <a href="/products" target="_blank" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm">Lihat Katalog →</a>
        <a href="/orders/track" target="_blank" className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg text-sm">Tracking Order →</a>
      </div>
    </div>
  </div></AdminLayout>;
}

