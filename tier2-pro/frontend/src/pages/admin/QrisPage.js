import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
export default function QrisPage() {
    const [nominal, setNominal] = useState(0);
    const [qrText, setQrText] = useState('');
    const [history, setHistory] = useState([
        { date: '2026-07-14 19:30', nominal: 35000, status: 'Berhasil' },
        { date: '2026-07-14 15:00', nominal: 12500, status: 'Berhasil' },
    ]);
    const canvasRef = useRef(null);
    const generateQR = () => {
        if (nominal <= 0)
            return alert('Masukkan nominal terlebih dahulu');
        // QRIS format: QRIS:{merchant_id}:{nominal}
        const merchantId = 'ID1234567890';
        const text = `QRIS:${merchantId}:${nominal}`;
        setQrText(text);
        setHistory(prev => [{ date: new Date().toLocaleString('id-ID'), nominal, status: 'Baru' }, ...prev]);
    };
    // Simple QR code rendering using canvas (without external lib)
    useEffect(() => {
        if (!qrText || !canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        // Draw a stylized QR code representation
        ctx.fillStyle = '#000000';
        // Position detection patterns (top-left, top-right, bottom-left)
        const patterns = [
            { x: 10, y: 10 }, { x: 140, y: 10 }, { x: 10, y: 140 }
        ];
        patterns.forEach(({ x, y }) => {
            ctx.fillRect(x, y, 30, 30); // outer
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 5, y + 5, 20, 20);
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 10, y + 10, 10, 10);
        });
        // Data bits (simplified)
        const seed = qrText.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if ((seed * (i + 1) * (j + 1)) % 3 === 0) {
                    ctx.fillRect(45 + j * 8, 45 + i * 8, 6, 6);
                }
            }
        }
    }, [qrText]);
    const totalHarian = history.filter(h => h.date.startsWith('2026-07-14')).reduce((s, h) => s + h.nominal, 0);
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsx("div", { className: "page-header", children: _jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDCB3 QRIS Pembayaran" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Terima pembayaran QRIS tanpa ribet" })] }) }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "card", children: [_jsx("h3", { className: "font-bold mb-3", children: "\uD83D\uDD33 Generate QRIS" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Nominal Pembayaran ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "number", className: "input-field text-lg font-bold", placeholder: "Masukkan nominal, contoh: 50000", value: nominal || '', onChange: e => setNominal(Number(e.target.value)) }), _jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Masukkan jumlah yang harus dibayar pelanggan" })] }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: [25000, 50000, 100000, 150000, 200000, 500000].map(n => (_jsxs("button", { onClick: () => setNominal(n), className: `p-2 rounded-lg text-sm font-medium border ${nominal === n ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'border-gray-200 hover:border-emerald-300'}`, children: ["Rp ", n.toLocaleString()] }, n))) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Info Merchant" }), _jsx("input", { className: "input-field text-sm", defaultValue: "Den Ana Brontolano - ID1234567890", disabled: true })] }), _jsx("button", { onClick: generateQR, className: "btn-primary w-full py-4 text-lg", children: "\uD83D\uDD04 Generate QRIS" })] })] }), _jsxs("div", { className: "card text-center", children: [_jsx("h3", { className: "font-bold mb-3", children: "\uD83D\uDCF1 Scan QRIS" }), qrText ? (_jsxs("div", { children: [_jsx("div", { className: "bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 inline-block", children: _jsx("canvas", { ref: canvasRef, className: "mx-auto", width: "200", height: "200" }) }), _jsxs("p", { className: "font-bold text-lg mt-3 text-emerald-600", children: ["Rp ", nominal.toLocaleString()] }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Scan dengan aplikasi pembayaran (GoPay, OVO, Dana, M banking)" }), _jsx("div", { className: "mt-3 text-xs text-gray-400 p-2 bg-gray-50 rounded-lg break-all font-mono", children: qrText })] })) : (_jsxs("div", { className: "py-8 text-gray-400", children: [_jsx("p", { className: "text-6xl mb-3", children: "\uD83D\uDCB3" }), _jsx("p", { children: "Masukkan nominal & klik Generate" })] }))] })] }), _jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx("h3", { className: "font-bold", children: "\uD83D\uDCCA Riwayat Pembayaran QRIS" }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Total: ", _jsxs("span", { className: "font-bold text-emerald-600", children: ["Rp ", totalHarian.toLocaleString()] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left border-b", children: [_jsx("th", { className: "py-2", children: "Tanggal" }), _jsx("th", { children: "Nominal" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: history.map((h, i) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-2", children: h.date }), _jsxs("td", { className: "font-semibold", children: ["Rp ", h.nominal.toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: `badge ${h.status === 'Berhasil' ? 'badge-green' : 'badge-yellow'}`, children: h.status }) })] }, i))) })] }) })] })] }) });
}
