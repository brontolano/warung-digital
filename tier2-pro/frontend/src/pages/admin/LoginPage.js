import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
            setError(err.response?.data?.message || 'Login gagal');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-sm bg-white rounded-2xl shadow-lg p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "text-5xl mb-2", children: "\uD83C\uDFEA" }), _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "WarungDigital" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Masuk ke akun Anda" })] }), error && _jsx("div", { className: "bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", className: "input-field", value: email, onChange: e => setEmail(e.target.value), placeholder: "admin@warung.com", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("input", { type: "password", className: "input-field", value: password, onChange: e => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full disabled:opacity-50", children: loading ? 'Memproses...' : 'Login' })] }), _jsx("p", { className: "text-center text-xs text-gray-400 mt-4", children: "WarungDigital v1.0" })] }) }));
}
