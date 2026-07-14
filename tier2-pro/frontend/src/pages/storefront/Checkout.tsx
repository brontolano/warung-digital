import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../contexts/AuthContext';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [wa, setWa] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const productId = searchParams.get('product');
  const qty = Number(searchParams.get('qty')) || 1;

  const checkout = async () => {
    if (!name || !wa) return alert('Nama dan nomor WA harus diisi');
    setSubmitting(true);
    try {
      await api.post('/storefront/demo/checkout', {
        customer_name: name,
        customer_wa: wa,
        delivery_address: address,
        items: [{ product_id: productId || '1', qty }],
      });
      alert('Pesanan berhasil! Admin akan menghubungi via WhatsApp.');
      navigate('/orders/track');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Gagal checkout');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold">📝 Checkout</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h3 className="font-bold">Data Pemesan</h3>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base" placeholder="Nama Lengkap *" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base" placeholder="Nomor WhatsApp *" type="tel" value={wa} onChange={e => setWa(e.target.value)} />
          <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base resize-none" rows={3} placeholder="Alamat pengiriman" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold mb-2">Metode Pembayaran</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-500">
              <input type="radio" name="payment" defaultChecked className="accent-green-600" />
              <div><span className="font-medium">Cash on Delivery (COD)</span><p className="text-xs text-gray-500">Bayar saat barang diterima</p></div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
              <input type="radio" name="payment" disabled className="accent-green-600" />
              <div><span className="font-medium text-gray-400">QRIS</span><p className="text-xs text-gray-400">Segera hadir</p></div>
            </label>
          </div>
        </div>

        <button onClick={checkout} disabled={submitting}
          className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-bold disabled:opacity-50">
          {submitting ? 'Memproses...' : '✅ Pesan Sekarang'}
        </button>
      </div>
    </div>
  );
}

