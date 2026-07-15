// Export utility — CSV & Print
export function exportCSV(data: any[], filename: string) {
  if (!data.length) return alert('Tidak ada data untuk di-export');
  const headers = Object.keys(data[0]);
  const csv = [headers.join(','), ...data.map(row =>
    headers.map(h => {
      const val = row[h]?.toString() || '';
      return val.includes(',') ? `"${val}"` : val;
    }).join(','))
  ].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportJSON(data: any[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function printTable(tableId: string, title: string) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const win = window.open('', '', 'width=800,height=600');
  if (!win) { alert('Izinkan pop-up untuk mencetak'); return; }
  win.document.write(`
    <html><head><title>${title}</title>
    <style>body{font-family:sans-serif;padding:20px}
    table{width:100%;border-collapse:collapse;margin-top:10px}
    th,td{border:1px solid #ddd;padding:8px;text-align:left}
    th{background:#f5f5f5}
    h2{text-align:center}
    </style></head>
    <body><h2>${title}</h2>
    ${table.outerHTML}
    <script>window.print();window.close();</script>
    </body></html>
  `);
  win.document.close();
}
