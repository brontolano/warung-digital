import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrackOrder() {
  const [wa, setWa] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const track = () => {
    if (!wa) return alert('Masukkan nomor WA');
    // In production, POST /storefront/orders/track with { customer_wa: wa }
    setOrders([
      { order_id: 'ORD-001', total: 50000, status: 'confirmed', date: '2026-07-14', items: 'Indomie Goreng x10, Aqua x2' },
    ]);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="text-white no-underline"><h1 className="text-lg font-bold">🏪 Den Ana</h1></Link>
        </div>
      </header>
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <h2 className="font-bold text-xl">📦 Lacak Pesanan</h2>
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <p className="text-gray-500 text-sm">Masukkan nomor WhatsApp kamu untuk melihat status pesanan.</p>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base" type="tel" placeholder="628123456789" value={wa} onChange={e => setWa(e.target.value)} />
          <button onClick={track} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Lacak Pesanan</button>
        </div>

        {searched && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400">
                <p className="text-4xl mb-2">🔍</p>
                <p>Pesanan tidak ditemukan.</p>
              </div>
            ) : orders.map(o => (
              <div key={o.order_id} className="bg-white rounded-2xl shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="font-bold">#{o.order_id}</p><p className="text-xs text-gray-400">{o.date}</p></div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : o.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {o.status === 'pending' ? '⏳ Pending' : o.status === 'confirmed' ? '✅ Dikonfirmasi' : o.status === 'delivered' ? '📦 Diterima' : o.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{o.items}</p>
                <p className="font-bold mt-2">Rp {Number(o.total).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

