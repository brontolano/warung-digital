import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { exportCSV } from '../../utils/export';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier A — Sembako Makmur', contact: 'Hadi', phone: '628123456789', products: 'Beras, Gula, Minyak', totalOrder: 4500000, status: 'Aktif' },
    { id: 2, name: 'Supplier B — Minuman Segar', contact: 'Rina', phone: '628555123456', products: 'Aqua, Teh, Kopi', totalOrder: 2800000, status: 'Aktif' },
    { id: 3, name: 'Supplier C — Rokok & Sembako', contact: 'Dedi', phone: '628777888999', products: 'Rokok, Sabun', totalOrder: 1200000, status: 'Tidak Aktif' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', contact: '', phone: '', products: '' });

  const save = () => {
    if (!form.name) return alert('Nama supplier harus diisi');
    if (editId) { setSuppliers(prev => prev.map(s => s.id === editId ? { ...s, name: form.name, contact: form.contact, phone: form.phone, products: form.products } : s)); }
    else { setSuppliers(prev => [...prev, { id: Date.now(), name: form.name, contact: form.contact, phone: form.phone, products: form.products, totalOrder: 0, status: 'Aktif' }]); }
    setShowModal(false); setEditId(null); setForm({ name: '', contact: '', phone: '', products: '' });
  };
  const remove = (id: number) => { if (confirm('Yakin hapus supplier ini?')) setSuppliers(prev => prev.filter(s => s.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🚚 Manajemen Supplier</h1><p className="text-gray-400 text-sm">{suppliers.length} supplier terdaftar</p></div>
      <div className="flex gap-2">
        <button onClick={() => exportCSV(suppliers.map(s => ({...s, totalOrder: Number(s.totalOrder)})), 'supplier')} className="btn btn-sm btn-secondary">📥 Export</button>
        <button onClick={() => { setEditId(null); setForm({name:'',contact:'',phone:'',products:''}); setShowModal(true); }} className="btn-primary">+ Tambah</button>
      </div></div>
    <div className="table-wrap"><table id="supplier-table"><thead><tr><th>Nama Supplier</th><th>Kontak</th><th>Telepon</th><th>Produk</th><th>Total Order</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody>{suppliers.map(s => <tr key={s.id}>
      <td className="font-medium">{s.name}</td><td>{s.contact}</td>
      <td className="font-mono text-sm">{s.phone}</td>
      <td className="text-sm">{s.products}</td>
      <td className="font-semibold">Rp {s.totalOrder.toLocaleString()}</td>
      <td><span className={`badge ${s.status === 'Aktif' ? 'badge-green' : 'badge-red'}`}>{s.status}</span></td>
      <td><div className="flex gap-1">
        <button onClick={() => { setEditId(s.id); setForm({name:s.name,contact:s.contact,phone:s.phone,products:s.products}); setShowModal(true); }} className="btn btn-sm btn-secondary">Edit</button>
        <button onClick={() => remove(s.id)} className="btn btn-sm btn-danger">Hapus</button>
      </div></td>
    </tr>)}</tbody></table></div>

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '🚚 Tambah'} Supplier</h2>
        <p className="text-gray-400 text-sm mb-4">Kelola pemasok barang untuk toko Anda.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama Supplier <span className="text-red-500">*</span></label><input className="input-field" placeholder="Contoh: Sembako Makmur" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Kontak Person</label><input className="input-field" placeholder="Nama orang yang bisa dihubungi" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">No. Telepon / WhatsApp</label><input className="input-field" placeholder="628..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Jenis Produk</label><input className="input-field" placeholder="Contoh: Beras, Gula, Minyak" value={form.products} onChange={e => setForm({...form, products: e.target.value})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan' : '✅ Tambah'}</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
