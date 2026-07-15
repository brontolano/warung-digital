import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ReceiptPage() {
  const [recent, setRecent] = useState([
    { id: 'TRX-001', total: 35000, items: 3, date: '2026-07-14 19:30', method: 'Tunai' },
    { id: 'TRX-002', total: 12500, items: 2, date: '2026-07-14 18:15', method: 'QRIS' },
    { id: 'TRX-003', total: 78000, items: 5, date: '2026-07-14 17:00', method: 'Tunai' },
  ]);
  const [preview, setPreview] = useState<any>(null);

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header"><div><h1>🧾 Cetak Struk</h1><p className="text-gray-400 text-sm">Riwayat transaksi & cetak ulang struk</p></div></div>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Daftar Transaksi */}
          <div className="card">
            <h3 className="font-bold mb-3">Transaksi Terakhir</h3>
            <div className="space-y-2">{recent.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div><p className="font-medium text-sm">#{t.id}</p><p className="text-xs text-gray-400">{t.date} · {t.items} item</p></div>
                <div className="text-right"><p className="font-bold">Rp {t.total.toLocaleString()}</p>
                  <button onClick={() => setPreview(t)} className="text-xs text-emerald-600 hover:underline">Cetak Ulang</button></div>
              </div>
            ))}</div>
          </div>

          {/* Preview Struk */}
          <div className="card">
            <h3 className="font-bold mb-3">🖨️ Preview Struk</h3>
            {preview ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm font-mono">
                <div className="text-center border-b pb-2 mb-2">
                  <p className="font-bold text-base">🛒 WarungDigital</p>
                  <p className="text-xs text-gray-400">Jl. Merdeka No. 123</p>
                  <p className="text-xs text-gray-400">{preview.date}</p>
                </div>
                <p className="font-bold mb-1">#{preview.id}</p>
                <div className="border-b pb-2 mb-2 text-xs text-gray-500">
                  <div className="flex justify-between"><span>Item 1 x2</span><span>Rp 10.000</span></div>
                  <div className="flex justify-between"><span>Item 2 x1</span><span>Rp 25.000</span></div>
                </div>
                <div className="flex justify-between font-bold">Total<span className="text-emerald-600">Rp {preview.total.toLocaleString()}</span></div>
                <p className="text-xs text-gray-400 mt-2">Metode: {preview.method}</p>
                <p className="text-center text-xs text-gray-400 mt-2 border-t pt-2">Terima kasih sudah berbelanja! 🙏</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400"><p className="text-4xl mb-2">🧾</p><p className="text-sm">Pilih transaksi untuk preview struk</p></div>
            )}
          </div>
        </div>

        {/* Pengaturan Struk */}
        <div className="card">
          <h3 className="font-bold mb-3">⚙️ Pengaturan Struk</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <div><label className="text-sm font-medium block mb-1">Nama Toko</label><input className="input-field" defaultValue="WarungDigital" /></div>
            <div><label className="text-sm font-medium block mb-1">Alamat</label><input className="input-field" defaultValue="Jl. Merdeka No. 123" /></div>
            <div><label className="text-sm font-medium block mb-1">Footer Struk</label><input className="input-field" defaultValue="Terima kasih!" /></div>
          </div>
          <button className="btn-primary mt-3">💾 Simpan Pengaturan</button>
        </div>
      </div>
    </AdminLayout>
  );
}
