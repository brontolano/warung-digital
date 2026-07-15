import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const demoProducts = [
  { id: '1', name: 'Indomie Goreng', price: 3500, image: '🍜', category: 'Makanan' },
  { id: '2', name: 'Indomie Kuah', price: 3500, image: '🍜', category: 'Makanan' },
  { id: '3', name: 'Aqua 600ml', price: 5000, image: '💧', category: 'Minuman' },
  { id: '4', name: 'Teh Botol', price: 8000, image: '🍵', category: 'Minuman' },
  { id: '5', name: 'Rokok Mild', price: 25000, image: '🚬', category: 'Lainnya' },
  { id: '6', name: 'Sabun Lifebuoy', price: 3000, image: '🧼', category: 'Kebersihan' },
  { id: '7', name: 'Gula Pasir 1kg', price: 15000, image: '🍬', category: 'Sembako' },
  { id: '8', name: 'Minyak Goreng 1L', price: 18000, image: '🫒', category: 'Sembako' },
  { id: '9', name: 'Kopi Sachet', price: 2000, image: '☕', category: 'Minuman' },
  { id: '10', name: 'Mie Gelas', price: 1500, image: '🥤', category: 'Makanan' },
];

const categories = ['Semua', 'Makanan', 'Minuman', 'Sembako', 'Kebersihan', 'Lainnya'];

export default function Home() {
  const [cat, setCat] = useState('Semua');
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const filtered = demoProducts.filter(p => {
    const matchCat = cat === 'Semua' || p.category === cat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(x => x.id === p.id);
      if (exist) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const totalCart = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">D</div>
            <div><h1 className="font-bold text-gray-900">Den Ana</h1><p className="text-[0.6rem] text-gray-400 -mt-0.5">Brontolano Retail</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCart(!showCart)} className="relative">
              <span className="text-2xl">🛒</span>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[0.6rem] rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </button>
            <Link to="/orders/track" className="text-sm text-gray-500 hover:text-emerald-600">📦 Lacak</Link>
            <Link to="/admin/login" className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium">Admin</Link>
          </div>
        </div>
        {/* Search */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-80">🏪 Toko Terdekat, Harga Terbaik!</p>
          <h2 className="text-2xl font-bold mt-1">Den Ana Brontolano</h2>
          <p className="text-emerald-100 text-sm mt-1">Buka 07:00 - 21:00 WIB • Gratis Ongkos Kirim</p>
          <div className="flex gap-2 mt-4">
            <a href="https://wa.me/628123456789" target="_blank" className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors">📞 Chat WA</a>
            <Link to="/products" className="bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors">🛍️ Belanja</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === c ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
              }`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-4xl mx-auto px-4 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-28 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">{p.image}</div>
              <div className="p-3">
                <p className="text-[0.6rem] text-gray-400 uppercase tracking-wider">{p.category}</p>
                <p className="font-semibold text-sm mt-0.5">{p.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-emerald-600 font-bold">Rp {p.price.toLocaleString()}</p>
                  <button onClick={() => addCart(p)} className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-lg font-bold">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-16 text-gray-400"><p className="text-5xl mb-3">🔍</p><p>Produk tidak ditemukan</p></div>}
      </section>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50" onClick={() => setShowCart(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">🛒 Keranjang</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Keranjang masih kosong</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <div><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-gray-400">{item.qty} x Rp {item.price.toLocaleString()}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Rp {(item.price * item.qty).toLocaleString()}</span>
                      <button onClick={() => { setCart(prev => prev.filter((_, idx) => idx !== i)); }} className="text-red-400 hover:text-red-600">✕</button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg mb-3"><span>Total</span><span className="text-emerald-600">Rp {totalCart.toLocaleString()}</span></div>
                  <Link to={`/checkout?items=${encodeURIComponent(JSON.stringify(cart))}`}
                    className="block w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">✅ Pesan Sekarang</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8 py-6 text-center text-sm text-gray-400">
        <p className="font-medium text-gray-600">Den Ana Brontolano Retail</p>
        <p>Jl. Merdeka No. 123 • 07:00 - 21:00 WIB</p>
        <p className="mt-2 text-xs opacity-50">Powered by WarungDigital</p>
      </footer>
    </div>
  );
}
