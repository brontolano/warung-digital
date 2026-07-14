/**
 * WarungDigital — Transaction Module
 * POS, transaksi, keranjang, stok
 */

var Transaksi = {
  addTransaksi: function(data, items) {
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(30000);
      if (!items || items.length === 0) return { success: false, error: 'Tidak ada item' };
      var transaksi_id = Database.generateId(Database.SHEETS.TRANSAKSI, 'TRX');
      var total_hpp = 0, total_jual = 0;

      items.forEach(function(item) {
        var produk = Database.getById(Database.SHEETS.PRODUK, 'produk_id', item.produk_id);
        if (!produk) throw new Error('Produk ' + item.nama + ' tidak ditemukan');
        if (produk.stok < item.qty) throw new Error('Stok ' + produk.nama_produk + ' tidak cukup. Sisa: ' + produk.stok);
        total_hpp += (produk.harga_beli || 0) * item.qty;
        total_jual += (item.harga_satuan || produk.harga_jual) * item.qty;
      });

      Database.append(Database.SHEETS.TRANSAKSI, [
        transaksi_id, new Date(), data.user_id || '', total_hpp, total_jual, data.metode_bayar || 'tunai', data.catatan || ''
      ]);

      items.forEach(function(item) {
        var produk = Database.getById(Database.SHEETS.PRODUK, 'produk_id', item.produk_id);
        var harga = item.harga_satuan || produk.harga_jual;
        var subtotal = harga * item.qty;
        var dtl_id = Database.generateId(Database.SHEETS.DETAIL_TRANSAKSI, 'DTL');
        Database.append(Database.SHEETS.DETAIL_TRANSAKSI, [dtl_id, transaksi_id, item.produk_id, item.qty, harga, subtotal]);
        var stokBaru = parseInt(produk.stok) - item.qty;
        Database.updateById(Database.SHEETS.PRODUK, 'produk_id', item.produk_id, { stok: stokBaru });
      });

      return { success: true, transaksi_id: transaksi_id, total: total_jual };
    } catch (e) { Logger.log('Transaksi.addTransaksi error: ' + e.stack); return { success: false, error: e.message }; }
    finally { lock.releaseLock(); }
  },

  getTransaksi: function(filter) {
    try {
      var all = Database.getAll(Database.SHEETS.TRANSAKSI);
      var result = [];
      all.rows.forEach(function(row) {
        var obj = {}; all.headers.forEach(function(h, i) { obj[h] = row[i]; });
        if (filter && filter.user_id && obj.user_id !== filter.user_id) return;
        result.push(obj);
      });
      return result;
    } catch (e) { Logger.log('Transaksi.getTransaksi error: ' + e.stack); return []; }
  },

  getDetailTransaksi: function(transaksi_id) {
    try { return Database.filterByField(Database.SHEETS.DETAIL_TRANSAKSI, 'transaksi_id', transaksi_id); }
    catch (e) { Logger.log('Transaksi.getDetailTransaksi error: ' + e.stack); return []; }
  }
};