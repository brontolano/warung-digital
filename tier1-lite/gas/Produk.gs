/**
 * WarungDigital — Product Module
 * CRUD produk, stok, barcode
 */

var Produk = {
  getProduk: function(user_id) {
    try {
      var cache = CacheService.getScriptCache();
      var cached = cache.get('produk_' + user_id);
      if (cached) return JSON.parse(cached);
      var all = Database.getAll(Database.SHEETS.PRODUK);
      var result = [];
      all.rows.forEach(function(row) {
        var produk = {};
        all.headers.forEach(function(h, i) { produk[h] = row[i]; });
        result.push(produk);
      });
      cache.put('produk_' + user_id, JSON.stringify(result), 300);
      return result;
    } catch (e) { Logger.log('Produk.getProduk error: ' + e.stack); return []; }
  },

  getProdukByBarcode: function(barcode) {
    try {
      var all = Database.getAll(Database.SHEETS.PRODUK);
      var barcodeIdx = all.headers.indexOf('barcode');
      if (barcodeIdx === -1) return null;
      for (var i = 0; i < all.rows.length; i++) {
        if (String(all.rows[i][barcodeIdx]) === String(barcode)) {
          var produk = {};
          all.headers.forEach(function(h, idx) { produk[h] = all.rows[i][idx]; });
          return produk;
        }
      }
      return null;
    } catch (e) { Logger.log('Produk.getProdukByBarcode error: ' + e.stack); return null; }
  },

  addProduk: function(data) {
    try {
      if (!data.nama_produk || data.nama_produk.length < 2) return { success: false, error: 'Nama produk minimal 2 karakter' };
      if (!data.harga_jual || data.harga_jual < 0) return { success: false, error: 'Harga jual harus angka positif' };
      var produk_id = Database.generateId(Database.SHEETS.PRODUK, 'PRD');
      var kategori_id = data.kategori_id || Database.generateId(Database.SHEETS.KATEGORI, 'KTG');
      Database.append(Database.SHEETS.PRODUK, [
        produk_id, data.barcode || '', data.nama_produk, kategori_id,
        data.harga_beli || 0, data.harga_jual, data.stok || 0,
        data.stok_minimum || 5, data.satuan || 'pcs', true, new Date()
      ]);
      return { success: true, produk_id: produk_id };
    } catch (e) { Logger.log('Produk.addProduk error: ' + e.stack); return { success: false, error: e.message }; }
  },

  updateProduk: function(produk_id, data) { return Database.updateById(Database.SHEETS.PRODUK, 'produk_id', produk_id, data); },
  deleteProduk: function(produk_id) { return Database.deleteById(Database.SHEETS.PRODUK, 'produk_id', produk_id); },

  cekStokMenipis: function(user_id) {
    try {
      var all = this.getProduk(user_id);
      var menipis = [];
      all.forEach(function(p) { if (p.stok <= (p.stok_minimum || 5)) menipis.push(p); });
      return menipis;
    } catch (e) { Logger.log('Produk.cekStokMenipis error: ' + e.stack); return []; }
  }
};

var Kategori = {
  getAll: function() {
    try {
      var all = Database.getAll(Database.SHEETS.KATEGORI);
      var result = [];
      all.rows.forEach(function(row) { var obj = {}; all.headers.forEach(function(h, i) { obj[h] = row[i]; }); result.push(obj); });
      return result;
    } catch (e) { Logger.log('Kategori.getAll error: ' + e.stack); return []; }
  }
};