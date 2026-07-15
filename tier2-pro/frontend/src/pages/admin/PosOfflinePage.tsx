import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function PosOfflinePage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>📡 POS Offline</h1><p className="text-gray-400 text-sm">Transaksi tanpa koneksi internet</p></div></div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card"><h3 className="font-bold mb-2">📶 Status Sinkronisasi</h3>
        <div className="flex items-center gap-3 mb-4"><div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div><span className="text-green-600 font-medium">Online — Terhubung</span></div>
        <div className="space-y-2"><div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg"><span>Antrian Sinkron</span><span className="font-bold">0 transaksi</span></div>
          <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg"><span>Data Lokal</span><span className="font-bold">245 MB</span></div></div>
      </div>
      <div className="card"><h3 className="font-bold mb-2">📦 Mode Offline</h3>
        <p className="text-sm text-gray-500 mb-3">POS tetap bisa digunakan tanpa internet. Data akan otomatis tersinkron saat koneksi kembali.</p>
        <div className="space-y-2"><label className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-emerald-600" /><span className="text-sm font-medium">Aktifkan mode offline</span></label>
          <label className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-emerald-600" /><span className="text-sm font-medium">Sinkronisasi otomatis</span></label></div>
          <button className="btn-primary w-full mt-3">🔄 Sinkronkan Sekarang</button>
      </div>
    </div>
  </div></AdminLayout>;
}
