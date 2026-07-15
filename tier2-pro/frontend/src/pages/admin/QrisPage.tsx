import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function QrisPage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>💳 QRIS Pembayaran</h1><p className="text-gray-400 text-sm">Terima pembayaran via QRIS tanpa ribet</p></div></div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card text-center"><h3 className="font-bold mb-3">🔳 QRIS Statis</h3>
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl w-48 h-48 mx-auto flex items-center justify-center text-6xl">📱</div>
        <p className="text-xs text-gray-400 mt-2">Scan untuk bayar — Rp berapa pun</p>
        <div className="mt-3 space-y-2">
          <div><label className="text-sm block">Nomor Merchant</label><input className="input-field text-sm" defaultValue="ID1234567890" /></div>
          <div><label className="text-sm block">Nama Merchant</label><input className="input-field text-sm" defaultValue="WarungDigital" /></div>
        </div>
        <button className="btn-primary w-full mt-3">🔄 Generate QRIS</button>
      </div>
      <div className="card"><h3 className="font-bold mb-3">📊 Riwayat Pembayaran QRIS</h3>
        <div className="text-center py-8 text-gray-400"><p className="text-3xl mb-2">💳</p><p>Belum ada transaksi QRIS hari ini</p></div>
        <div className="space-y-1 text-sm"><p>✅ Siap digunakan — Aktifkan di POS</p>
          <p className="text-yellow-600">⏳ Menunggu verifikasi merchant</p></div>
      </div>
    </div>
  </div></AdminLayout>;
}
