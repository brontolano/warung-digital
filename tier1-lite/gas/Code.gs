/**
 * WarungDigital — Entry Point
 * GAS Web App: doGet() routing + doPost()
 */

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
var APP_NAME = 'WarungDigital';

function doGet(e) {
  var page = e.parameter.page || 'login';
  var token = e.parameter.token;
  var user = Auth.validateSession(token);

  if (!user && page !== 'login' && page !== 'register') {
    return renderPage('Login', { error: 'Sesi habis, silakan login ulang' });
  }

  var data = {};
  try { data = getPageData(page, user, e); }
  catch (err) { Logger.log('Error: ' + err.stack); data = { error: err.message }; }

  return renderPage(page, { user: user, data: data });
}

function doPost(e) {
  var result = { success: false, error: 'Invalid action' };
  try {
    var payload = JSON.parse(e.postData.contents || '{}');
    switch (payload.action) {
      case 'login': result = Auth.login(payload.email, payload.password); break;
      case 'register': result = Auth.register(payload); break;
      case 'logout': result = Auth.logout(payload.token); break;
      case 'addProduk': result = Produk.addProduk(payload); break;
      case 'updateProduk': result = Produk.updateProduk(payload.produk_id, payload); break;
      case 'deleteProduk': result = Produk.deleteProduk(payload.produk_id); break;
      case 'addTransaksi': result = Transaksi.addTransaksi(payload.data, payload.items); break;
      case 'addPengeluaran': result = Pengeluaran.addPengeluaran(payload); break;
      default: result = { success: false, error: 'Unknown action: ' + payload.action };
    }
  } catch (err) {
    Logger.log('doPost error: ' + err.stack);
    result = { success: false, error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function renderPage(page, params) {
  var template = HtmlService.createTemplateFromFile(page);
  Object.keys(params).forEach(function(k) { template[k] = params[k]; });
  return template.evaluate()
    .setTitle(APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getPageData(page, user, e) {
  switch (page) {
    case 'dashboard': return Dashboard.getData(user);
    case 'stok': return { produk: Produk.getProduk(user.user_id) };
    case 'kasir': return { produk: Produk.getProduk(user.user_id) };
    case 'pengeluaran': return Pengeluaran.getPengeluaran(user.user_id, {});
    case 'laporan': return Laporan.getRingkasan(user.user_id);
    case 'pengaturan': return { user: user };
    default: return {};
  }
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}
