import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Budi Santoso', wa: '628123456789', total: 250000, visits: 5, last: '2026-07-12', points: 250, notes: 'Pelanggan tetap, suka beli sembako' },
    { id: 2, name: 'Siti Rahmawati', wa: '628987654321', total: 180000, visits: 3, last: '2026-07-10', points: 180, notes: '' },
    { id: 3, name: 'Ahmad Hidayat', wa: '628555123456', total: 420000, visits: 8, last: '2026-07-14', points: 420, notes: 'Reseller, ambil grosir tiap minggu' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<any>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', wa: '', notes: '' });

  const save = () => {
    if (!form.name) return alert('Nama pelanggan harus diisi');
    if (editId) setCustomers(prev => prev.map(c => c.id === editId ? { ...c, name: form.name, wa: form.wa, notes: form.notes } : c));
    else setCustomers(prev => [...prev, { id: Date.now(), name: form.name, wa: form.wa, total: 0, visits: 0, last: new Date().toISOString().split('T')[0], points: 0, notes: form.notes }]);
    setShowModal(false); setEditId(null); setForm({ name: '', wa: '', notes: '' });
  };
  const remove = (id: number) => { if (confirm('Yakin hapus?')) setCustomers(prev => prev.filter(c => c.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>👥 Pelanggan</h1><p className="text-gray-400 text-sm">{customers.length} pelanggan terdaftar</p></div>
      <button onClick={() => { setEditId(null); setForm({name:'',wa:'',notes:''}); setShowModal(true); }} className="btn-primary">+ Tambah</button></div>
    <div className="table-wrap"><table><thead><tr><th>Nama</th><th>WhatsApp</th><th>Total</th><th>Kunjungan</th><th>Poin</th><th>Terakhir</th><th>Aksi</th></tr></thead>
    <tbody>{customers.map(c => <tr key={c.id}>
      <td className="font-medium">{c.name}</td><td className="font-mono text-sm">{c.wa}</td>
      <td className="font-semibold">Rp {c.total.toLocaleString()}</td><td>{c.visits}x</td><td><span className="badge badge-yellow">{c.points}</span></td>
      <td className="text-sm text-gray-400">{c.last}</td>
      <td><div className="flex gap-1">
        <button onClick={() => setShowDetail(c)} className="btn btn-sm btn-secondary">👁️ Detail</button>
        <button onClick={() => { setEditId(c.id); setForm({name:c.name,wa:c.wa,notes:c.notes}); setShowModal(true); }} className="btn btn-sm btn-secondary">Edit</button>
        <button onClick={() => remove(c.id)} className="btn btn-sm btn-danger">Hapus</button></div></td>
    </tr>)}</tbody></table></div>

    {/* Modal Detail Pelanggan */}
    {showDetail && <div className="modal-overlay" onClick={() => setShowDetail(null)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">👤 Detail Pelanggan</h2>
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="card"><p className="text-gray-400 text-xs">Nama</p><p className="font-bold">{showDetail.name}</p></div>
            <div className="card"><p className="text-gray-400 text-xs">WA</p><a href={`https://wa.me/${showDetail.wa}`} target="_blank" className="text-emerald-600 font-medium">{showDetail.wa}</a></div>
            <div className="card"><p className="text-gray-400 text-xs">Total Belanja</p><p className="font-bold text-lg">Rp {showDetail.total.toLocaleString()}</p></div>
            <div className="card"><p className="text-gray-400 text-xs">Kunjungan</p><p className="font-bold text-lg">{showDetail.visits}x</p></div>
            <div className="card"><p className="text-gray-400 text-xs">Poin Loyalty</p><p className="font-bold text-lg text-amber-600">{showDetail.points}</p></div>
            <div className="card"><p className="text-gray-400 text-xs">Terakhir Belanja</p><p className="font-bold">{showDetail.last}</p></div>
          </div>
          {showDetail.notes && <div className="card"><p className="text-gray-400 text-xs mb-1">Catatan</p><p>{showDetail.notes}</p></div>}
          <button onClick={() => setShowDetail(null)} className="btn-secondary w-full">Tutup</button>
        </div>
      </div></div>}

    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '👤 Tambah'} Pelanggan</h2>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama <span className="text-red-500">*</span></label>
            <input className="input-field" placeholder="Nama lengkap pelanggan" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">WhatsApp</label>
            <input className="input-field" placeholder="628123456789" value={form.wa} onChange={e => setForm({...form, wa: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Catatan</label>
            <textarea className="input-field" rows={2} placeholder="Alamat, preferensi, dll" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
            <button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan' : '✅ Tambah'}</button></div>
        </div>
      </div></div>}
  </div></AdminLayout>;
}
