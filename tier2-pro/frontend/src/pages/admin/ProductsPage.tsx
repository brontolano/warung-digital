import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { api } from '../contexts/AuthContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs' });

  const loadProducts = () => api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => {});

  useEffect(() => { loadProducts(); }, []);

  const save = async () => {
    try {
      if (editId) await api.put(`/products/${editId}`, form);
      else await api.post('/products', { ...form, store_id: 'default' });
      setShowModal(false); setEditId(null); loadProducts();
    } catch (e: any) { alert(e.response?.data?.message || 'Gagal'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Yakin hapus?')) return;
    await api.delete(`/products/${id}`); loadProducts();
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">📦 Produk</h1>
          <button onClick={() => { setEditId(null); setForm({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs' }); setShowModal(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg">+ Tambah</button>
        </div>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>{['Nama', 'Harga Jual', 'Stok', 'Min', 'Satuan', 'Aksi'].map(h => <th key={h} className="p-3 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.product_id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 font-medium">Rp {Number(p.sell_price).toLocaleString()}</td>
                  <td className={`p-3 ${p.stock <= p.min_stock ? 'text-red-600 font-bold' : ''}`}>{p.stock}</td>
                  <td className="p-3">{p.min_stock}</td>
                  <td className="p-3">{p.unit}</td>
                  <td className="p-3">
                    <button onClick={() => { setEditId(p.product_id); setForm(p); setShowModal(true); }} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => remove(p.product_id)} className="text-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg rounded-t-2xl p-6 max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Tambah'} Produk</h2>
            <div className="space-y-3">
              <input className="input-field" placeholder="Nama *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="input-field" placeholder="Barcode" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
              <div className="flex gap-2"><input className="flex-1 input-field" type="number" placeholder="Harga Beli" value={form.purchase_price} onChange={e => setForm({ ...form, purchase_price: Number(e.target.value) })} />
                <input className="flex-1 input-field" type="number" placeholder="Harga Jual *" value={form.sell_price} onChange={e => setForm({ ...form, sell_price: Number(e.target.value) })} /></div>
              <div className="flex gap-2"><input className="flex-1 input-field" type="number" placeholder="Stok" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
                <input className="flex-1 input-field" type="number" placeholder="Min Stok" value={form.min_stock} onChange={e => setForm({ ...form, min_stock: Number(e.target.value) })} /></div>
              <select className="input-field" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                <option value="pcs">pcs</option><option value="pack">pack</option><option value="dus">dus</option><option value="kg">kg</option>
              </select>
              <div className="flex gap-2"><button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-3 rounded-lg">Batal</button>
                <button onClick={save} className="flex-1 bg-green-600 text-white py-3 rounded-lg">Simpan</button></div>
            </div>
          </div>
        </div>}
      </div>
    </AdminLayout>
  );
}
