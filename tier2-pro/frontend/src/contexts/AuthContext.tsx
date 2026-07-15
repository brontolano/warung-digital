import axios from 'axios';
export const api = axios.create({ baseURL: '/api/v1' });

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { user_id: string; email: string; role: string; nama_warung: string; nama_pemilik: string; }
interface AuthContextType { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void; }
const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { api.defaults.headers.common['Authorization'] = `Bearer ${token}`; api.get('/auth/me').then((r: any) => setUser(r.data)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false)); } else { setLoading(false); }
  }, []);
  const login = async (email: string, password: string) => { const r = await api.post('/auth/login', { email, password }); localStorage.setItem('token', r.data.access_token); api.defaults.headers.common['Authorization'] = `Bearer ${r.data.access_token}`; setUser(r.data.user); };
  const logout = () => { localStorage.removeItem('token'); delete api.defaults.headers.common['Authorization']; setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
