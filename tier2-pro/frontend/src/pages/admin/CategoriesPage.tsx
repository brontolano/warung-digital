import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

const defaultCategories = [
  { id: 'cat-1', name: 'Makanan Ringan', icon: '🍜', count: 12 },
  { id: 'cat-2', name: 'Minuman', icon: '🥤', count: 8 },
  { id: 'cat-3', name: 'Sembako', icon: '🫙', count: 15 },
  { id: 'cat-4', name: 'Rokok', icon: '🚬', count: 5 },
  { id: 'cat-5', name: 'Kebersihan', icon: '🧼', count: 7 },
  { id: 'cat-6', name: 'Alat Tulis', icon: '✏️', count: 4 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(defaultCategories);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', icon: '📦' });

  const save = () => {
    if (!form.name) return alert('Nama kategori harus diisi');
    if (editId) {
      setCategories(prev => prev.map(c => c.id === editId ? { ...c, name: form.name, icon: form.icon } : c));
    } else {
      setCategories(prev => [...prev, { id: 'cat-' + Date.now(), name: form.name, icon: form.icon, count: 0 }]);
    }
    setShowModal(false); setEditId(null); setForm({ name: '', icon: '📦' });
  };

  const remove = (id: string) => {
    if (!confirm('Yakin hapus kategori ini?')) return;
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">📂 Kategori Produk</h1>
          <button onClick={() => { setEditId(null); setForm({ name: '', icon: '📦' }); setShowModal(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg">+ Tambah</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(kat => (
            <div key={kat.id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{kat.icon}</div>
              <h3 className="font-bold">{kat.name}</h3>
              <p className="text-xs text-gray-400">{kat.count} produk</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setEditId(kat.id); setForm({ name: kat.name, icon: kat.icon }); setShowModal(true); }} className="text-blue-600 text-xs">Edit</button>
                <button onClick={() => remove(kat.id)} className="text-red-600 text-xs">Hapus</button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit Kategori' : '📂 Tambah Kategori'}</h2>
              <p className="text-gray-400 text-sm mb-4">{editId ? 'Perbarui nama dan ikon kategori.' : 'Buat kategori baru untuk mengelompokkan produk.'}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori <span className="text-red-500">*</span></label>
                  <input className="input-field" placeholder="Contoh: Makanan Ringan, Minuman, Sembako" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <p className="text-xs text-gray-400 mt-0.5">Nama kelompok produk yang mudah dipahami (misal: Makanan, Minuman, Rokok)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ikon Kategori</label>
                  <div className="flex gap-2 flex-wrap">
                    {['📦', '🍜', '🥤', '🫙', '🚬', '🧼', '✏️', '🍬', '🥫', '🧴', '📚', '🧸', '👕', '🔧', '🎮', '🪴'].map(icon => (
                      <button key={icon} onClick={() => setForm({ ...form, icon })} className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.icon === icon ? 'bg-emerald-100 ring-2 ring-emerald-500 scale-110' : 'bg-gray-100 hover:bg-gray-200'}`}>{icon}</button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Pilih ikon yang mewakili kategori ini (akan muncul di toko online)</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
                  <button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan' : '✅ Tambah Kategori'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
