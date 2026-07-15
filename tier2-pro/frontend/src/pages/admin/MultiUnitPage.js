import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
export default function MultiUnitPage() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Indomie Goreng', base: 'pcs', units: [{ name: 'pcs', qty: 1, price: 3500 }, { name: 'pack', qty: 10, price: 32000 }, { name: 'dus', qty: 40, price: 130000 }] },
        { id: 2, name: 'Air Mineral 600ml', base: 'pcs', units: [{ name: 'pcs', qty: 1, price: 5000 }, { name: 'dus', qty: 24, price: 110000 }] },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editProd, setEditProd] = useState(null);
    const [editUnit, setEditUnit] = useState(null);
    const [form, setForm] = useState({ product_id: 1, unit_name: 'pack', unit_qty: 10, unit_price: 0 });
    const openAddUnit = (prodId) => { setEditProd(prodId); setForm({ product_id: prodId, unit_name: 'pack', unit_qty: 10, unit_price: 0 }); setShowModal(true); };
    const saveUnit = () => {
        if (form.unit_price <= 0)
            return alert('Harga harus diisi');
        setProducts(prev => prev.map(p => {
            if (p.id !== form.product_id)
                return p;
            if (editUnit) {
                p.units[editUnit.idx] = { name: form.unit_name, qty: form.unit_qty, price: form.unit_price };
            }
            else {
                p.units.push({ name: form.unit_name, qty: form.unit_qty, price: form.unit_price });
            }
            return { ...p };
        }));
        setShowModal(false);
        setEditUnit(null);
    };
    const removeUnit = (prodId, idx) => {
        if (!confirm('Hapus satuan ini?'))
            return;
        setProducts(prev => prev.map(p => p.id !== prodId ? p : { ...p, units: p.units.filter((_, i) => i !== idx) }));
    };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsx("div", { className: "page-header", children: _jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDCCF Multi Satuan" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Atur harga per satuan berbeda untuk setiap produk" })] }) }), products.map(p => _jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx("h3", { className: "font-bold text-lg", children: p.name }), _jsx("button", { onClick: () => openAddUnit(p.id), className: "btn btn-sm btn-primary", children: "+ Tambah Satuan" })] }), _jsx("div", { className: "space-y-2", children: p.units.map((u, i) => _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-xl", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: u.name }), _jsxs("span", { className: "text-xs text-gray-400 ml-2", children: ["= ", u.qty, " ", p.base] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "font-bold text-emerald-600", children: ["Rp ", u.price.toLocaleString()] }), _jsx("button", { onClick: () => { setEditProd(p.id); setEditUnit({ prodId: p.id, idx: i }); setForm({ product_id: p.id, unit_name: u.name, unit_qty: u.qty, unit_price: u.price }); setShowModal(true); }, className: "text-blue-600 text-sm", children: "Edit" }), _jsx("button", { onClick: () => removeUnit(p.id, i), className: "text-red-500 text-sm", children: "Hapus" })] })] }, i)) })] }, p.id)), showModal && _jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content animate-in", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-1", children: [editUnit ? '✏️ Edit' : '➕ Tambah', " Multi Satuan"] }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Tentukan harga untuk satuan yang berbeda." }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Produk" }), _jsx("select", { className: "input-field", value: form.product_id, onChange: e => setForm({ ...form, product_id: Number(e.target.value) }), disabled: !!editUnit, children: products.map(p => _jsx("option", { value: p.id, children: p.name }, p.id)) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Nama Satuan" }), _jsx("input", { className: "input-field", placeholder: "pack, dus, karton, lusin", value: form.unit_name, onChange: e => setForm({ ...form, unit_name: e.target.value }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Isi (dalam satuan dasar)" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 10", value: form.unit_qty, onChange: e => setForm({ ...form, unit_qty: Number(e.target.value) }) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Harga Satuan ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 32000", value: form.unit_price || '', onChange: e => setForm({ ...form, unit_price: Number(e.target.value) }) })] })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 btn-secondary", children: "Batal" }), _jsx("button", { onClick: saveUnit, className: "flex-1 btn-primary", children: editUnit ? '💾 Simpan' : '✅ Tambah' })] })] })] }) })] }) });
}
