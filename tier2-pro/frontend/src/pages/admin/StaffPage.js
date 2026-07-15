import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
export default function StaffPage() {
    const [staff, setStaff] = useState([
        { id: 1, name: 'Rina Wati', role: 'Kasir', email: 'rina@warung.com', wa: '628111111', status: 'Aktif', login: '2026-07-14' },
        { id: 2, name: 'Dedi Suryadi', role: 'Gudang', email: 'dedi@warung.com', wa: '628222222', status: 'Aktif', login: '2026-07-13' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', role: 'Kasir', wa: '' });
    const save = () => {
        if (!form.name)
            return alert('Nama harus diisi');
        if (editId) {
            setStaff(prev => prev.map(s => s.id === editId ? { ...s, name: form.name, role: form.role, email: form.email, wa: form.wa } : s));
        }
        else {
            setStaff(prev => [...prev, { id: Date.now(), name: form.name, email: form.email, role: form.role, wa: form.wa, status: 'Aktif', login: '-' }]);
        }
        setShowModal(false);
        setEditId(null);
        setForm({ name: '', email: '', role: 'Kasir', wa: '' });
    };
    const remove = (id) => { if (confirm('Yakin hapus?'))
        setStaff(prev => prev.filter(s => s.id !== id)); };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDC64 Karyawan" }), _jsxs("p", { className: "text-gray-400 text-sm", children: [staff.length, " staf terdaftar"] })] }), _jsx("button", { onClick: () => { setEditId(null); setForm({ name: '', email: '', role: 'Kasir', wa: '' }); setShowModal(true); }, className: "btn-primary", children: "+ Tambah" })] }), _jsx("div", { className: "table-wrap", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nama" }), _jsx("th", { children: "Posisi" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "WhatsApp" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Terakhir Login" }), _jsx("th", { children: "Aksi" })] }) }), _jsx("tbody", { children: staff.map(s => _jsxs("tr", { children: [_jsx("td", { className: "font-medium", children: s.name }), _jsx("td", { children: _jsx("span", { className: "badge badge-blue", children: s.role }) }), _jsx("td", { className: "text-sm", children: s.email }), _jsx("td", { className: "font-mono text-sm", children: s.wa }), _jsx("td", { children: _jsx("span", { className: `badge ${s.status === 'Aktif' ? 'badge-green' : 'badge-yellow'}`, children: s.status }) }), _jsx("td", { className: "text-sm text-gray-400", children: s.login }), _jsxs("td", { children: [_jsx("button", { onClick: () => { setEditId(s.id); setForm({ name: s.name, email: s.email, role: s.role, wa: s.wa }); setShowModal(true); }, className: "btn btn-sm btn-secondary", children: "Edit" }), _jsx("button", { onClick: () => remove(s.id), className: "btn btn-sm btn-danger ml-1", children: "Hapus" })] })] }, s.id)) })] }) }), showModal && _jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content animate-in", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-1", children: [editId ? '✏️ Edit' : '👤 Tambah', " Karyawan"] }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: editId ? 'Perbarui data karyawan.' : 'Daftar akun karyawan baru dengan hak akses.' }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Nama Lengkap ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { className: "input-field", placeholder: "Nama karyawan", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx("input", { className: "input-field", placeholder: "email@warung.com", value: form.email, onChange: e => setForm({ ...form, email: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "No. WhatsApp" }), _jsx("input", { className: "input-field", placeholder: "628123456789", value: form.wa, onChange: e => setForm({ ...form, wa: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Posisi" }), _jsxs("select", { className: "input-field", value: form.role, onChange: e => setForm({ ...form, role: e.target.value }), children: [_jsx("option", { value: "Kasir", children: "Kasir" }), _jsx("option", { value: "Gudang", children: "Gudang" }), _jsx("option", { value: "Kepala Toko", children: "Kepala Toko" }), _jsx("option", { value: "Admin", children: "Admin" })] })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 btn-secondary", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 btn-primary", children: editId ? '💾 Simpan' : '✅ Tambah' })] })] })] }) })] }) });
}
