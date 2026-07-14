import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
export const api = axios.create({ baseURL: '/api/v1' });
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/auth/me').then((r) => setUser(r.data)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
        }
        else {
            setLoading(false);
        }
    }, []);
    const login = async (email, password) => { const r = await api.post('/auth/login', { email, password }); localStorage.setItem('token', r.data.access_token); api.defaults.headers.common['Authorization'] = `Bearer ${r.data.access_token}`; setUser(r.data.user); };
    const logout = () => { localStorage.removeItem('token'); delete api.defaults.headers.common['Authorization']; setUser(null); };
    return _jsx(AuthContext.Provider, { value: { user, loading, login, logout }, children: children });
}
export const useAuth = () => useContext(AuthContext);
