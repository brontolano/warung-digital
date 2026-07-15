import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function POSPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [customer, setCustomer] = useState({ name: '', wa: '' });
    const [paymentMethod, setPaymentMethod] = useState('tunai');
    const [tab, setTab] = useState('kasir');
    const [transactions, setTransactions] = useState([
        { id: 'TRX-001', date: '14/07 19:30', total: 35000, items: 3, method: 'Tunai', customer: 'Budi' },
        { id: 'TRX-002', date: '14/07 18:15', total: 12500, items: 2, method: 'QRIS', customer: 'Siti' },
        { id: 'TRX-003', date: '14/07 17:00', total: 78000, items: 5, method: 'Tunai', customer: '' },
    ]);
    useEffect(() => { api.get('/products', { params: { store_id: 'default' } }).then(r => setProducts(r.data)).catch(() => { }); }, []);
    const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
    const addToCart = (p) => {
        setCart(prev => {
            const exist = prev.find(x => x.product_id === p.product_id);
            if (exist)
                return prev.map(x => x.product_id === p.product_id ? { ...x, qty: x.qty + 1 } : x);
            return [...prev, { product_id: p.product_id, name: p.name, price: p.sell_price || 0, qty: 1 }];
        });
        setSearch('');
    };
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const checkout = async () => {
        if (cart.length === 0)
            return alert('Keranjang kosong!');
        const items = cart.map(x => ({ product_id: x.product_id, qty: x.qty, unit_price: x.price }));
        try {
            const r = await api.post('/transactions', { store_id: 'default', customer_name: customer.name, customer_wa: customer.wa, items });
            if (r.data.success) {
                setTransactions(prev => [{ id: `TRX-${String(Date.now()).slice(-3)}`, date: new Date().toLocaleString('id-ID'), total, items: cart.length, method: paymentMethod, customer: customer.name || '-' }, ...prev]);
                alert(`Transaksi berhasil! Total: Rp ${total.toLocaleString()}`);
                setCart([]);
                setCustomer({ name: '', wa: '' });
                setPaymentMethod('tunai');
            }
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal simpan transaksi');
        }
    };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-5xl mx-auto", children: [_jsxs("div", { className: "flex gap-2 border-b pb-2", children: [_jsx("button", { onClick: () => setTab('kasir'), className: `px-4 py-2 rounded-lg text-sm font-medium ${tab === 'kasir' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`, children: "\uD83D\uDED2 Kasir" }), _jsx("button", { onClick: () => setTab('riwayat'), className: `px-4 py-2 rounded-lg text-sm font-medium ${tab === 'riwayat' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`, children: "\uD83D\uDD50 Riwayat" })] }), tab === 'kasir' && _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 input-field", placeholder: "\uD83D\uDD0D Cari nama atau barcode produk...", value: search, onChange: e => setSearch(e.target.value) }), _jsx("button", { onClick: () => setShowScanner(!showScanner), className: "btn-secondary px-4", children: "\uD83D\uDCF7" })] }), showScanner && _jsx("div", { className: "bg-white rounded-xl p-4", children: _jsx("div", { id: "reader", className: "w-full max-w-sm mx-auto" }) }), search && filtered.length > 0 && _jsx("div", { className: "bg-white rounded-xl shadow max-h-48 overflow-y-auto", children: filtered.slice(0, 10).map(p => (_jsxs("div", { className: "p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between", onClick: () => addToCart(p), children: [_jsx("span", { className: "font-medium", children: p.name }), _jsxs("span", { className: "text-emerald-600 font-medium", children: ["Rp ", Number(p.sell_price || 0).toLocaleString()] })] }, p.product_id))) }), _jsxs("div", { className: "bg-white rounded-xl shadow p-3", children: [_jsx("p", { className: "text-sm font-medium mb-2", children: "\uD83D\uDC64 Info Customer (opsional)" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "input-field text-sm", placeholder: "Nama", value: customer.name, onChange: e => setCustomer({ ...customer, name: e.target.value }) }), _jsx("input", { className: "input-field text-sm", placeholder: "WA", value: customer.wa, onChange: e => setCustomer({ ...customer, wa: e.target.value }) })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-white rounded-xl shadow p-4", children: [_jsxs("h3", { className: "font-bold mb-3", children: ["\uD83D\uDED2 Keranjang (", cart.length, ")"] }), cart.length === 0 ? _jsx("p", { className: "text-gray-400 text-sm text-center py-6", children: "Belum ada item" }) : (_jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: cart.map((item, i) => (_jsxs("div", { className: "flex items-center justify-between py-2 border-b", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: item.name }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Rp ", item.price.toLocaleString(), " x ", item.qty] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-bold", children: ["Rp ", (item.price * item.qty).toLocaleString()] }), _jsx("button", { onClick: () => setCart(prev => prev.filter((_, idx) => idx !== i)), className: "text-red-500", children: "\u2715" })] })] }, i))) }))] }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-3", children: [_jsxs("div", { className: "flex justify-between font-bold text-lg", children: [_jsx("span", { children: "Total" }), _jsxs("span", { className: "text-emerald-600", children: ["Rp ", total.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-1", children: "Metode Bayar" }), _jsxs("select", { className: "input-field text-sm", value: paymentMethod, onChange: e => setPaymentMethod(e.target.value), children: [_jsx("option", { value: "tunai", children: "\uD83D\uDCB0 Tunai" }), _jsx("option", { value: "qris", children: "\uD83D\uDCB3 QRIS" }), _jsx("option", { value: "transfer", children: "\uD83C\uDFE6 Transfer" })] })] }), _jsx("button", { onClick: checkout, className: "btn-primary w-full py-4 text-lg", children: "\uD83D\uDCBE Simpan Transaksi" })] })] })] }), tab === 'riwayat' && _jsxs("div", { className: "card", children: [_jsx("h3", { className: "font-bold mb-3", children: "\uD83D\uDD50 Riwayat Transaksi Hari Ini" }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left border-b", children: [_jsx("th", { className: "py-2", children: "Waktu" }), _jsx("th", { children: "ID" }), _jsx("th", { children: "Customer" }), _jsx("th", { children: "Item" }), _jsx("th", { children: "Total" }), _jsx("th", { children: "Metode" })] }) }), _jsx("tbody", { children: transactions.map((t, i) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-2", children: t.date }), _jsx("td", { className: "font-mono text-xs", children: t.id }), _jsx("td", { children: t.customer || '-' }), _jsxs("td", { children: [t.items, " item"] }), _jsxs("td", { className: "font-semibold", children: ["Rp ", t.total.toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: "badge badge-blue", children: t.method }) })] }, i))) })] }), transactions.length === 0 && _jsx("p", { className: "text-center py-6 text-gray-400", children: "Belum ada transaksi hari ini" })] }), _jsxs("div", { className: "mt-4 pt-3 border-t flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium", children: "Total Hari Ini" }), _jsxs("span", { className: "text-xl font-bold text-emerald-600", children: ["Rp ", transactions.reduce((s, t) => s + t.total, 0).toLocaleString()] })] })] })] }) });
}
