import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { exportCSV } from '../../utils/export';
export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'Supplier A — Sembako Makmur', contact: 'Hadi', phone: '628123456789', products: 'Beras, Gula, Minyak', totalOrder: 4500000, status: 'Aktif' },
        { id: 2, name: 'Supplier B — Minuman Segar', contact: 'Rina', phone: '628555123456', products: 'Aqua, Teh, Kopi', totalOrder: 2800000, status: 'Aktif' },
        { id: 3, name: 'Supplier C — Rokok & Sembako', contact: 'Dedi', phone: '628777888999', products: 'Rokok, Sabun', totalOrder: 1200000, status: 'Tidak Aktif' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', contact: '', phone: '', products: '' });
    const save = () => {
        if (!form.name)
            return alert('Nama supplier harus diisi');
        if (editId) {
            setSuppliers(prev => prev.map(s => s.id === editId ? { ...s, name: form.name, contact: form.contact, phone: form.phone, products: form.products } : s));
        }
        else {
            setSuppliers(prev => [...prev, { id: Date.now(), name: form.name, contact: form.contact, phone: form.phone, products: form.products, totalOrder: 0, status: 'Aktif' }]);
        }
        setShowModal(false);
        setEditId(null);
        setForm({ name: '', contact: '', phone: '', products: '' });
    };
    const remove = (id) => { if (confirm('Yakin hapus supplier ini?'))
        setSuppliers(prev => prev.filter(s => s.id !== id)); };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDE9A Manajemen Supplier" }), _jsxs("p", { className: "text-gray-400 text-sm", children: [suppliers.length, " supplier terdaftar"] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => exportCSV(suppliers.map(s => ({ ...s, totalOrder: Number(s.totalOrder) })), 'supplier'), className: "btn btn-sm btn-secondary", children: "\uD83D\uDCE5 Export" }), _jsx("button", { onClick: () => { setEditId(null); setForm({ name: '', contact: '', phone: '', products: '' }); setShowModal(true); }, className: "btn-primary", children: "+ Tambah" })] })] }), _jsx("div", { className: "table-wrap", children: _jsxs("table", { id: "supplier-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nama Supplier" }), _jsx("th", { children: "Kontak" }), _jsx("th", { children: "Telepon" }), _jsx("th", { children: "Produk" }), _jsx("th", { children: "Total Order" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Aksi" })] }) }), _jsx("tbody", { children: suppliers.map(s => _jsxs("tr", { children: [_jsx("td", { className: "font-medium", children: s.name }), _jsx("td", { children: s.contact }), _jsx("td", { className: "font-mono text-sm", children: s.phone }), _jsx("td", { className: "text-sm", children: s.products }), _jsxs("td", { className: "font-semibold", children: ["Rp ", s.totalOrder.toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: `badge ${s.status === 'Aktif' ? 'badge-green' : 'badge-red'}`, children: s.status }) }), _jsx("td", { children: _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { onClick: () => { setEditId(s.id); setForm({ name: s.name, contact: s.contact, phone: s.phone, products: s.products }); setShowModal(true); }, className: "btn btn-sm btn-secondary", children: "Edit" }), _jsx("button", { onClick: () => remove(s.id), className: "btn btn-sm btn-danger", children: "Hapus" })] }) })] }, s.id)) })] }) }), showModal && _jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content animate-in", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-1", children: [editId ? '✏️ Edit' : '🚚 Tambah', " Supplier"] }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Kelola pemasok barang untuk toko Anda." }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Nama Supplier ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { className: "input-field", placeholder: "Contoh: Sembako Makmur", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Kontak Person" }), _jsx("input", { className: "input-field", placeholder: "Nama orang yang bisa dihubungi", value: form.contact, onChange: e => setForm({ ...form, contact: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "No. Telepon / WhatsApp" }), _jsx("input", { className: "input-field", placeholder: "628...", value: form.phone, onChange: e => setForm({ ...form, phone: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Jenis Produk" }), _jsx("input", { className: "input-field", placeholder: "Contoh: Beras, Gula, Minyak", value: form.products, onChange: e => setForm({ ...form, products: e.target.value }) })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 btn-secondary", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 btn-primary", children: editId ? '💾 Simpan' : '✅ Tambah' })] })] })] }) })] }) });
}
