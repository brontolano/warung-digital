import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function MultiUnitPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Indomie Goreng', base: 'pcs', units: [{ name: 'pcs', qty: 1, price: 3500 }, { name: 'pack', qty: 10, price: 32000 }, { name: 'dus', qty: 40, price: 130000 }] },
    { id: 2, name: 'Air Mineral 600ml', base: 'pcs', units: [{ name: 'pcs', qty: 1, price: 5000 }, { name: 'dus', qty: 24, price: 110000 }] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editProd, setEditProd] = useState<number | null>(null);
  const [editUnit, setEditUnit] = useState<{ prodId: number; idx: number } | null>(null);
  const [form, setForm] = useState({ product_id: 1, unit_name: 'pack', unit_qty: 10, unit_price: 0 });

  const openAddUnit = (prodId: number) => { setEditProd(prodId); setForm({ product_id: prodId, unit_name: 'pack', unit_qty: 10, unit_price: 0 }); setShowModal(true); };
  const saveUnit = () => {
    if (form.unit_price <= 0) return alert('Harga harus diisi');
    setProducts(prev => prev.map(p => {
      if (p.id !== form.product_id) return p;
      if (editUnit) { p.units[editUnit.idx] = { name: form.unit_name, qty: form.unit_qty, price: form.unit_price }; }
      else { p.units.push({ name: form.unit_name, qty: form.unit_qty, price: form.unit_price }); }
      return { ...p };
    }));
    setShowModal(false); setEditUnit(null);
  };
  const removeUnit = (prodId: number, idx: number) => {
    if (!confirm('Hapus satuan ini?')) return;
    setProducts(prev => prev.map(p => p.id !== prodId ? p : { ...p, units: p.units.filter((_, i) => i !== idx) }));
  };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>📏 Multi Satuan</h1><p className="text-gray-400 text-sm">Atur harga per satuan berbeda untuk setiap produk</p></div></div>

    {products.map(p => <div key={p.id} className="card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{p.name}</h3>
        <button onClick={() => openAddUnit(p.id)} className="btn btn-sm btn-primary">+ Tambah Satuan</button>
      </div>
      <div className="space-y-2">
        {p.units.map((u, i) => <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div><span className="font-medium">{u.name}</span><span className="text-xs text-gray-400 ml-2">= {u.qty} {p.base}</span></div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-emerald-600">Rp {u.price.toLocaleString()}</span>
            <button onClick={() => { setEditProd(p.id); setEditUnit({ prodId: p.id, idx: i }); setForm({ product_id: p.id, unit_name: u.name, unit_qty: u.qty, unit_price: u.price }); setShowModal(true); }} className="text-blue-600 text-sm">Edit</button>
            <button onClick={() => removeUnit(p.id, i)} className="text-red-500 text-sm">Hapus</button>
          </div>
        </div>)}
      </div>
    </div>)}

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editUnit ? '✏️ Edit' : '➕ Tambah'} Multi Satuan</h2>
        <p className="text-gray-400 text-sm mb-4">Tentukan harga untuk satuan yang berbeda.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Produk</label>
            <select className="input-field" value={form.product_id} onChange={e => setForm({...form, product_id: Number(e.target.value)})} disabled={!!editUnit}>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select></div>
          <div><label className="block text-sm font-medium mb-1">Nama Satuan</label>
            <input className="input-field" placeholder="pack, dus, karton, lusin" value={form.unit_name} onChange={e => setForm({...form, unit_name: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium mb-1">Isi (dalam satuan dasar)</label>
              <input type="number" className="input-field" placeholder="Contoh: 10" value={form.unit_qty} onChange={e => setForm({...form, unit_qty: Number(e.target.value)})} /></div>
            <div><label className="block text-sm font-medium mb-1">Harga Satuan <span className="text-red-500">*</span></label>
              <input type="number" className="input-field" placeholder="Contoh: 32000" value={form.unit_price || ''} onChange={e => setForm({...form, unit_price: Number(e.target.value)})} /></div>
          </div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={saveUnit} className="flex-1 btn-primary">{editUnit ? '💾 Simpan' : '✅ Tambah'}</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
