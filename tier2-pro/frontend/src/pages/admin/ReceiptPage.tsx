import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ReceiptPage() {
  const [recent, setRecent] = useState([
    { id: 'TRX-001', total: 35000, items: 3, date: '2026-07-14 19:30', method: 'Tunai' },
    { id: 'TRX-002', total: 12500, items: 2, date: '2026-07-14 18:15', method: 'QRIS' },
    { id: 'TRX-003', total: 78000, items: 5, date: '2026-07-14 17:00', method: 'Tunai' },
  ]);
  const [preview, setPreview] = useState<any>(null);
  const [settings, setSettings] = useState({ nama: 'WarungDigital', alamat: 'Jl. Merdeka No. 123', footer: 'Terima kasih sudah berbelanja! 🙏' });
  const [editing, setEditing] = useState(false);
  const [printStatus, setPrintStatus] = useState('');

  const printReceipt = (method: string) => {
    if (method === 'thermal') {
      setPrintStatus('🖨️ Mengirim ke printer Bluetooth...');
      // Web Bluetooth API for thermal printer
      const nb = (navigator as any);
      if (nb.bluetooth) {
        nb.bluetooth.requestDevice({ acceptAllDevices: true }).then((device: any) => {
          setPrintStatus(`✅ Terhubung ke ${device.name}`); device.gatt?.disconnect();
        }).catch((err: any) => setPrintStatus(`❌ Gagal: ${err.message}`));
      } else {
        setPrintStatus('❌ Bluetooth tidak didukung browser ini. Gunakan "Cetak Browser"');
      }
      setTimeout(() => setPrintStatus(''), 3000);
    } else {
      window.print();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header"><div><h1>🧾 Cetak Struk</h1><p className="text-gray-400 text-sm">Riwayat transaksi & cetak ulang struk</p></div></div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Daftar Transaksi */}
          <div className="card">
            <h3 className="font-bold mb-3">Transaksi Terakhir</h3>
            <div className="space-y-2">
              {recent.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-sm">#{t.id}</p>
                    <p className="text-xs text-gray-400">{t.date} · {t.items} item</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Rp {t.total.toLocaleString()}</p>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => { setPreview(t); }} className="text-xs text-emerald-600 hover:underline">👁️ Lihat</button>
                      <button onClick={() => { setPreview(t); setTimeout(() => printReceipt('thermal'), 300); }} className="text-xs text-blue-600 hover:underline">🖨️ Cetak</button>
                    </div>
                  </div>
                </div>
              ))}
              {recent.length === 0 && <p className="text-center text-gray-400 py-6">Belum ada transaksi.</p>}
            </div>
          </div>

          {/* Preview + Cetak */}
          <div className="card">
            <h3 className="font-bold mb-3">🖨️ Preview & Cetak</h3>
            {printStatus && <div className="text-sm mb-2 p-2 bg-blue-50 rounded-lg">{printStatus}</div>}
            {preview ? (
              <div>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm font-mono" id="receipt-area">
                  <div className="text-center border-b pb-2 mb-2">
                    <p className="font-bold text-base">{settings.nama}</p>
                    <p className="text-xs text-gray-400">{settings.alamat}</p>
                    <p className="text-xs text-gray-400">{preview.date}</p>
                  </div>
                  <p className="font-bold mb-1">#{preview.id}</p>
                  <div className="border-b pb-2 mb-2 text-xs text-gray-500">
                    <div className="flex justify-between"><span>Barang 1 x2</span><span>Rp 20.000</span></div>
                    <div className="flex justify-between"><span>Barang 2 x1</span><span>Rp 15.000</span></div>
                  </div>
                  <div className="flex justify-between font-bold">Total <span className="text-emerald-600">Rp {preview.total.toLocaleString()}</span></div>
                  <p className="text-xs text-gray-400 mt-2">Metode: {preview.method}</p>
                  <p className="text-center text-xs text-gray-400 mt-2 pt-2 border-t">{settings.footer}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button onClick={() => printReceipt('thermal')} className="btn-primary flex items-center justify-center gap-2">
                    🖨️ Cetak Bluetooth
                    <span className="text-xs opacity-70">(thermal)</span>
                  </button>
                  <button onClick={() => printReceipt('browser')} className="btn-secondary flex items-center justify-center gap-2">
                    🖨️ Cetak Browser
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400"><p className="text-4xl mb-2">🧾</p><p className="text-sm">Pilih transaksi untuk preview & cetak</p></div>
            )}
          </div>
        </div>

        {/* Pengaturan Struk */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">⚙️ Pengaturan Struk</h3>
            <button onClick={() => setEditing(!editing)} className="btn btn-sm btn-secondary">
              {editing ? '🔒 Selesai' : '✏️ Edit'}
            </button>
          </div>
          {editing ? (
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm font-medium block mb-1">Nama Toko</label>
                <input className="input-field" value={settings.nama} onChange={e => setSettings({...settings, nama: e.target.value})} /></div>
              <div><label className="text-sm font-medium block mb-1">Alamat Toko</label>
                <input className="input-field" value={settings.alamat} onChange={e => setSettings({...settings, alamat: e.target.value})} /></div>
              <div><label className="text-sm font-medium block mb-1">Footer Struk</label>
                <input className="input-field" value={settings.footer} onChange={e => setSettings({...settings, footer: e.target.value})} /></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div><span className="text-gray-400">Nama:</span> <span className="font-medium">{settings.nama}</span></div>
              <div><span className="text-gray-400">Alamat:</span> <span className="font-medium">{settings.alamat}</span></div>
              <div><span className="text-gray-400">Footer:</span> <span className="font-medium">{settings.footer}</span></div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
