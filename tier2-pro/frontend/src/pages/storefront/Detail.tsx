import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Tier { name: string; min_qty: number; price: number; }

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<{ name: string; description: string; image_url: string; price: number; tiers: Tier[] } | null>(null);

  useEffect(() => {
    // Demo — in production, fetch from /storefront/:slug/products/:id
    setProduct({
      name: 'Indomie Goreng',
      description: 'Mie instan goreng rasa original. Cocok untuk ngemil atau makan siang.',
      image_url: '🍜',
      price: 3500,
      tiers: [
        { name: 'HET', min_qty: 1, price: 3500 },
        { name: 'T1', min_qty: 10, price: 3200 },
        { name: 'T2', min_qty: 50, price: 3000 },
        { name: 'T3', min_qty: 100, price: 2800 },
      ],
    });
  }, [id]);

  if (!product) return <div className="p-4 text-center">Memuat...</div>;

  const tier = product.tiers.reduce<Tier | undefined>((best, t) => qty >= t.min_qty ? t : best, undefined);
  const currentPrice = tier ? tier.price : product.price;
  const total = currentPrice * qty;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-white text-2xl">←</Link>
          <h1 className="text-lg font-bold">Detail Produk</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="bg-gray-100 h-48 flex items-center justify-center text-8xl">{product.image_url}</div>
          <div className="p-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
          </div>
        </div>

        {/* Tabel Tier Harga */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold mb-3">💰 Harga (Semakin Banyak, Semakin Murah!)</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b">
              <th className="py-2">Tier</th><th className="text-center">Min Qty</th><th className="text-right">Harga/pcs</th>
            </tr></thead>
            <tbody>
              {product.tiers.map(t => (
                <tr key={t.name} className={`border-b ${qty >= t.min_qty && (!tier || t.min_qty === tier.min_qty) ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                  <td className="py-2">{t.name === 'HET' ? 'Eceran' : `Grosir ${t.name}`}</td>
                  <td className="text-center">{t.min_qty}+</td>
                  <td className="text-right">Rp {Number(t.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Qty Selector */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold mb-3">🛒 Jumlah Beli</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 bg-gray-200 rounded-full text-2xl font-bold flex items-center justify-center">-</button>
            <input type="number" className="w-24 text-center text-2xl font-bold border rounded-lg py-2" value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))} min={1} />
            <button onClick={() => setQty(qty + 1)} className="w-12 h-12 bg-green-600 text-white rounded-full text-2xl font-bold flex items-center justify-center">+</button>
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-500">Harga satuan:</span>
            <span className="text-lg font-bold text-green-600 ml-2">Rp {currentPrice.toLocaleString()}</span>
            {tier && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">{tier.name}</span>}
          </div>
        </div>

        {/* Ringkasan */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-green-600">Rp {total.toLocaleString()}</p>
            </div>
            <button onClick={() => navigate(`/checkout?product=${id}&qty=${qty}`)}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg">Beli Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}

