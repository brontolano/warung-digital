import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function BranchesPage() {
  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>🏢 Kelola Cabang</h1><p className="text-gray-400 text-sm">Atur toko & cabang usaha</p></div><button className="btn-primary">+ Tambah Cabang</button></div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card border-2 border-emerald-200"><div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">🏪</div>
        <div><h3 className="font-bold">Pusat</h3><p className="text-xs text-gray-400">Jl. Merdeka No. 123</p></div>
      </div><p className="text-sm">Status: <span className="badge badge-green">Aktif</span></p><p className="text-xs text-gray-400 mt-1">Terakhir sinkron: 2 menit lalu</p></div>
    </div>
  </div></AdminLayout>;
}
