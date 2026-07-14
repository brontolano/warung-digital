/**
 * WarungDigital — Database Helper
 * Google Sheets CRUD utilities
 */

var Database = {
  SHEETS: {
    USER: 'User', SESI: 'Sesi', KATEGORI: 'Kategori',
    PRODUK: 'Produk', TRANSAKSI: 'Transaksi',
    DETAIL_TRANSAKSI: 'Detail_Transaksi', PENGELUARAN: 'Pengeluaran'
  },

  getSheet: function(name) {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(name);
    if (!sheet) { sheet = ss.insertSheet(name); Logger.log('Created: ' + name); }
    return sheet;
  },

  getAll: function(sheetName) {
    var sheet = this.getSheet(sheetName);
    var data = sheet.getDataRange().getValues();
    var headers = data.length > 0 ? data.shift() : [];
    return { headers: headers, rows: data };
  },

  getById: function(sheetName, idField, id) {
    var all = this.getAll(sheetName);
    var idIndex = all.headers.indexOf(idField);
    if (idIndex === -1) return null;
    for (var i = 0; i < all.rows.length; i++) {
      if (String(all.rows[i][idIndex]) === String(id)) {
        var obj = {};
        all.headers.forEach(function(h, idx) { obj[h] = all.rows[i][idx]; });
        return obj;
      }
    }
    return null;
  },

  append: function(sheetName, data) {
    this.getSheet(sheetName).appendRow(data);
    return { success: true };
  },

  updateById: function(sheetName, idField, id, updates) {
    var sheet = this.getSheet(sheetName);
    var data = sheet.getDataRange().getValues();
    if (data.length === 0) return { success: false, error: 'No data' };
    var headers = data.shift();
    var idIndex = headers.indexOf(idField);
    if (idIndex === -1) return { success: false, error: idField + ' not found' };
    for (var i = 0; i < data.length; i++) {
      if (String(data[i][idIndex]) === String(id)) {
        Object.keys(updates).forEach(function(k) {
          var col = headers.indexOf(k);
          if (col !== -1) sheet.getRange(i + 2, col + 1).setValue(updates[k]);
        });
        return { success: true, row: i + 2 };
      }
    }
    return { success: false, error: 'Not found' };
  },

  deleteById: function(sheetName, idField, id) {
    var all = this.getAll(sheetName);
    var sheet = this.getSheet(sheetName);
    var idIndex = all.headers.indexOf(idField);
    if (idIndex === -1) return { success: false, error: 'Field not found' };
    for (var i = all.rows.length - 1; i >= 0; i--) {
      if (String(all.rows[i][idIndex]) === String(id)) {
        sheet.deleteRow(i + 2);
        return { success: true };
      }
    }
    return { success: false, error: 'Not found' };
  },

  generateId: function(sheetName, prefix) {
    return prefix + '-' + String(this.getSheet(sheetName).getLastRow()).padStart(3, '0');
  },

  filterByField: function(sheetName, field, value) {
    var all = this.getAll(sheetName);
    var idx = all.headers.indexOf(field);
    if (idx === -1) return [];
    var result = [];
    all.rows.forEach(function(row) {
      if (String(row[idx]) === String(value)) {
        var obj = {};
        all.headers.forEach(function(h, i) { obj[h] = row[i]; });
        result.push(obj);
      }
    });
    return result;
  }
};
