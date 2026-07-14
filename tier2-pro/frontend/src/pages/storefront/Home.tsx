import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../contexts/AuthContext';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Demo data — in production, fetch from /storefront/:slug/products
    setProducts([
      { product_id: '1', name: 'Indomie Goreng', sell_price: 3500, image_url: '🍜' },
      { product_id: '2', name: 'Indomie Kuah', sell_price: 3500, image_url: '🍜' },
      { product_id: '3', name: 'Aqua 600ml', sell_price: 5000, image_url: '💧' },
      { product_id: '4', name: 'Teh Botol', sell_price: 8000, image_url: '🍵' },
      { product_id: '5', name: 'Rokok Mild', sell_price: 25000, image_url: '🚬' },
      { product_id: '6', name: 'Sabun Lifebuoy', sell_price: 3000, image_url: '🧼' },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🏪 Den Ana</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">Brontolano Retail</span>
            <Link to="/admin/login" className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-medium">Admin</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-500 to-green-700 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Den Ana Brontolano Retail</h2>
        <p className="text-green-100 mb-4">Toko terdekat, harga terbaik!</p>
        <p className="text-green-200 text-sm">Buka 07:00 - 21:00 WIB</p>
      </section>

      {/* Kategori */}
      <section className="max-w-4xl mx-auto p-4">
        <h3 className="font-bold text-lg mb-3">📂 Kategori</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {['Makanan Ringan', 'Minuman', 'Sembako', 'Rokok', 'Sabun & Kebersihan'].map(kat => (
            <span key={kat} className="flex-shrink-0 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-green-200">{kat}</span>
          ))}
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="max-w-4xl mx-auto p-4">
        <h3 className="font-bold text-lg mb-3">🔥 Produk Unggulan</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {products.map(p => (
            <Link key={p.product_id} to={`/products/${p.product_id}`}
              className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden">
              <div className="bg-gray-100 h-32 flex items-center justify-center text-5xl">{p.image_url}</div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{p.name}</h4>
                <p className="text-green-600 font-bold mt-1">Mulai dari Rp {Number(p.sell_price).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto p-4 pb-8">
        <div className="bg-green-600 rounded-xl p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">📞 Hubungi Kami</p>
          <p className="text-green-100 text-sm mb-3">Chat langsung untuk pemesanan grosir</p>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold">Chat via WhatsApp</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center text-sm">
        <p className="font-bold text-white mb-1">Den Ana Brontolano Retail</p>
        <p>Jl. Merdeka No. 123, Kota</p>
        <p className="mt-2 opacity-50">Powered by WarungDigital</p>
      </footer>
    </div>
  );
}

