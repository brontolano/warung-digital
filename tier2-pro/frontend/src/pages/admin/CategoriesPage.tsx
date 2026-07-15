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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50" onClick={() => setShowModal(false)}>
            <div className="bg-white w-full max-w-lg rounded-t-2xl p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Kategori</h2>
              <div className="space-y-3">
                <input className="input-field" placeholder="Nama Kategori" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <div className="flex gap-2 flex-wrap">
                  {['📦', '🍜', '🥤', '🫙', '🚬', '🧼', '✏️', '🍬', '🥫', '🧴', '📚', '🧸'].map(icon => (
                    <button key={icon} onClick={() => setForm({ ...form, icon })} className={`text-2xl p-2 rounded-lg ${form.icon === icon ? 'bg-green-100 ring-2 ring-green-500' : 'bg-gray-100'}`}>{icon}</button>
                  ))}
                </div>
                <div className="flex gap-2"><button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-3 rounded-lg">Batal</button>
                  <button onClick={save} className="flex-1 bg-green-600 text-white py-3 rounded-lg">Simpan</button></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
