import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
const defaultCategories = [
    { id: 'cat-1', name: 'Makanan Ringan', icon: '🍜', count: 12 },
    { id: 'cat-2', name: 'Minuman', icon: '🥤', count: 8 },
    { id: 'cat-3', name: 'Sembako', icon: '🫙', count: 15 },
    { id: 'cat-4', name: 'Rokok', icon: '🚬', count: 5 },
    { id: 'cat-5', name: 'Kebersihan', icon: '🧼', count: 7 },
    { id: 'cat-6', name: 'Alat Tulis', icon: '✏️', count: 4 },
];
export default function CategoriesPage() {
    const [categories, setCategories] = useState(defaultCategories);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', icon: '📦' });
    const save = () => {
        if (!form.name)
            return alert('Nama kategori harus diisi');
        if (editId) {
            setCategories(prev => prev.map(c => c.id === editId ? { ...c, name: form.name, icon: form.icon } : c));
        }
        else {
            setCategories(prev => [...prev, { id: 'cat-' + Date.now(), name: form.name, icon: form.icon, count: 0 }]);
        }
        setShowModal(false);
        setEditId(null);
        setForm({ name: '', icon: '📦' });
    };
    const remove = (id) => {
        if (!confirm('Yakin hapus kategori ini?'))
            return;
        setCategories(prev => prev.filter(c => c.id !== id));
    };
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83D\uDCC2 Kategori Produk" }), _jsx("button", { onClick: () => { setEditId(null); setForm({ name: '', icon: '📦' }); setShowModal(true); }, className: "bg-green-600 text-white px-4 py-2 rounded-lg", children: "+ Tambah" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: categories.map(kat => (_jsxs("div", { className: "bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow", children: [_jsx("div", { className: "text-3xl mb-2", children: kat.icon }), _jsx("h3", { className: "font-bold", children: kat.name }), _jsxs("p", { className: "text-xs text-gray-400", children: [kat.count, " produk"] }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("button", { onClick: () => { setEditId(kat.id); setForm({ name: kat.name, icon: kat.icon }); setShowModal(true); }, className: "text-blue-600 text-xs", children: "Edit" }), _jsx("button", { onClick: () => remove(kat.id), className: "text-red-600 text-xs", children: "Hapus" })] })] }, kat.id))) }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50", onClick: () => setShowModal(false), children: _jsxs("div", { className: "bg-white w-full max-w-lg rounded-t-2xl p-6", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-4", children: [editId ? 'Edit' : 'Tambah', " Kategori"] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { className: "input-field", placeholder: "Nama Kategori", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) }), _jsx("div", { className: "flex gap-2 flex-wrap", children: ['📦', '🍜', '🥤', '🫙', '🚬', '🧼', '✏️', '🍬', '🥫', '🧴', '📚', '🧸'].map(icon => (_jsx("button", { onClick: () => setForm({ ...form, icon }), className: `text-2xl p-2 rounded-lg ${form.icon === icon ? 'bg-green-100 ring-2 ring-green-500' : 'bg-gray-100'}`, children: icon }, icon))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 bg-gray-200 py-3 rounded-lg", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 bg-green-600 text-white py-3 rounded-lg", children: "Simpan" })] })] })] }) }))] }) }));
}
