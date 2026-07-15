import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        name: '', barcode: '', purchase_price: 0, sell_price: 0,
        stock: 0, min_stock: 5, unit: 'pcs', category_id: '', description: ''
    });
    const loadProducts = () => api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => { });
    const loadCategories = () => api.get('/categories', { params: { store_id: 'default' } }).then(r => setCategories(r.data)).catch(() => { });
    useEffect(() => { loadProducts(); loadCategories(); }, []);
    const openAdd = () => {
        setEditId(null);
        setForm({ name: '', barcode: '', purchase_price: 0, sell_price: 0, stock: 0, min_stock: 5, unit: 'pcs', category_id: '', description: '' });
        setShowModal(true);
    };
    const openEdit = (p) => {
        setEditId(p.product_id);
        setForm({ name: p.name || '', barcode: p.barcode || '', purchase_price: p.purchase_price || 0, sell_price: p.sell_price || 0, stock: p.stock || 0, min_stock: p.min_stock || 5, unit: p.unit || 'pcs', category_id: p.category_id || '', description: p.description || '' });
        setShowModal(true);
    };
    const save = async () => {
        if (!form.name.trim())
            return alert('Nama produk harus diisi!');
        if (form.sell_price <= 0)
            return alert('Harga jual harus lebih dari 0!');
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
            alert(e.response?.data?.message || 'Gagal menyimpan produk');
        }
    };
    const remove = async (id) => {
        if (!confirm('Yakin hapus produk ini?'))
            return;
        try {
            await api.delete(`/products/${id}`);
            loadProducts();
        }
        catch (e) {
            alert(e.response?.data?.message);
        }
    };
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDCE6 Manajemen Produk" }), _jsxs("p", { className: "text-gray-400 text-sm", children: [products.length, " produk terdaftar"] })] }), _jsx("button", { onClick: openAdd, className: "btn-primary", children: "+ Tambah Produk" })] }), _jsx("div", { className: "table-wrap", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nama" }), _jsx("th", { children: "Kategori" }), _jsx("th", { children: "Harga Beli" }), _jsx("th", { children: "Harga Jual" }), _jsx("th", { children: "Stok" }), _jsx("th", { children: "Min Stok" }), _jsx("th", { children: "Barcode" }), _jsx("th", { children: "Aksi" })] }) }), _jsxs("tbody", { children: [products.map(p => (_jsxs("tr", { children: [_jsxs("td", { children: [_jsx("div", { className: "font-medium", children: p.name }), p.description && _jsx("div", { className: "text-xs text-gray-400", children: p.description })] }), _jsx("td", { children: _jsx("span", { className: "badge badge-green", children: p.category_id || 'Tanpa Kategori' }) }), _jsxs("td", { children: ["Rp ", (p.purchase_price || 0).toLocaleString()] }), _jsxs("td", { className: "font-semibold", children: ["Rp ", (p.sell_price || 0).toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: `badge ${(p.stock || 0) <= (p.min_stock || 0) ? 'badge-red' : 'badge-green'}`, children: p.stock || 0 }) }), _jsx("td", { children: p.min_stock || 0 }), _jsx("td", { className: "text-gray-400 font-mono text-sm", children: p.barcode || '-' }), _jsxs("td", { children: [_jsx("button", { onClick: () => openEdit(p), className: "btn btn-sm btn-secondary", children: "Edit" }), _jsx("button", { onClick: () => remove(p.product_id), className: "btn btn-sm btn-danger ml-1", children: "Hapus" })] })] }, p.product_id))), products.length === 0 && _jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-12 text-gray-400", children: "Belum ada produk. Klik \"+ Tambah Produk\" untuk memulai." }) })] })] }) }), showModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content animate-in", onClick: e => e.stopPropagation(), children: [_jsx("h2", { className: "text-xl font-bold mb-1", children: editId ? '✏️ Edit Produk' : '📦 Tambah Produk Baru' }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: editId ? 'Perbarui data produk yang sudah ada.' : 'Isi data produk baru yang akan dijual.' }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Nama Produk ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { className: "input-field", placeholder: "Contoh: Indomie Goreng Original", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Nama produk yang akan ditampilkan di POS dan toko online" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Barcode (opsional)" }), _jsx("input", { className: "input-field", placeholder: "Contoh: 8991002100635 (scan dari kemasan)", value: form.barcode, onChange: e => setForm({ ...form, barcode: e.target.value }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Jika tidak ada barcode, isi dengan manual atau kosongkan" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Kategori" }), _jsxs("select", { className: "input-field", value: form.category_id, onChange: e => setForm({ ...form, category_id: e.target.value }), children: [_jsx("option", { value: "", children: "\u2014 Pilih Kategori \u2014" }), categories.map((c) => _jsx("option", { value: c.category_id || c.id, children: c.name }, c.category_id || c.id))] }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Kelompokkan produk agar mudah dicari (contoh: Makanan, Minuman)" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Harga Beli (Modal)" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 2500 (per satuan)", value: form.purchase_price || '', onChange: e => setForm({ ...form, purchase_price: Number(e.target.value) }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Berapa harga beli 1 item dari supplier" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Harga Jual ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 3500 (per satuan)", value: form.sell_price || '', onChange: e => setForm({ ...form, sell_price: Number(e.target.value) }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Harga jual ke pelanggan" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Stok Saat Ini" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 50 (jumlah barang)", value: form.stock || '', onChange: e => setForm({ ...form, stock: Number(e.target.value) }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Jumlah barang yang ada di toko saat ini" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Stok Minimum" }), _jsx("input", { type: "number", className: "input-field", placeholder: "Contoh: 5 (sisa minimum)", value: form.min_stock || '', onChange: e => setForm({ ...form, min_stock: Number(e.target.value) }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Peringatan jika stok di bawah angka ini" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Satuan Barang" }), _jsxs("select", { className: "input-field", value: form.unit, onChange: e => setForm({ ...form, unit: e.target.value }), children: [_jsx("option", { value: "pcs", children: "Pcs (Satuan)" }), _jsx("option", { value: "pack", children: "Pack (Bungkus)" }), _jsx("option", { value: "dus", children: "Dus (Kardus)" }), _jsx("option", { value: "kg", children: "Kilogram" }), _jsx("option", { value: "liter", children: "Liter" }), _jsx("option", { value: "botol", children: "Botol" }), _jsx("option", { value: "kotak", children: "Kotak" })] }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Satuan pengukuran barang ini" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Deskripsi (opsional)" }), _jsx("textarea", { className: "input-field", rows: 2, placeholder: "Deskripsi singkat tentang produk ini (misal: warna, ukuran, rasa)", value: form.description, onChange: e => setForm({ ...form, description: e.target.value }) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Keterangan tambahan yang bisa membantu pelanggan atau karyawan" })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 btn-secondary", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 btn-primary", children: editId ? '💾 Simpan Perubahan' : '✅ Tambah Produk' })] })] })] }) }))] }) }));
}
