import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', barcode: '', purchase_price: 0, sell_price: 0,
    stock: 0, min_stock: 5, unit: 'pcs', category_id: '', description: ''
  });

  const loadProducts = () => api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => {});
  const loadCategories = () => api.get('/categories', { params: { store_id: 'default' } }).then(r => setCategories(r.data)).catch(() => {});

  useEffect(() => { loadProducts(); loadCategories(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs', category_id: '', description: '' });
    setShowModal(true);
  };

  const openEdit = (p: any) => {
    setEditId(p.product_id);
    setForm({ name: p.name || '', barcode: p.barcode || '', purchase_price: p.purchase_price || 0, sell_price: p.sell_price || 0, stock: p.stock || 0, min_stock: p.min_stock || 5, unit: p.unit || 'pcs', category_id: p.category_id || '', description: p.description || '' });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name.trim()) return alert('Nama produk harus diisi!');
    if (form.sell_price <= 0) return alert('Harga jual harus lebih dari 0!');
    try {
      if (editId) await api.put(`/products/${editId}`, form);
      else await api.post('/products', { ...form, store_id: 'default' });
      setShowModal(false); setEditId(null); loadProducts();
    } catch (e: any) { alert(e.response?.data?.message || 'Gagal menyimpan produk'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return;
    try { await api.delete(`/products/${id}`); loadProducts(); } catch (e: any) { alert(e.response?.data?.message); }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="page-header">
          <div><h1>📦 Manajemen Produk</h1><p className="text-gray-400 text-sm">{products.length} produk terdaftar</p></div>
          <button onClick={openAdd} className="btn-primary">+ Tambah Produk</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Nama</th><th>Kategori</th><th>Harga Beli</th><th>Harga Jual</th><th>Stok</th><th>Min Stok</th><th>Barcode</th><th>Aksi</th>
            </tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.product_id}>
                  <td><div className="font-medium">{p.name}</div>{p.description && <div className="text-xs text-gray-400">{p.description}</div>}</td>
                  <td><span className="badge badge-green">{p.category_id || 'Tanpa Kategori'}</span></td>
                  <td>Rp {(p.purchase_price || 0).toLocaleString()}</td>
                  <td className="font-semibold">Rp {(p.sell_price || 0).toLocaleString()}</td>
                  <td><span className={`badge ${(p.stock || 0) <= (p.min_stock || 0) ? 'badge-red' : 'badge-green'}`}>{p.stock || 0}</span></td>
                  <td>{p.min_stock || 0}</td>
                  <td className="text-gray-400 font-mono text-sm">{p.barcode || '-'}</td>
                  <td><button onClick={() => openEdit(p)} className="btn btn-sm btn-secondary">Edit</button><button onClick={() => remove(p.product_id)} className="btn btn-sm btn-danger ml-1">Hapus</button></td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan={8} className="text-center py-12 text-gray-400">Belum ada produk. Klik "+ Tambah Produk" untuk memulai.</td></tr>}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit Produk' : '📦 Tambah Produk Baru'}</h2>
              <p className="text-gray-400 text-sm mb-4">{editId ? 'Perbarui data produk yang sudah ada.' : 'Isi data produk baru yang akan dijual.'}</p>

              <div className="space-y-3">
                {/* Nama Produk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk <span className="text-red-500">*</span></label>
                  <input className="input-field" placeholder="Contoh: Indomie Goreng Original" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <p className="text-xs text-gray-400 mt-0.5">Nama produk yang akan ditampilkan di POS dan toko online</p>
                </div>

                {/* Barcode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode (opsional)</label>
                  <input className="input-field" placeholder="Contoh: 8991002100635 (scan dari kemasan)" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
                  <p className="text-xs text-gray-400 mt-0.5">Jika tidak ada barcode, isi dengan manual atau kosongkan</p>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select className="input-field" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                    <option value="">— Pilih Kategori —</option>
                    {categories.map((c: any) => <option key={c.category_id || c.id} value={c.category_id || c.id}>{c.name}</option>)}
                  </select>
                  <p className="text-xs text-gray-400 mt-0.5">Kelompokkan produk agar mudah dicari (contoh: Makanan, Minuman)</p>
                </div>

                {/* Harga Beli & Jual */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga Beli (Modal)</label>
                    <input type="number" className="input-field" placeholder="Contoh: 2500 (per satuan)" value={form.purchase_price || ''} onChange={e => setForm({ ...form, purchase_price: Number(e.target.value) })} />
                    <p className="text-xs text-gray-400 mt-0.5">Berapa harga beli 1 item dari supplier</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga Jual <span className="text-red-500">*</span></label>
                    <input type="number" className="input-field" placeholder="Contoh: 3500 (per satuan)" value={form.sell_price || ''} onChange={e => setForm({ ...form, sell_price: Number(e.target.value) })} />
                    <p className="text-xs text-gray-400 mt-0.5">Harga jual ke pelanggan</p>
                  </div>
                </div>

                {/* Stok & Satuan */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok Saat Ini</label>
                    <input type="number" className="input-field" placeholder="Contoh: 50 (jumlah barang)" value={form.stock || ''} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
                    <p className="text-xs text-gray-400 mt-0.5">Jumlah barang yang ada di toko saat ini</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok Minimum</label>
                    <input type="number" className="input-field" placeholder="Contoh: 5 (sisa minimum)" value={form.min_stock || ''} onChange={e => setForm({ ...form, min_stock: Number(e.target.value) })} />
                    <p className="text-xs text-gray-400 mt-0.5">Peringatan jika stok di bawah angka ini</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Satuan Barang</label>
                  <select className="input-field" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                    <option value="pcs">Pcs (Satuan)</option>
                    <option value="pack">Pack (Bungkus)</option>
                    <option value="dus">Dus (Kardus)</option>
                    <option value="kg">Kilogram</option>
                    <option value="liter">Liter</option>
                    <option value="botol">Botol</option>
                    <option value="kotak">Kotak</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-0.5">Satuan pengukuran barang ini</p>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
                  <textarea className="input-field" rows={2} placeholder="Deskripsi singkat tentang produk ini (misal: warna, ukuran, rasa)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  <p className="text-xs text-gray-400 mt-0.5">Keterangan tambahan yang bisa membantu pelanggan atau karyawan</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
                  <button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan Perubahan' : '✅ Tambah Produk'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
