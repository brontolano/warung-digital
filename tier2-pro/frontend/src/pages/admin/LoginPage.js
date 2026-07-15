import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/admin');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Email atau password salah');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-200", children: "W" }), _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "WarungDigital" }), _jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Masuk ke akun Anda" })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8", children: [error && (_jsxs("div", { className: "bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm flex items-center gap-2", children: [_jsx("span", { children: "\u26A0\uFE0F" }), " ", error] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: "\uD83D\uDCE7" }), _jsx("input", { type: "email", className: "input-field pl-10", value: email, onChange: e => setEmail(e.target.value), placeholder: "admin@warung.com", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: "\uD83D\uDD12" }), _jsx("input", { type: "password", className: "input-field pl-10", value: password, onChange: e => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2", children: loading ? _jsxs(_Fragment, { children: [_jsx("span", { className: "animate-spin", children: "\u23F3" }), " Memproses..."] }) : _jsx(_Fragment, { children: "Masuk \u2192" }) })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-gray-100", children: _jsx("p", { className: "text-xs text-gray-400 text-center", children: "WarungDigital v2.0 \u2022 Den Ana Brontolano Retail" }) })] })] }) }));
}
