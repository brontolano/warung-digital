import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function LinktokoPage() {
  const links = [
    { platform: 'WhatsApp', icon: '📞', url: 'https://wa.me/628123456789', color: 'bg-green-100 text-green-700' },
    { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/denana', color: 'bg-pink-100 text-pink-700' },
    { platform: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@denana', color: 'bg-gray-100 text-gray-800' },
    { platform: 'Shopee', icon: '🛍️', url: 'https://shopee.co.id/denana', color: 'bg-orange-100 text-orange-700' },
    { platform: 'Tokopedia', icon: '🟢', url: 'https://tokopedia.com/denana', color: 'bg-green-100 text-green-800' },
    { platform: 'Google Maps', icon: '🗺️', url: 'https://maps.google.com/?q=Den+Ana', color: 'bg-blue-100 text-blue-700' },
  ];
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>🔗 Linktoko</h1><p className="text-gray-400 text-sm">Bagikan semua link toko dalam satu halaman</p></div><button className="btn-primary">📋 Salin Link</button></div>
    <div className="card">
      <div className="text-center mb-6"><div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">D</div>
        <h2 className="font-bold text-xl mt-2">Den Ana Brontolano</h2>
        <p className="text-gray-400 text-sm">🛒 Toko Online · ⏰ 07:00-21:00</p>
        <div className="inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm mt-2">📋 link.denana.id/brontolano</div>
      </div>
      <div className="space-y-2">{links.map((l, i) => (
        <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${l.color}`}>
          <div className="flex items-center gap-3"><span className="text-xl">{l.icon}</span><span className="font-medium">{l.platform}</span></div>
          <div className="flex gap-2"><button className="text-xs underline">Edit</button><button className="text-xs opacity-50">⋮⋮</button></div>
        </div>
      ))}</div>
    </div>
  </div></AdminLayout>;
}
