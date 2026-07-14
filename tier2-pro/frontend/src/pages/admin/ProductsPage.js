import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs' });
    const loadProducts = () => api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => { });
    useEffect(() => { loadProducts(); }, []);
    const save = async () => {
        try {
            if (editId)
                await api.put(`/products/${editId}`, form);
            else
                await api.post('/products', { ...form, store_id: 'default' });
            setShowModal(false);
            setEditId(null);
            loadProducts();
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal');
        }
    };
    const remove = async (id) => {
        if (!confirm('Yakin hapus?'))
            return;
        await api.delete(`/products/${id}`);
        loadProducts();
    };
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83D\uDCE6 Produk" }), _jsx("button", { onClick: () => { setEditId(null); setForm({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs' }); setShowModal(true); }, className: "bg-green-600 text-white px-4 py-2 rounded-lg", children: "+ Tambah" })] }), _jsx("div", { className: "bg-white rounded-xl shadow overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50", children: _jsx("tr", { children: ['Nama', 'Harga Jual', 'Stok', 'Min', 'Satuan', 'Aksi'].map(h => _jsx("th", { className: "p-3 text-left font-medium", children: h }, h)) }) }), _jsx("tbody", { children: products.map(p => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { className: "p-3", children: p.name }), _jsxs("td", { className: "p-3 font-medium", children: ["Rp ", Number(p.sell_price).toLocaleString()] }), _jsx("td", { className: `p-3 ${p.stock <= p.min_stock ? 'text-red-600 font-bold' : ''}`, children: p.stock }), _jsx("td", { className: "p-3", children: p.min_stock }), _jsx("td", { className: "p-3", children: p.unit }), _jsxs("td", { className: "p-3", children: [_jsx("button", { onClick: () => { setEditId(p.product_id); setForm(p); setShowModal(true); }, className: "text-blue-600 mr-2", children: "Edit" }), _jsx("button", { onClick: () => remove(p.product_id), className: "text-red-600", children: "Hapus" })] })] }, p.product_id))) })] }) }), showModal && _jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50", onClick: () => setShowModal(false), children: _jsxs("div", { className: "bg-white w-full max-w-lg rounded-t-2xl p-6 max-h-screen overflow-y-auto", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-4", children: [editId ? 'Edit' : 'Tambah', " Produk"] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { className: "input-field", placeholder: "Nama *", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) }), _jsx("input", { className: "input-field", placeholder: "Barcode", value: form.barcode, onChange: e => setForm({ ...form, barcode: e.target.value }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 input-field", type: "number", placeholder: "Harga Beli", value: form.purchase_price, onChange: e => setForm({ ...form, purchase_price: Number(e.target.value) }) }), _jsx("input", { className: "flex-1 input-field", type: "number", placeholder: "Harga Jual *", value: form.sell_price, onChange: e => setForm({ ...form, sell_price: Number(e.target.value) }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 input-field", type: "number", placeholder: "Stok", value: form.stock, onChange: e => setForm({ ...form, stock: Number(e.target.value) }) }), _jsx("input", { className: "flex-1 input-field", type: "number", placeholder: "Min Stok", value: form.min_stock, onChange: e => setForm({ ...form, min_stock: Number(e.target.value) }) })] }), _jsxs("select", { className: "input-field", value: form.unit, onChange: e => setForm({ ...form, unit: e.target.value }), children: [_jsx("option", { value: "pcs", children: "pcs" }), _jsx("option", { value: "pack", children: "pack" }), _jsx("option", { value: "dus", children: "dus" }), _jsx("option", { value: "kg", children: "kg" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 bg-gray-200 py-3 rounded-lg", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 bg-green-600 text-white py-3 rounded-lg", children: "Simpan" })] })] })] }) })] }) }));
}
