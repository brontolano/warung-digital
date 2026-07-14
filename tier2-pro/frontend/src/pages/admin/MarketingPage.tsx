import React from 'react';
import AdminLayout from '../components/AdminLayout';

export default function MarketingPage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto"><h1 className="text-2xl font-bold">🏆 Marketing</h1>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">🎯 Loyalty Point</h3><p className="text-sm text-gray-500 mt-2">Manajemen poin pelanggan</p></div>
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">💰 Komisi Staff</h3><p className="text-sm text-gray-500 mt-2">Tracking komisi penjualan</p></div>
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">🏷️ Promo</h3><p className="text-sm text-gray-500 mt-2">Buat promo & diskon</p></div>
    </div>
  </div></AdminLayout>;
}
