import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function ReferralPage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto">
    <div className="page-header"><div><h1>🎁 Program Referral</h1><p className="text-gray-400 text-sm">Ajak teman, dapatkan keuntungan!</p></div></div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card text-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <p className="text-4xl mb-2">👥</p><p className="text-2xl font-bold">0</p><p className="text-sm opacity-80">Teman Diundang</p>
      </div>
      <div className="card text-center bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <p className="text-4xl mb-2">💰</p><p className="text-2xl font-bold">Rp 0</p><p className="text-sm opacity-80">Total Komisi</p>
      </div>
      <div className="card text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <p className="text-4xl mb-2">🏆</p><p className="text-2xl font-bold">0</p><p className="text-sm opacity-80">Peringkat</p>
      </div>
    </div>
    <div className="card"><h3 className="font-bold mb-2">🔗 Kode Referral Kamu</h3>
      <div className="flex gap-2"><input className="input-field text-center text-2xl font-bold tracking-widest" readOnly value="DENANA2026" />
        <button className="btn-primary">📋 Salin</button></div>
      <p className="text-xs text-gray-400 mt-2">Bagikan kode ini ke teman, dapatkan <strong>Rp 5.000</strong> setiap teman baru yang daftar!</p>
    </div>
    <div className="card"><h3 className="font-bold mb-2">📊 Riwayat Referral</h3>
      <div className="text-center py-6 text-gray-400"><p className="text-3xl mb-2">🎁</p><p>Belum ada teman yang diundang</p>
        <p className="text-xs mt-1">Bagikan link referral kamu dan mulai dapatkan komisi!</p></div>
    </div>
  </div></AdminLayout>;
}
