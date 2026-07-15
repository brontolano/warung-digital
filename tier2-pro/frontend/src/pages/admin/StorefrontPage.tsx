import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function StorefrontPage() {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    nama: 'Den Ana Brontolano Retail', deskripsi: 'Toko terdekat, harga terbaik!',
    jam_buka: '07:00', jam_tutup: '21:00', wa: '628123456789', alamat: 'Jl. Merdeka No. 123, Kota',
  });

  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>🏪 Pengaturan Toko Online</h1><p className="text-gray-400 text-sm">Atur tampilan landing page publik</p></div>
      <button onClick={() => setEdit(!edit)} className={`btn ${edit ? 'btn-secondary' : 'btn-primary'}`}>
        {edit ? '🔒 Selesai Edit' : '✏️ Edit Toko'}
      </button>
    </div>

    <div className="card">
      <h2 className="font-bold mb-4">Informasi Toko</h2>
      {edit ? (
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama Toko <span className="text-red-500">*</span></label>
            <input className="input-field" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} placeholder="Nama toko Anda" /></div>
          <div><label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea className="input-field" rows={2} value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} placeholder="Tentang toko Anda" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium mb-1">Jam Buka</label><input type="time" className="input-field" value={form.jam_buka} onChange={e => setForm({...form, jam_buka: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Jam Tutup</label><input type="time" className="input-field" value={form.jam_tutup} onChange={e => setForm({...form, jam_tutup: e.target.value})} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">WhatsApp Bisnis</label>
            <input className="input-field" placeholder="628123456789" value={form.wa} onChange={e => setForm({...form, wa: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Alamat</label>
            <textarea className="input-field" rows={2} value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} placeholder="Alamat lengkap toko" /></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card"><p className="text-xs text-gray-400">Nama Toko</p><p className="font-bold text-emerald-600">{form.nama}</p></div>
          <div className="card"><p className="text-xs text-gray-400">Status</p><p className="font-bold text-green-600">✅ Online</p></div>
          <div className="card"><p className="text-xs text-gray-400">WhatsApp</p><p className="font-medium">{form.wa}</p></div>
          <div className="card"><p className="text-xs text-gray-400">Jam Operasional</p><p className="font-medium">{form.jam_buka} - {form.jam_tutup} WIB</p></div>
          <div className="card"><p className="text-xs text-gray-400">Alamat</p><p className="font-medium">{form.alamat}</p></div>
          <div className="card"><p className="text-xs text-gray-400">Metode Bayar</p><p className="font-medium">COD, Transfer</p></div>
        </div>
      )}
    </div>

    <div className="card">
      <h2 className="font-bold mb-3">🔗 Link Cepat</h2>
      <div className="flex flex-wrap gap-2">
        <a href="/" target="_blank" className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-200">🏠 Buka Toko →</a>
        <a href="/products" target="_blank" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-200">📋 Lihat Katalog →</a>
        <a href="/orders/track" target="_blank" className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-200">📦 Tracking Order →</a>
      </div>
    </div>
  </div></AdminLayout>;
}
