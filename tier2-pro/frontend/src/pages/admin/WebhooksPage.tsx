import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function WebhooksPage() {
  return <AdminLayout><div className="space-y-4 max-w-4xl mx-auto"><h1 className="text-2xl font-bold">🔗 Integrasi</h1>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">📲 WhatsApp (WAHA)</h3>
        <p className="text-sm text-gray-500 mt-1">Server: http://localhost:3001</p>
        <p className="text-xs text-gray-400 mt-1">Status: <span className="text-yellow-600">Menunggu konfigurasi</span></p>
        <input className="input-field mt-3 text-sm" placeholder="WAHA API Key" />
      </div>
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">⚙️ n8n Workflow</h3>
        <p className="text-sm text-gray-500 mt-1">Server: http://localhost:5678</p>
        <p className="text-xs text-gray-400 mt-1">Status: <span className="text-yellow-600">Menunggu konfigurasi</span></p>
        <input className="input-field mt-3 text-sm" placeholder="n8n Webhook URL" />
      </div>
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">🔔 CallMeBot</h3>
        <p className="text-sm text-gray-500 mt-1">WhatsApp notifikasi gratis (Tier 1)</p>
        <p className="text-xs text-gray-400 mt-1">Status: <span className="text-green-600">Siap</span></p>
      </div>
      <div className="bg-white rounded-xl shadow p-4"><h3 className="font-bold">🗺️ Google Maps</h3>
        <p className="text-sm text-gray-500 mt-1">Untuk alamat checkout pelanggan</p>
        <input className="input-field mt-3 text-sm" placeholder="Google Maps API Key" />
      </div>
    </div>
  </div></AdminLayout>;
}

