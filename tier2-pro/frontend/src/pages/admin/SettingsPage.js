import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
export default function SettingsPage() {
    const { user, logout } = useAuth();
    return _jsx(AdminLayout, { children: _jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\u2699\uFE0F Pengaturan" }), _jsxs("div", { className: "bg-white rounded-xl shadow p-4 space-y-2", children: [_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Warung:" }), " ", user?.nama_warung || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Email:" }), " ", user?.email || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Role:" }), " ", user?.role || '-'] })] }), _jsx("button", { onClick: logout, className: "bg-red-500 text-white w-full py-3 rounded-lg", children: "\uD83D\uDEAA Logout" }), _jsx("p", { className: "text-center text-xs text-gray-400", children: "WarungDigital v1.0 | Den Ana Brontolano Retail" })] }) });
}
