import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../contexts/AuthContext';
export default function AttendancePage() {
    const [userId, setUserId] = useState('');
    const checkin = async () => {
        if (!userId)
            return alert('Masukkan user ID');
        try {
            await api.post('/attendance/checkin', { store_id: 'default', user_id: userId });
            alert('Check-in berhasil!');
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal check-in');
        }
    };
    const checkout = async () => {
        try {
            await api.post('/attendance/checkout', { store_id: 'default', user_id: userId });
            alert('Check-out berhasil!');
        }
        catch (e) {
            alert(e.response?.data?.message || 'Gagal check-out');
        }
    };
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83D\uDD50 Absensi" }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-3", children: [_jsx("input", { className: "input-field", placeholder: "User ID", value: userId, onChange: e => setUserId(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: checkin, className: "flex-1 bg-green-600 text-white py-3 rounded-lg", children: "\u2705 Check-in" }), _jsx("button", { onClick: checkout, className: "flex-1 bg-red-600 text-white py-3 rounded-lg", children: "\uD83D\uDEAA Check-out" })] })] })] }) });
}
