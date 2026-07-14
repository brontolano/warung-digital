import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function POSPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const scannerRef = useRef(null);
    useEffect(() => {
        api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => { });
    }, []);
    const addToCart = (p) => {
        setCart(prev => {
            const exist = prev.find(x => x.product_id === p.product_id);
            if (exist)
                return prev.map(x => x.product_id === p.product_id ? { ...x, qty: x.qty + 1 } : x);
            return [...prev, { product_id: p.product_id, name: p.name, price: p.sell_price || 0, qty: 1 }];
        });
    };
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const startScanner = () => {
        setShowScanner(true);
        setTimeout(() => {
            if (document.getElementById('reader')) {
                scannerRef.current = new Html5Qrcode('reader');
                scannerRef.current.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 250, height: 150 } }, (code) => {
                    const p = products.find(x => x.barcode === code);
                    if (p) {
                        addToCart(p);
                        setShowScanner(false);
                        scannerRef.current?.stop();
                    }
                    else {
                        alert('Barcode tidak ditemukan');
                    }
                }, () => { });
            }
        }, 500);
    };
    const checkout = async () => {
        if (cart.length === 0)
            return alert('Keranjang kosong!');
        try {
            const r = await api.post('/transactions', { store_id: 'default', items: cart.map(x => ({ product_id: x.product_id, qty: x.qty, unit_price: x.price })) });
            if (r.data.success) {
                alert(`Transaksi berhasil! Total: Rp ${total.toLocaleString()}`);
                setCart([]);
            }
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal simpan transaksi');
        }
    };
    const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83D\uDCB0 POS Kasir" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 input-field", placeholder: "Cari produk...", value: search, onChange: e => setSearch(e.target.value) }), _jsx("button", { onClick: startScanner, className: "bg-gray-200 px-4 rounded-xl text-2xl", children: "\uD83D\uDCF7" })] }), showScanner && _jsx("div", { id: "reader", className: "w-full max-w-sm mx-auto" }), search && _jsx("div", { className: "bg-white rounded-xl shadow max-h-48 overflow-y-auto", children: filtered.slice(0, 10).map(p => (_jsxs("div", { className: "p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between", onClick: () => addToCart(p), children: [_jsx("span", { className: "font-medium", children: p.name }), _jsxs("span", { className: "text-green-600 font-medium", children: ["Rp ", Number(p.sell_price).toLocaleString()] })] }, p.product_id))) }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4", children: [_jsxs("h2", { className: "font-bold mb-3", children: ["Keranjang (", cart.length, ")"] }), cart.length === 0 ? _jsx("p", { className: "text-gray-400 text-sm text-center py-4", children: "Belum ada item" }) : (_jsx("div", { className: "space-y-2", children: cart.map((item, i) => (_jsxs("div", { className: "flex justify-between items-center py-2 border-b", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: item.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["x", item.qty] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "font-bold", children: ["Rp ", (item.price * item.qty).toLocaleString()] }), _jsx("button", { onClick: () => setCart(prev => prev.filter((_, idx) => idx !== i)), className: "text-red-500", children: "\u2715" })] })] }, i))) })), cart.length > 0 && (_jsxs("div", { className: "border-t pt-3 mt-3 space-y-3", children: [_jsxs("div", { className: "flex justify-between text-lg font-bold", children: [_jsx("span", { children: "Total" }), _jsxs("span", { className: "text-green-600", children: ["Rp ", total.toLocaleString()] })] }), _jsx("button", { onClick: checkout, className: "btn-primary w-full", children: "\uD83D\uDCBE Simpan Transaksi" })] }))] })] }) }));
}
