import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';

declare const Html5Qrcode: any;

export default function POSPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => {});
  }, []);

  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(x => x.product_id === p.product_id);
      if (exist) return prev.map(x => x.product_id === p.product_id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { product_id: p.product_id, name: p.name, price: p.sell_price || 0, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const startScanner = () => {
    setShowScanner(true);
    setTimeout(() => {
      if (document.getElementById('reader')) {
        scannerRef.current = new Html5Qrcode('reader');
        scannerRef.current.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 250, height: 150 } },
          (code: string) => {
            const p = products.find(x => x.barcode === code);
            if (p) { addToCart(p); setShowScanner(false); scannerRef.current?.stop(); }
            else { alert('Barcode tidak ditemukan'); }
          }, () => {});
      }
    }, 500);
  };

  const checkout = async () => {
    if (cart.length === 0) return alert('Keranjang kosong!');
    try {
      const r = await api.post('/transactions', { store_id: 'default', items: cart.map(x => ({ product_id: x.product_id, qty: x.qty, unit_price: x.price })) });
      if (r.data.success) { alert(`Transaksi berhasil! Total: Rp ${total.toLocaleString()}`); setCart([]); }
    } catch (e: any) { alert(e.response?.data?.message || 'Gagal simpan transaksi'); }
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">💰 POS Kasir</h1>

        {/* Search + Scan */}
        <div className="flex gap-2">
          <input className="flex-1 input-field" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={startScanner} className="bg-gray-200 px-4 rounded-xl text-2xl">📷</button>
        </div>

        {showScanner && <div id="reader" className="w-full max-w-sm mx-auto" />}

        {/* Search Results */}
        {search && <div className="bg-white rounded-xl shadow max-h-48 overflow-y-auto">
          {filtered.slice(0, 10).map(p => (
            <div key={p.product_id} className="p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between" onClick={() => addToCart(p)}>
              <span className="font-medium">{p.name}</span>
              <span className="text-green-600 font-medium">Rp {Number(p.sell_price).toLocaleString()}</span>
            </div>
          ))}
        </div>}

        {/* Cart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-3">Keranjang ({cart.length})</h2>
          {cart.length === 0 ? <p className="text-gray-400 text-sm text-center py-4">Belum ada item</p> : (
            <div className="space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b">
                  <div><p className="font-medium">{item.name}</p><p className="text-sm text-gray-500">x{item.qty}</p></div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">Rp {(item.price * item.qty).toLocaleString()}</span>
                    <button onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <div className="border-t pt-3 mt-3 space-y-3">
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-green-600">Rp {total.toLocaleString()}</span></div>
              <button onClick={checkout} className="btn-primary w-full">💾 Simpan Transaksi</button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

