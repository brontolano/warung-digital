import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function MultiUnitPage() {
  const products = [
    { name: 'Indomie Goreng', satuan: { pcs: 3500, pack: 32000, dus: 150000 } },
    { name: 'Air Mineral 600ml', satuan: { pcs: 5000, dus: 48000 } },
    { name: 'Minyak Goreng 1L', satuan: { pcs: 18000, karton: 200000 } },
  ];
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>📏 Multi Satuan</h1><p className="text-gray-400 text-sm">Atur harga per satuan berbeda untuk setiap produk</p></div></div>
    <div className="table-wrap"><table><thead><tr><th>Produk</th><th>Satuan & Harga</th><th>Aksi</th></tr></thead>
    <tbody>{products.map((p, i) => (
      <tr key={i}><td className="font-medium">{p.name}</td>
      <td><div className="flex flex-wrap gap-2">{Object.entries(p.satuan).map(([unit, price]) => (
        <span key={unit} className="badge badge-green">{unit}: Rp {price.toLocaleString()}</span>
      ))}</div></td>
      <td><button className="btn btn-sm btn-secondary">Atur</button></td></tr>
    ))}</tbody></table></div>
    <div className="card"><h3 className="font-bold mb-2">➕ Tambah Multi Satuan</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <div><label className="text-sm font-medium block mb-1">Produk</label><select className="input-field"><option>Indomie Goreng</option></select></div>
        <div><label className="text-sm font-medium block mb-1">Satuan</label><input className="input-field" placeholder="Contoh: karton, lusin, botol" /></div>
        <div><label className="text-sm font-medium block mb-1">Isi per Satuan</label><input className="input-field" type="number" placeholder="Contoh: 12 (buah per karton)" /></div>
        <div><label className="text-sm font-medium block mb-1">Harga Satuan</label><input className="input-field" type="number" placeholder="Contoh: 40000" /></div>
      </div>
      <button className="btn-primary mt-3">✅ Simpan Satuan Baru</button>
    </div>
  </div></AdminLayout>;
}
