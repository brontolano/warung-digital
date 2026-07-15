import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

declare const Html5Qrcode: any;

export default function POSPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [customer, setCustomer] = useState({ name: '', wa: '' });
  const [paymentMethod, setPaymentMethod] = useState('tunai');
  const [tab, setTab] = useState<'kasir' | 'riwayat'>('kasir');

  const [transactions, setTransactions] = useState([
    { id: 'TRX-001', date: '14/07 19:30', total: 35000, items: 3, method: 'Tunai', customer: 'Budi' },
    { id: 'TRX-002', date: '14/07 18:15', total: 12500, items: 2, method: 'QRIS', customer: 'Siti' },
    { id: 'TRX-003', date: '14/07 17:00', total: 78000, items: 5, method: 'Tunai', customer: '' },
  ]);

  useEffect(() => { api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => {}); }, []);

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(x => x.product_id === p.product_id);
      if (exist) return prev.map(x => x.product_id === p.product_id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { product_id: p.product_id, name: p.name, price: p.sell_price || 0, qty: 1 }];
    });
    setSearch('');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = async () => {
    if (cart.length === 0) return alert('Keranjang kosong!');
    const items = cart.map(x => ({ product_id: x.product_id, qty: x.qty, unit_price: x.price }));
    try {
      const r = await api.post('/transactions', { store_id: 'default', customer_name: customer.name, customer_wa: customer.wa, items });
      if (r.data.success) {
        setTransactions(prev => [{ id: `TRX-${String(Date.now()).slice(-3)}`, date: new Date().toLocaleString('id-ID'), total, items: cart.length, method: paymentMethod, customer: customer.name || '-' }, ...prev]);
        alert(`Transaksi berhasil! Total: Rp ${total.toLocaleString()}`);
        setCart([]); setCustomer({ name: '', wa: '' }); setPaymentMethod('tunai');
      }
    } catch (e: any) { alert(e.response?.data?.message || 'Gagal simpan transaksi'); }
  };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    {/* Tab switcher */}
    <div className="flex gap-2 border-b pb-2">
      <button onClick={() => setTab('kasir')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'kasir' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>🛒 Kasir</button>
      <button onClick={() => setTab('riwayat')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'riwayat' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>🕐 Riwayat</button>
    </div>

    {tab === 'kasir' && <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        {/* Search + Scan */}
        <div className="flex gap-2">
          <input className="flex-1 input-field" placeholder="🔍 Cari nama atau barcode produk..." value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={() => setShowScanner(!showScanner)} className="btn-secondary px-4">📷</button>
        </div>
        {showScanner && <div className="bg-white rounded-xl p-4"><div id="reader" className="w-full max-w-sm mx-auto" /></div>}
        {search && filtered.length > 0 && <div className="bg-white rounded-xl shadow max-h-48 overflow-y-auto">
          {filtered.slice(0, 10).map(p => (
            <div key={p.product_id} className="p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between" onClick={() => addToCart(p)}>
              <span className="font-medium">{p.name}</span>
              <span className="text-emerald-600 font-medium">Rp {Number(p.sell_price || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>}
        {/* Customer info */}
        <div className="bg-white rounded-xl shadow p-3"><p className="text-sm font-medium mb-2">👤 Info Customer (opsional)</p>
          <div className="flex gap-2">
            <input className="input-field text-sm" placeholder="Nama" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
            <input className="input-field text-sm" placeholder="WA" value={customer.wa} onChange={e => setCustomer({...customer, wa: e.target.value})} />
          </div></div>
      </div>
      <div className="space-y-4">
        {/* Cart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-bold mb-3">🛒 Keranjang ({cart.length})</h3>
          {cart.length === 0 ? <p className="text-gray-400 text-sm text-center py-6">Belum ada item</p> : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b">
                  <div><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-gray-400">Rp {item.price.toLocaleString()} x {item.qty}</p></div>
                  <div className="flex items-center gap-2"><span className="font-bold">Rp {(item.price * item.qty).toLocaleString()}</span>
                    <button onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Checkout */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-emerald-600">Rp {total.toLocaleString()}</span></div>
          <div><label className="text-sm font-medium block mb-1">Metode Bayar</label>
            <select className="input-field text-sm" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              <option value="tunai">💰 Tunai</option><option value="qris">💳 QRIS</option><option value="transfer">🏦 Transfer</option>
            </select></div>
          <button onClick={checkout} className="btn-primary w-full py-4 text-lg">💾 Simpan Transaksi</button>
        </div>
      </div>
    </div>}

    {tab === 'riwayat' && <div className="card">
      <h3 className="font-bold mb-3">🕐 Riwayat Transaksi Hari Ini</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="py-2">Waktu</th><th>ID</th><th>Customer</th><th>Item</th><th>Total</th><th>Metode</th></tr></thead>
        <tbody>{transactions.map((t, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            <td className="py-2">{t.date}</td><td className="font-mono text-xs">{t.id}</td><td>{t.customer || '-'}</td><td>{t.items} item</td>
            <td className="font-semibold">Rp {t.total.toLocaleString()}</td>
            <td><span className="badge badge-blue">{t.method}</span></td>
          </tr>
        ))}</tbody></table>
        {transactions.length === 0 && <p className="text-center py-6 text-gray-400">Belum ada transaksi hari ini</p>}
      </div>
      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <span className="text-sm font-medium">Total Hari Ini</span>
        <span className="text-xl font-bold text-emerald-600">Rp {transactions.reduce((s, t) => s + t.total, 0).toLocaleString()}</span>
      </div>
    </div>}
  </div></AdminLayout>;
}
