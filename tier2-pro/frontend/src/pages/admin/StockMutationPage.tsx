import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function StockMutationPage() {
  const mutations = [
    { date: '2026-07-14', type: 'Penjualan', product: 'Indomie Goreng', qty: -5, stock: 45, ref: 'TRX-001' },
    { date: '2026-07-14', type: 'Pembelian', product: 'Indomie Goreng', qty: 50, stock: 50, ref: 'PO-001' },
    { date: '2026-07-13', type: 'Penjualan', product: 'Aqua 600ml', qty: -3, stock: 47, ref: 'TRX-099' },
    { date: '2026-07-13', type: 'Stok Opname', product: 'Sabun Lifebuoy', qty: -2, stock: 18, ref: 'OP-001' },
    { date: '2026-07-12', type: 'Retur', product: 'Rokok Mild', qty: -1, stock: 24, ref: 'RET-001' },
  ];
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header">
      <div><h1>📊 Mutasi Stok</h1><p className="text-gray-400 text-sm">Riwayat pergerakan barang masuk & keluar</p></div>
      <div className="flex gap-2"><input className="input-field w-48" placeholder="Cari produk..." /><select className="input-field w-36"><option>Semua</option><option>Hari Ini</option><option>Minggu Ini</option><option>Bulan Ini</option></select></div>
    </div>
    <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Tipe</th><th>Produk</th><th>Qty</th><th>Sisa Stok</th><th>Ref</th></tr></thead>
    <tbody>{mutations.map((m, i) => (
      <tr key={i}><td className="text-sm">{m.date}</td>
      <td><span className={`badge ${m.type === 'Penjualan' ? 'badge-blue' : m.type === 'Pembelian' ? 'badge-green' : 'badge-yellow'}`}>{m.type}</span></td>
      <td className="font-medium">{m.product}</td>
      <td className={`font-bold ${m.qty > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
      <td>{m.stock}</td><td className="text-xs text-gray-400">{m.ref}</td></tr>
    ))}</tbody></table></div>
    <div className="card"><h3 className="font-bold mb-3">📈 Ringkasan Hari Ini</h3>
      <div className="grid grid-cols-3 gap-4"><div><p className="text-gray-400 text-xs">Barang Masuk</p><p className="text-2xl font-bold text-emerald-600">+50</p></div>
      <div><p className="text-gray-400 text-xs">Barang Keluar</p><p className="text-2xl font-bold text-red-600">-8</p></div>
      <div><p className="text-gray-400 text-xs">Produk Terjual</p><p className="text-2xl font-bold">2 item</p></div></div></div>
  </div></AdminLayout>;
}
