import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-200">W</div>
          <h1 className="text-2xl font-bold text-gray-900">WarungDigital</h1>
          <p className="text-gray-400 text-sm mt-1">Masuk ke akun Anda</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input type="email" className="input-field pl-10" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@warung.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input type="password" className="input-field pl-10" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><span className="animate-spin">⏳</span> Memproses...</> : <>Masuk →</>}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">WarungDigital v2.0 • Den Ana Brontolano Retail</p>
          </div>
        </div>
      </div>
    </div>
  );
}
