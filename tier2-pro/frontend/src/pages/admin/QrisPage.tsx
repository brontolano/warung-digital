import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function QrisPage() {
  const [nominal, setNominal] = useState(0);
  const [qrText, setQrText] = useState('');
  const [history, setHistory] = useState([
    { date: '2026-07-14 19:30', nominal: 35000, status: 'Berhasil' },
    { date: '2026-07-14 15:00', nominal: 12500, status: 'Berhasil' },
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = () => {
    if (nominal <= 0) return alert('Masukkan nominal terlebih dahulu');
    // QRIS format: QRIS:{merchant_id}:{nominal}
    const merchantId = 'ID1234567890';
    const text = `QRIS:${merchantId}:${nominal}`;
    setQrText(text);
    setHistory(prev => [{ date: new Date().toLocaleString('id-ID'), nominal, status: 'Baru' }, ...prev]);
  };

  // Simple QR code rendering using canvas (without external lib)
  useEffect(() => {
    if (!qrText || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw a stylized QR code representation
    ctx.fillStyle = '#000000';

    // Position detection patterns (top-left, top-right, bottom-left)
    const patterns = [
      { x: 10, y: 10 }, { x: 140, y: 10 }, { x: 10, y: 140 }
    ];
    patterns.forEach(({ x, y }) => {
      ctx.fillRect(x, y, 30, 30); // outer
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 5, y + 5, 20, 20);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 10, y + 10, 10, 10);
    });

    // Data bits (simplified)
    const seed = qrText.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if ((seed * (i + 1) * (j + 1)) % 3 === 0) {
          ctx.fillRect(45 + j * 8, 45 + i * 8, 6, 6);
        }
      }
    }
  }, [qrText]);

  const totalHarian = history.filter(h => h.date.startsWith('2026-07-14')).reduce((s, h) => s + h.nominal, 0);

  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>💳 QRIS Pembayaran</h1><p className="text-gray-400 text-sm">Terima pembayaran QRIS tanpa ribet</p></div></div>

    <div className="grid md:grid-cols-2 gap-4">
      {/* Generate QR */}
      <div className="card">
        <h3 className="font-bold mb-3">🔳 Generate QRIS</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nominal Pembayaran <span className="text-red-500">*</span></label>
            <input type="number" className="input-field text-lg font-bold" placeholder="Masukkan nominal, contoh: 50000"
              value={nominal || ''} onChange={e => setNominal(Number(e.target.value))} />
            <p className="text-xs text-gray-400 mt-0.5">Masukkan jumlah yang harus dibayar pelanggan</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[25000, 50000, 100000, 150000, 200000, 500000].map(n => (
              <button key={n} onClick={() => setNominal(n)}
                className={`p-2 rounded-lg text-sm font-medium border ${nominal === n ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'border-gray-200 hover:border-emerald-300'}`}>
                Rp {n.toLocaleString()}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Info Merchant</label>
            <input className="input-field text-sm" defaultValue="Den Ana Brontolano - ID1234567890" disabled />
          </div>
          <button onClick={generateQR} className="btn-primary w-full py-4 text-lg">🔄 Generate QRIS</button>
        </div>
      </div>

      {/* QR Display */}
      <div className="card text-center">
        <h3 className="font-bold mb-3">📱 Scan QRIS</h3>
        {qrText ? (
          <div>
            <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 inline-block">
              <canvas ref={canvasRef} className="mx-auto" width="200" height="200" />
            </div>
            <p className="font-bold text-lg mt-3 text-emerald-600">Rp {nominal.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Scan dengan aplikasi pembayaran (GoPay, OVO, Dana, M banking)</p>
            <div className="mt-3 text-xs text-gray-400 p-2 bg-gray-50 rounded-lg break-all font-mono">{qrText}</div>
          </div>
        ) : (
          <div className="py-8 text-gray-400">
            <p className="text-6xl mb-3">💳</p>
            <p>Masukkan nominal & klik Generate</p>
          </div>
        )}
      </div>
    </div>

    {/* Riwayat */}
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">📊 Riwayat Pembayaran QRIS</h3>
        <p className="text-sm text-gray-400">Total: <span className="font-bold text-emerald-600">Rp {totalHarian.toLocaleString()}</span></p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">Tanggal</th><th>Nominal</th><th>Status</th></tr></thead>
        <tbody>{history.map((h, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            <td className="py-2">{h.date}</td><td className="font-semibold">Rp {h.nominal.toLocaleString()}</td>
            <td><span className={`badge ${h.status === 'Berhasil' ? 'badge-green' : 'badge-yellow'}`}>{h.status}</span></td>
          </tr>
        ))}</tbody></table>
      </div>
    </div>
  </div></AdminLayout>;
}
