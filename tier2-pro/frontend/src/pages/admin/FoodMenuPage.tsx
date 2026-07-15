import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function FoodMenuPage() {
  const [menus, setMenus] = useState([
    { id: 1, name: 'Nasi Goreng', price: 25000, category: 'Makanan', desc: 'Nasi goreng spesial + telur', sales: 45 },
    { id: 2, name: 'Mie Goreng', price: 20000, category: 'Makanan', desc: 'Mie goreng bakso', sales: 38 },
    { id: 3, name: 'Es Teh', price: 5000, category: 'Minuman', desc: 'Teh manis es', sales: 60 },
    { id: 4, name: 'Ayam Geprek', price: 28000, category: 'Makanan', desc: 'Ayam geprek sambal bawang', sales: 22 },
  ]);
  const [tab, setTab] = useState('menus');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', price: 0, category: 'Makanan', desc: '' });

  const save = () => {
    if (!form.name || form.price <= 0) return alert('Nama & harga harus diisi');
    if (editId) setMenus(prev => prev.map(m => m.id === editId ? { ...m, name: form.name, price: form.price, category: form.category, desc: form.desc } : m));
    else setMenus(prev => [...prev, { id: Date.now(), name: form.name, price: form.price, category: form.category, desc: form.desc, sales: 0 }]);
    setShowModal(false); setEditId(null);
  };
  const remove = (id: number) => { if (confirm('Yakin hapus?')) setMenus(prev => prev.filter(m => m.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🍽️ Food Menu</h1><p className="text-gray-400 text-sm">Menu QR Self-Order untuk pelanggan</p></div><button onClick={() => { setEditId(null); setForm({name:'',price:0,category:'Makanan',desc:''}); setShowModal(true); }} className="btn-primary">+ Tambah Menu</button></div>
    <div className="flex gap-2 border-b pb-2">{[['menus','📋 Menu'],['qr','📱 QR'],['orders','🛵 Pesanan']].map(([k,label]) => (
      <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === k ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>{label}</button>
    ))}</div>
    {tab === 'menus' && <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {menus.map(m => <div key={m.id} className="card">
        <div className="text-3xl mb-2">🍽️</div><p className="font-bold">{m.name}</p>
        <p className="text-xs text-gray-400">{m.desc}</p>
        <p className="text-emerald-600 font-bold mt-2">Rp {m.price.toLocaleString()}</p>
        <p className="text-xs text-gray-400">{m.sales} terjual</p>
        <div className="flex gap-2 mt-2">
          <button onClick={() => { setEditId(m.id); setForm({name:m.name,price:m.price,category:m.category,desc:m.desc}); setShowModal(true); }} className="btn btn-sm btn-secondary flex-1">Edit</button>
          <button onClick={() => remove(m.id)} className="btn btn-sm btn-danger">Hapus</button>
        </div>
      </div>)}
    </div>}
    {tab === 'qr' && <div className="card text-center py-8"><div className="text-6xl mb-4">📱</div>
      <p className="text-lg font-bold">QR Code Meja</p><p className="text-sm text-gray-400 mb-4">Pelanggan scan untuk lihat menu & pesan dari HP</p>
      <div className="flex gap-2 justify-center"><button className="btn-primary">🖨️ Cetak QR Meja 1</button><button className="btn-secondary">🖨️ Cetak Semua</button></div>
    </div>}
    {tab === 'orders' && <div className="card"><p className="text-center py-8 text-gray-400">Tidak ada pesanan masuk saat ini.</p></div>}

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '🍽️ Tambah'} Menu</h2>
        <p className="text-gray-400 text-sm mb-4">Tambah menu makanan/minuman untuk self-order.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama Menu <span className="text-red-500">*</span></label><input className="input-field" placeholder="Nasi Goreng, Es Teh, dll" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium mb-1">Kategori</label><select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option>Makanan</option><option>Minuman</option><option>Snack</option><option>Paket</option></select></div>
            <div><label className="block text-sm font-medium mb-1">Harga <span className="text-red-500">*</span></label><input type="number" className="input-field" placeholder="25000" value={form.price || ''} onChange={e => setForm({...form, price: Number(e.target.value)})} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Deskripsi</label><textarea className="input-field" rows={2} placeholder="Bahan, porsi, dll" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={save} className="flex-1 btn-primary">💾 Simpan</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
