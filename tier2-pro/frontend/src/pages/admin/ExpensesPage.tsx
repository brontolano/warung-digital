import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ExpensesPage() {
  const [items, setItems] = useState([
    { id: 1, date: '2026-07-14', category: 'Modal', desc: 'Beli sembako supplier', nominal: 500000 },
    { id: 2, date: '2026-07-14', category: 'Operasional', desc: 'Listrik', nominal: 150000 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], category: 'Operasional', desc: '', nominal: 0 });

  const total = items.reduce((sum, i) => sum + i.nominal, 0);
  const save = () => {
    if (!form.desc || form.nominal <= 0) return alert('Deskripsi & nominal harus diisi');
    if (editId) { setItems(prev => prev.map(i => i.id === editId ? { ...i, ...form } : i)); }
    else { setItems(prev => [...prev, { id: Date.now(), ...form }]); }
    setShowModal(false); setEditId(null); setForm({ date: new Date().toISOString().split('T')[0], category: 'Operasional', desc: '', nominal: 0 });
  };
  const remove = (id: number) => { if (confirm('Yakin hapus?')) setItems(prev => prev.filter(i => i.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>💸 Pengeluaran</h1><p className="text-gray-400 text-sm">Catat biaya operasional toko</p></div>
      <button onClick={() => { setEditId(null); setForm({date: new Date().toISOString().split('T')[0],category:'Operasional',desc:'',nominal:0}); setShowModal(true); }} className="btn-primary">+ Tambah</button></div>
    <div className="grid grid-cols-3 gap-4">
      <div className="card"><p className="text-gray-400 text-xs">Total Pengeluaran</p><p className="text-2xl font-bold text-red-600">Rp {total.toLocaleString()}</p></div>
      <div className="card"><p className="text-gray-400 text-xs">Item Tercatat</p><p className="text-2xl font-bold">{items.length}</p></div>
      <div className="card"><p className="text-gray-400 text-xs">Rata-rata per Item</p><p className="text-2xl font-bold">Rp {items.length ? Math.round(total / items.length).toLocaleString() : 0}</p></div>
    </div>
    <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Kategori</th><th>Deskripsi</th><th>Nominal</th><th>Aksi</th></tr></thead>
    <tbody>{items.map(i => <tr key={i.id}>
      <td className="text-sm">{i.date}</td><td><span className="badge badge-blue">{i.category}</span></td><td>{i.desc}</td>
      <td className="font-semibold text-red-600">Rp {i.nominal.toLocaleString()}</td>
      <td><button onClick={() => { setEditId(i.id); setForm(i); setShowModal(true); }} className="btn btn-sm btn-secondary">Edit</button>
      <button onClick={() => remove(i.id)} className="btn btn-sm btn-danger ml-1">Hapus</button></td>
    </tr>)}</tbody></table></div>
    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '💸 Tambah'} Pengeluaran</h2>
        <p className="text-gray-400 text-sm mb-4">Catat pengeluaran toko untuk laporan keuangan akurat.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Tanggal</label><input type="date" className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Kategori</label><select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="Modal">Modal (beli barang)</option><option value="Operasional">Operasional (listrik, sewa)</option>
            <option value="Gaji">Gaji Karyawan</option><option value="Transport">Transportasi</option><option value="Lainnya">Lainnya</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Deskripsi <span className="text-red-500">*</span></label><input className="input-field" placeholder="Contoh: Beli sembako, bayar listrik" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Nominal <span className="text-red-500">*</span></label><input type="number" className="input-field" placeholder="Contoh: 500000" value={form.nominal || ''} onChange={e => setForm({...form, nominal: Number(e.target.value)})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button><button onClick={save} className="flex-1 btn-primary">💾 Simpan</button></div></div>
      </div></div>}
  </div></AdminLayout>;
}
