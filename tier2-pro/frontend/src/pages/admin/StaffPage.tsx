import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function StaffPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Rina Wati', role: 'Kasir', email: 'rina@warung.com', wa: '628111111', status: 'Aktif', login: '2026-07-14' },
    { id: 2, name: 'Dedi Suryadi', role: 'Gudang', email: 'dedi@warung.com', wa: '628222222', status: 'Aktif', login: '2026-07-13' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Kasir', wa: '' });

  const save = () => {
    if (!form.name) return alert('Nama harus diisi');
    if (editId) { setStaff(prev => prev.map(s => s.id === editId ? { ...s, name: form.name, role: form.role, email: form.email, wa: form.wa } : s)); }
    else { setStaff(prev => [...prev, { id: Date.now(), name: form.name, email: form.email, role: form.role, wa: form.wa, status: 'Aktif', login: '-' }]); }
    setShowModal(false); setEditId(null); setForm({ name: '', email: '', role: 'Kasir', wa: '' });
  };
  const remove = (id: number) => { if (confirm('Yakin hapus?')) setStaff(prev => prev.filter(s => s.id !== id)); };

  return <AdminLayout><div className="space-y-4 max-w-5xl mx-auto">
    <div className="page-header"><div><h1>👤 Karyawan</h1><p className="text-gray-400 text-sm">{staff.length} staf terdaftar</p></div>
      <button onClick={() => { setEditId(null); setForm({name:'',email:'',role:'Kasir',wa:''}); setShowModal(true); }} className="btn-primary">+ Tambah</button></div>
    <div className="table-wrap"><table><thead><tr><th>Nama</th><th>Posisi</th><th>Email</th><th>WhatsApp</th><th>Status</th><th>Terakhir Login</th><th>Aksi</th></tr></thead>
    <tbody>{staff.map(s => <tr key={s.id}>
      <td className="font-medium">{s.name}</td><td><span className="badge badge-blue">{s.role}</span></td>
      <td className="text-sm">{s.email}</td><td className="font-mono text-sm">{s.wa}</td>
      <td><span className={`badge ${s.status === 'Aktif' ? 'badge-green' : 'badge-yellow'}`}>{s.status}</span></td>
      <td className="text-sm text-gray-400">{s.login}</td>
      <td><button onClick={() => { setEditId(s.id); setForm({name:s.name,email:s.email,role:s.role,wa:s.wa}); setShowModal(true); }} className="btn btn-sm btn-secondary">Edit</button>
      <button onClick={() => remove(s.id)} className="btn btn-sm btn-danger ml-1">Hapus</button></td>
    </tr>)}</tbody></table></div>
    {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content animate-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{editId ? '✏️ Edit' : '👤 Tambah'} Karyawan</h2>
        <p className="text-gray-400 text-sm mb-4">{editId ? 'Perbarui data karyawan.' : 'Daftar akun karyawan baru dengan hak akses.'}</p>
        <div className="space-y-3">
          <div><label className="block text-sm font-medium mb-1">Nama Lengkap <span className="text-red-500">*</span></label><input className="input-field" placeholder="Nama karyawan" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Email</label><input className="input-field" placeholder="email@warung.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">No. WhatsApp</label><input className="input-field" placeholder="628123456789" value={form.wa} onChange={e => setForm({...form, wa: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Posisi</label><select className="input-field" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
            <option value="Kasir">Kasir</option><option value="Gudang">Gudang</option><option value="Kepala Toko">Kepala Toko</option><option value="Admin">Admin</option></select></div>
          <div className="flex gap-2 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button><button onClick={save} className="flex-1 btn-primary">{editId ? '💾 Simpan' : '✅ Tambah'}</button></div></div>
      </div></div>}
  </div></AdminLayout>;
}
