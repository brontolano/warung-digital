import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function LinktokoPage() {
  const [links, setLinks] = useState([
    { platform: 'WhatsApp', icon: '📞', url: 'https://wa.me/628123456789', active: true },
    { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/denana', active: true },
    { platform: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@denana', active: true },
    { platform: 'Shopee', icon: '🛍️', url: 'https://shopee.co.id/denana', active: false },
    { platform: 'Google Maps', icon: '🗺️', url: 'https://maps.google.com/?q=Den+Ana', active: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ platform: '', icon: '🔗', url: '' });

  const save = () => {
    if (!form.platform || !form.url) return alert('Nama & URL harus diisi');
    if (editIdx !== null) { setLinks(prev => prev.map((l, i) => i === editIdx ? { ...l, platform: form.platform, icon: form.icon, url: form.url } : l)); }
    else { setLinks(prev => [...prev, { platform: form.platform, icon: form.icon, url: form.url, active: true }]); }
    setShowModal(false); setEditIdx(null);
  };
  const remove = (idx: number) => { if (confirm('Yakin hapus link ini?')) setLinks(prev => prev.filter((_, i) => i !== idx)); };
  const toggle = (idx: number) => { setLinks(prev => prev.map((l, i) => i === idx ? { ...l, active: !l.active } : l)); };

  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>🔗 Linktoko</h1><p className="text-gray-400 text-sm">Bagikan semua link toko dalam satu halaman</p></div>
      <button onClick={() => { setEditIdx(null); setForm({platform:'',icon:'🔗',url:''}); setShowModal(true); }} className="btn-primary">+ Tambah Link</button></div>
    <div className="card">
      <div className="text-center mb-6"><div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">D</div>
        <h2 className="font-bold text-xl mt-2">Den Ana Brontolano</h2>
        <p className="text-gray-400 text-sm">🛒 Toko Online · ⏰ 07:00-21:00</p>
        <div className="inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm mt-2">📋 link.denana.id/brontolano</div>
      </div>
      <div className="space-y-2">
        {links.map((l, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-xl transition-all ${l.active ? 'bg-emerald-50' : 'bg-gray-50 opacity-60'}`}>
            <div className="flex items-center gap-3"><span className="text-xl">{l.icon}</span>
              <div><span className="font-medium">{l.platform}</span><p className="text-xs text-gray-400 truncate max-w-[200px]">{l.url}</p></div></div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggle(i)} className="text-sm">{l.active ? '🟢' : '⚪'}</button>
              <button onClick={() => { setEditIdx(i); setForm({platform:l.platform, icon:l.icon, url:l.url}); setShowModal(true); }} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => remove(i)} className="text-red-500 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editIdx !== null ? '✏️ Edit' : '➕ Tambah'} Link</h2>
        <p className="text-gray-400 text-sm mb-4">Tambahkan link ke sosial media atau marketplace.</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Platform</label>
            <select className="input-field" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
              <option value="">— Pilih Platform —</option>
              <option>WhatsApp</option><option>Instagram</option><option>TikTok</option><option>Shopee</option>
              <option>Tokopedia</option><option>Lazada</option><option>Google Maps</option><option>Facebook</option><option>Youtube</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Ikon</label>
            <input className="input-field" placeholder="📞 atau 🔗" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">URL <span className="text-red-500">*</span></label>
            <input className="input-field" placeholder="https://..." value={form.url} onChange={e => setForm({...form, url: e.target.value})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={save} className="flex-1 btn-primary">💾 Simpan</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
