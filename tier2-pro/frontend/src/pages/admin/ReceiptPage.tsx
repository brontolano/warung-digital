import React, { useState, useRef } from 'react';
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
  const receiptRef = useRef<HTMLDivElement>(null);

  const printReceipt = (method: string) => {
    if (method === 'thermal') {
      setPrintStatus('🖨️ Mengirim ke printer Bluetooth...');
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
      // Cetak struk SAJA — bukan seluruh halaman
      const printWindow = window.open('', '_blank', 'width=300,height=600');
      if (!printWindow) { alert('Izinkan pop-up untuk mencetak struk'); return; }
      printWindow.document.write(`
        <html><head><title>Struk - ${preview.id}</title>
        <style>
          @page { margin: 0; size: 80mm auto; }
          body { font-family: 'Courier New', monospace; font-size: 12px; width: 72mm; margin: 0 auto; padding: 10px 5px; }
          .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 8px; }
          .header h2 { margin: 0; font-size: 14px; }
          .header p { margin: 2px 0; font-size: 10px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 2px 0; text-align: left; }
          .right { text-align: right; }
          .total { font-weight: bold; border-top: 1px dashed #000; padding-top: 4px; margin-top: 4px; }
          .footer { text-align: center; border-top: 1px dashed #000; padding-top: 8px; margin-top: 8px; font-size: 10px; }
        </style></head>
        <body>
          <div class="header">
            <h2>${settings.nama}</h2>
            <p>${settings.alamat}</p>
            <p>${preview.date}</p>
          </div>
          <p><strong>#${preview.id}</strong> | ${preview.method}</p>
          <table>
            <tr><th>Item</th><th class="right">Qty</th><th class="right">Harga</th></tr>
            <tr><td>Barang 1</td><td class="right">2</td><td class="right">Rp 20.000</td></tr>
            <tr><td>Barang 2</td><td class="right">1</td><td class="right">Rp 15.000</td></tr>
          </table>
          <div class="total"><table><tr><td><strong>TOTAL</strong></td><td class="right"><strong>Rp ${preview.total.toLocaleString()}</strong></td></tr></table></div>
          <div class="footer">${settings.footer}<br>Terima kasih!</div>
          <script>window.print(); window.close();</script>
        </body></html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header"><div><h1>🧾 Cetak Struk</h1><p className="text-gray-400 text-sm">Riwayat transaksi & cetak ulang struk</p></div></div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-bold mb-3">Transaksi Terakhir</h3>
            <div className="space-y-2">
              {recent.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div><p className="font-medium text-sm">#{t.id}</p><p className="text-xs text-gray-400">{t.date} · {t.items} item</p></div>
                  <div className="text-right"><p className="font-bold">Rp {t.total.toLocaleString()}</p>
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

          <div className="card">
            <h3 className="font-bold mb-3">🖨️ Preview & Cetak</h3>
            {printStatus && <div className="text-sm mb-2 p-2 bg-blue-50 rounded-lg">{printStatus}</div>}
            {preview ? (
              <div>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm font-mono" id="receipt-area" ref={receiptRef}>
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
                  <button onClick={() => printReceipt('thermal')} className="btn-primary flex items-center justify-center gap-2">🖨️ Cetak Bluetooth</button>
                  <button onClick={() => printReceipt('browser')} className="btn-secondary flex items-center justify-center gap-2">🖨️ Cetak Browser</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400"><p className="text-4xl mb-2">🧾</p><p className="text-sm">Pilih transaksi untuk preview & cetak</p></div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-3"><h3 className="font-bold">⚙️ Pengaturan Struk</h3>
            <button onClick={() => setEditing(!editing)} className="btn btn-sm btn-secondary">{editing ? '🔒 Selesai' : '✏️ Edit'}</button></div>
          {editing ? (
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm font-medium block mb-1">Nama Toko</label><input className="input-field" value={settings.nama} onChange={e => setSettings({...settings, nama: e.target.value})} /></div>
              <div><label className="text-sm font-medium block mb-1">Alamat Toko</label><input className="input-field" value={settings.alamat} onChange={e => setSettings({...settings, alamat: e.target.value})} /></div>
              <div><label className="text-sm font-medium block mb-1">Footer Struk</label><input className="input-field" value={settings.footer} onChange={e => setSettings({...settings, footer: e.target.value})} /></div>
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
