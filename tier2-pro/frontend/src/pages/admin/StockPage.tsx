import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

export default function StockPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [items, setItems] = useState<Record<string, number>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => {}); }, []);

  const startOpname = () => { setShowForm(true); const init: Record<string, number> = {}; products.forEach(p => init[p.product_id] = p.stock || 0); setItems(init); };
  const saveOpname = async () => {
    const data = { store_id: 'default', user_id: 'admin', items: Object.entries(items).map(([product_id, physical_stock]) => ({ product_id, physical_stock: Number(physical_stock) })) };
    try { const r = await api.post('/stock-opname', data); alert(`Stok opname selesai! ID: ${r.data.opname_id}`); setShowForm(false); } catch (e: any) { alert(e.response?.data?.message || 'Gagal'); }
  };

  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">📋 Stok Opname</h1>{!showForm && <button onClick={startOpname} className="bg-green-600 text-white px-4 py-2 rounded-lg">+ Mulai Opname</button>}</div>
    {showForm && <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <h2 className="font-bold">Input Stok Fisik</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">{products.map(p => <div key={p.product_id} className="flex justify-between items-center py-2 border-b"><span className="text-sm">{p.name}<br /><span className="text-gray-400 text-xs">Sistem: {p.stock}</span></span><input type="number" className="w-24 input-field text-center" value={items[p.product_id] || p.stock || 0} onChange={e => setItems({ ...items, [p.product_id]: Number(e.target.value) })} /></div>)}</div>
      <button onClick={saveOpname} className="btn-primary w-full">💾 Simpan Opname</button>
    </div>}
    {!showForm && <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400"><p className="text-4xl mb-2">📋</p><p>Klik "Mulai Opname" untuk mulai stok opname</p></div>}
  </div></AdminLayout>;
}

