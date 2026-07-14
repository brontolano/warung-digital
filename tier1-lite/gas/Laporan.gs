/**
 * WarungDigital — Expense Module
 */
var Pengeluaran = {
  addPengeluaran: function(data) {
    try {
      if (!data.deskripsi) return { success: false, error: 'Deskripsi harus diisi' };
      if (!data.nominal || data.nominal <= 0) return { success: false, error: 'Nominal harus > 0' };
      var id = Database.generateId(Database.SHEETS.PENGELUARAN, 'PEL');
      Database.append(Database.SHEETS.PENGELUARAN, [id, data.tanggal || new Date(), data.user_id || '', data.kategori || 'lain-lain', data.deskripsi, data.nominal, data.lampiran_url || '', new Date()]);
      return { success: true, pengeluaran_id: id };
    } catch (e) { Logger.log('Pengeluaran.add error: ' + e.stack); return { success: false, error: e.message }; }
  },
  getPengeluaran: function(user_id, filter) {
    try {
      var all = Database.getAll(Database.SHEETS.PENGELUARAN);
      var result = [];
      all.rows.forEach(function(row) { var obj = {}; all.headers.forEach(function(h, i) { obj[h] = row[i]; }); if (obj.user_id !== user_id) return; if (filter.kategori && obj.kategori !== filter.kategori) return; result.push(obj); });
      return result;
    } catch (e) { Logger.log('Pengeluaran.get error: ' + e.stack); return []; }
  },
  updatePengeluaran: function(id, data) { return Database.updateById(Database.SHEETS.PENGELUARAN, 'pengeluaran_id', id, data); },
  deletePengeluaran: function(id) { return Database.deleteById(Database.SHEETS.PENGELUARAN, 'pengeluaran_id', id); }
};

/**
 * WarungDigital — Report Module
 */
var Laporan = {
  getRingkasan: function(user_id) {
    try {
      var transaksi = Transaksi.getTransaksi({ user_id: user_id });
      var pengeluaran = Pengeluaran.getPengeluaran(user_id, {});
      var todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
      var penjualanHariIni = 0, transaksiHariIni = 0;
      transaksi.forEach(function(t) { var tgl = Utilities.formatDate(new Date(t.timestamp), 'Asia/Jakarta', 'yyyy-MM-dd'); if (tgl === todayStr) { penjualanHariIni += Number(t.total_jual) || 0; transaksiHariIni++; } });
      var pengeluaranHariIni = 0;
      pengeluaran.forEach(function(p) { var tgl = Utilities.formatDate(new Date(p.tanggal), 'Asia/Jakarta', 'yyyy-MM-dd'); if (tgl === todayStr) { pengeluaranHariIni += Number(p.nominal) || 0; } });
      return { penjualan_hari_ini: penjualanHariIni, pengeluaran_hari_ini: pengeluaranHariIni, laba_hari_ini: penjualanHariIni - pengeluaranHariIni, transaksi_hari_ini: transaksiHariIni, total_transaksi: transaksi.length, total_produk: Produk.getProduk(user_id).length, stok_menipis: Produk.cekStokMenipis(user_id), transaksi_terakhir: transaksi.slice(-5).reverse() };
    } catch (e) { Logger.log('Laporan.getRingkasan error: ' + e.stack); return {}; }
  },
  getLaporanHarian: function(date) {
    try {
      var transaksi = Transaksi.getTransaksi({});
      var pengeluaran = Pengeluaran.getPengeluaran('', {});
      var dateStr = typeof date === 'string' ? date : Utilities.formatDate(date, 'Asia/Jakarta', 'yyyy-MM-dd');
      var totalPenjualan = 0, totalHpp = 0;
      transaksi.forEach(function(t) { var tgl = Utilities.formatDate(new Date(t.timestamp), 'Asia/Jakarta', 'yyyy-MM-dd'); if (tgl === dateStr) { totalPenjualan += Number(t.total_jual) || 0; totalHpp += Number(t.total_hpp) || 0; } });
      var totalPengeluaran = 0;
      pengeluaran.forEach(function(p) { var tgl = Utilities.formatDate(new Date(p.tanggal), 'Asia/Jakarta', 'yyyy-MM-dd'); if (tgl === dateStr) { totalPengeluaran += Number(p.nominal) || 0; } });
      return { date: dateStr, penjualan: totalPenjualan, laba_kotor: totalPenjualan - totalHpp, pengeluaran: totalPengeluaran, laba_bersih: totalPenjualan - totalHpp - totalPengeluaran };
    } catch (e) { Logger.log('Laporan.getLaporanHarian error: ' + e.stack); return {}; }
  }
};

/**
 * WarungDigital — WhatsApp Module
 */
var Notifikasi = {
  kirimWA: function(no_wa, pesan) {
    try {
      var apiKey = PropertiesService.getScriptProperties().getProperty('CALLMEBOT_KEY');
      if (!apiKey) { Logger.log('CALLMEBOT_KEY not set'); return { success: false, error: 'Key not configured' }; }
      var url = 'https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(no_wa) + '&text=' + encodeURIComponent(pesan) + '&apikey=' + encodeURIComponent(apiKey);
      var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true, timeout: 10000 });
      return { success: response.getResponseCode() === 200, status: response.getContentText() };
    } catch (e) { Logger.log('Notifikasi.kirimWA error: ' + e.stack); return { success: false, error: e.message }; }
  },
  notifStokMenipis: function(user_id) {
    try {
      var users = Database.filterByField(Database.SHEETS.USER, 'user_id', user_id);
      if (users.length === 0) return { sent: 0, count: 0 };
      var stokMenipis = Produk.cekStokMenipis(user_id);
      if (stokMenipis.length === 0) return { sent: 0, count: 0 };
      var pesan = '⚠️ *Stok Menipis!*\n';
      stokMenipis.forEach(function(p) { pesan += '• ' + p.nama_produk + ': ' + p.stok + ' ' + (p.satuan || 'pcs') + '\n'; });
      pesan += '\nSegera order barang, Kak!';
      return this.kirimWA(users[0].no_wa, pesan);
    } catch (e) { Logger.log('Notifikasi.notifStok error: ' + e.stack); return { sent: 0, count: 0 }; }
  }
};