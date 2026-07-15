import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
export default function LinktokoPage() {
    const [links, setLinks] = useState([
        { platform: 'WhatsApp', icon: '📞', url: 'https://wa.me/628123456789', active: true },
        { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/denana', active: true },
        { platform: 'TikTok', icon: '🎵', url: 'https://tiktok.com/@denana', active: true },
        { platform: 'Shopee', icon: '🛍️', url: 'https://shopee.co.id/denana', active: false },
        { platform: 'Google Maps', icon: '🗺️', url: 'https://maps.google.com/?q=Den+Ana', active: true },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const [form, setForm] = useState({ platform: '', icon: '🔗', url: '' });
    const save = () => {
        if (!form.platform || !form.url)
            return alert('Nama & URL harus diisi');
        if (editIdx !== null) {
            setLinks(prev => prev.map((l, i) => i === editIdx ? { ...l, platform: form.platform, icon: form.icon, url: form.url } : l));
        }
        else {
            setLinks(prev => [...prev, { platform: form.platform, icon: form.icon, url: form.url, active: true }]);
        }
        setShowModal(false);
        setEditIdx(null);
    };
    const remove = (idx) => { if (confirm('Yakin hapus link ini?'))
        setLinks(prev => prev.filter((_, i) => i !== idx)); };
    const toggle = (idx) => { setLinks(prev => prev.map((l, i) => i === idx ? { ...l, active: !l.active } : l)); };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "page-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\uD83D\uDD17 Linktoko" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Bagikan semua link toko dalam satu halaman" })] }), _jsx("button", { onClick: () => { setEditIdx(null); setForm({ platform: '', icon: '🔗', url: '' }); setShowModal(true); }, className: "btn-primary", children: "+ Tambah Link" })] }), _jsxs("div", { className: "card", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto", children: "D" }), _jsx("h2", { className: "font-bold text-xl mt-2", children: "Den Ana Brontolano" }), _jsx("p", { className: "text-gray-400 text-sm", children: "\uD83D\uDED2 Toko Online \u00B7 \u23F0 07:00-21:00" }), _jsx("div", { className: "inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm mt-2", children: "\uD83D\uDCCB link.denana.id/brontolano" })] }), _jsx("div", { className: "space-y-2", children: links.map((l, i) => (_jsxs("div", { className: `flex items-center justify-between p-3 rounded-xl transition-all ${l.active ? 'bg-emerald-50' : 'bg-gray-50 opacity-60'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: l.icon }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: l.platform }), _jsx("p", { className: "text-xs text-gray-400 truncate max-w-[200px]", children: l.url })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => toggle(i), className: "text-sm", children: l.active ? '🟢' : '⚪' }), _jsx("button", { onClick: () => { setEditIdx(i); setForm({ platform: l.platform, icon: l.icon, url: l.url }); setShowModal(true); }, className: "text-blue-600 text-sm", children: "Edit" }), _jsx("button", { onClick: () => remove(i), className: "text-red-500 text-sm", children: "Hapus" })] })] }, i))) })] }), showModal && _jsx("div", { className: "modal-overlay", onClick: () => setShowModal(false), children: _jsxs("div", { className: "modal-content animate-in", onClick: e => e.stopPropagation(), children: [_jsxs("h2", { className: "text-xl font-bold mb-1", children: [editIdx !== null ? '✏️ Edit' : '➕ Tambah', " Link"] }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Tambahkan link ke sosial media atau marketplace." }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Platform" }), _jsxs("select", { className: "input-field", value: form.platform, onChange: e => setForm({ ...form, platform: e.target.value }), children: [_jsx("option", { value: "", children: "\u2014 Pilih Platform \u2014" }), _jsx("option", { children: "WhatsApp" }), _jsx("option", { children: "Instagram" }), _jsx("option", { children: "TikTok" }), _jsx("option", { children: "Shopee" }), _jsx("option", { children: "Tokopedia" }), _jsx("option", { children: "Lazada" }), _jsx("option", { children: "Google Maps" }), _jsx("option", { children: "Facebook" }), _jsx("option", { children: "Youtube" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Ikon" }), _jsx("input", { className: "input-field", placeholder: "\uD83D\uDCDE atau \uD83D\uDD17", value: form.icon, onChange: e => setForm({ ...form, icon: e.target.value }) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["URL ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { className: "input-field", placeholder: "https://...", value: form.url, onChange: e => setForm({ ...form, url: e.target.value }) })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "flex-1 btn-secondary", children: "Batal" }), _jsx("button", { onClick: save, className: "flex-1 btn-primary", children: "\uD83D\uDCBE Simpan" })] })] })] }) })] }) });
}
