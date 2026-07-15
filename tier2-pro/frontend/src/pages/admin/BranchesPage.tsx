import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function BranchesPage() {
  const [branches, setBranches] = useState([
    { id: 1, name: 'Pusat', address: 'Jl. Merdeka No. 123', phone: '628111', status: 'Aktif', sync: '2 menit lalu', products: 120 },
    { id: 2, name: 'Cabang Malang', address: 'Jl. Soekarno Hatta No. 45', phone: '628222', status: 'Aktif', sync: '5 menit lalu', products: 85 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const save = () => {
    if (!form.name) return alert('Nama cabang harus diisi');
    if (editId) setBranches(prev => prev.map(b => b.id === editId ? { ...b, name: form.name, address: form.address, phone: form.phone } : b));
    else setBranches(prev => [...prev, { id: Date.now(), name: form.name, address: form.address, phone: form.phone, status: 'Aktif', sync: 'Baru saja', products: 0 }]);
    setShowModal(false); setEditId(null);
  };
  const remove = (id: number) => { if (confirm('Yakin hapus cabang ini?')) setBranches(prev => prev.filter(b => b.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🏢 Kelola Cabang</h1><p className="text-gray-400 text-sm">{branches.length} cabang terdaftar</p></div>
      <button onClick={() => { setEditId(null); setForm({name:'',address:'',phone:''}); setShowModal(true); }} className="btn-primary">+ Tambah Cabang</button></div>
    <div className="grid md:grid-cols-2 gap-4">
      {branches.map(b => <div key={b.id} className="card border-2 border-emerald-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">🏪</div>
            <div><h3 className="font-bold">{b.name}</h3><p className="text-xs text-gray-400">{b.address}</p></div>
          </div>
          <span className="badge badge-green">{b.status}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><span className="text-gray-400">Telepon:</span> {b.phone}</p>
          <p><span className="text-gray-400">Produk:</span> {b.products} item</p>
          <p className="col-span-2"><span className="text-gray-400">Sinkron:</span> {b.sync}</p>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t">
          <button onClick={() => { setEditId(b.id); setForm({name:b.name,address:b.address,phone:b.phone}); setShowModal(true); }} className="btn btn-sm btn-secondary flex-1">✏️ Edit</button>
          <button onClick={() => remove(b.id)} className="btn btn-sm btn-danger">Hapus</button>
        </div>
      </div>)}
    </div>

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '🏢 Tambah'} Cabang</h2>
        <p className="text-gray-400 text-sm mb-4">Kelola cabang toko Anda dalam satu akun.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama Cabang <span className="text-red-500">*</span></label>
            <input className="input-field" placeholder="Contoh: Cabang Malang" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Alamat</label>
            <textarea className="input-field" rows={2} placeholder="Alamat lengkap cabang" value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input className="input-field" placeholder="628..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan' : '✅ Tambah'}</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
