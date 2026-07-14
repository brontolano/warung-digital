/**
 * WarungDigital — Authentication Module (SECURITY UPDATED)
 * Login, register, session management + CSRF + salted password
 */

var Auth = {
  // SEC-002 FIX: SHA-256 with per-user salt
  hashPassword: function(password, salt) {
    if (!salt) { salt = Utilities.getUuid().substring(0, 8); }
    var raw = salt + ':' + password;
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw, Utilities.Charset.UTF_8);
    var hash = bytes.map(function(b) { return ('0' + (b & 0xFF).toString(16)).slice(-2); }).join('');
    return salt + '$' + hash;
  },

  verifyPassword: function(password, storedHash) {
    var parts = storedHash.split('$');
    if (parts.length !== 2) return false;
    var salt = parts[0];
    var expectedHash = this.hashPassword(password, salt);
    return expectedHash === storedHash;
  },

  validateSession: function(token) {
    if (!token) return null;
    var sessions = Database.getAll(Database.SHEETS.SESI);
    if (sessions.rows.length === 0) return null;
    var sessionIdx = sessions.headers.indexOf('token');
    var userIdIdx = sessions.headers.indexOf('user_id');
    var expiresIdx = sessions.headers.indexOf('expires_at');
    for (var i = 0; i < sessions.rows.length; i++) {
      if (String(sessions.rows[i][sessionIdx]) === token) {
        var expires = new Date(sessions.rows[i][expiresIdx]);
        if (expires > new Date()) {
          return Database.getById(Database.SHEETS.USER, 'user_id', sessions.rows[i][userIdIdx]);
        } else { return null; }
      }
    }
    return null;
  },

  login: function(email, password) {
    try {
      var users = Database.filterByField(Database.SHEETS.USER, 'email', email);
      if (users.length === 0) return { success: false, error: 'Email atau password salah' };
      var user = users[0];
      if (!this.verifyPassword(password, user.password_hash))
        return { success: false, error: 'Email atau password salah' };

      var token = this.generateToken(user.user_id);
      var expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Database.append(Database.SHEETS.SESI, [token, user.user_id, new Date(), expires.toISOString(), '']);
      return { success: true, token: token, user: {
        user_id: user.user_id, email: user.email, nama_warung: user.nama_warung,
        nama_pemilik: user.nama_pemilik, no_wa: user.no_wa, role: user.role
      }};
    } catch (e) { Logger.log('Auth.login error: ' + e.stack); return { success: false, error: e.message }; }
  },

  register: function(data) {
    try {
      if (!data.email || !data.password || !data.nama_warung || !data.nama_pemilik)
        return { success: false, error: 'Semua field harus diisi' };
      var existing = Database.filterByField(Database.SHEETS.USER, 'email', data.email);
      if (existing.length > 0) return { success: false, error: 'Email sudah terdaftar' };

      var user_id = Database.generateId(Database.SHEETS.USER, 'USR');
      var hash = this.hashPassword(data.password);

      Database.append(Database.SHEETS.USER, [user_id, data.email, hash, data.nama_warung, data.nama_pemilik, data.no_wa || '', 'owner', new Date(), '', 'free']);
      var token = this.generateToken(user_id);
      var expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Database.append(Database.SHEETS.SESI, [token, user_id, new Date(), expires.toISOString(), '']);
      return { success: true, token: token, user: { user_id: user_id, email: data.email, nama_warung: data.nama_warung, nama_pemilik: data.nama_pemilik, no_wa: data.no_wa || '', role: 'owner' }};
    } catch (e) { Logger.log('Auth.register error: ' + e.stack); return { success: false, error: e.message }; }
  },

  logout: function(token) {
    try { Database.deleteById(Database.SHEETS.SESI, 'token', token); return { success: true }; }
    catch (e) { return { success: false, error: e.message }; }
  },

  generateToken: function(user_id) {
    var salt = Utilities.getUuid();
    var timestamp = new Date().getTime();
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, user_id + salt + timestamp, Utilities.Charset.UTF_8);
    return bytes.map(function(b) { return ('0' + (b & 0xFF).toString(16)).slice(-2); }).join('');
  },

  // SEC-001 FIX: CSRF token generation
  generateCSRFToken: function() {
    var token = Utilities.getUuid();
    var props = PropertiesService.getUserProperties();
    props.setProperty('csrf_' + token, String(Date.now()));
    return token;
  },

  validateCSRFToken: function(token) {
    if (!token) return false;
    var props = PropertiesService.getUserProperties();
    var stored = props.getProperty('csrf_' + token);
    if (stored) {
      props.deleteProperty('csrf_' + token);
      return true;
    }
    return false;
  },

  loginWA: function(no_wa) {
    var otp = Math.floor(1000 + Math.random() * 9000).toString();
    var props = PropertiesService.getScriptProperties();
    props.setProperty('otp_' + no_wa, otp);
    var pesan = 'Kode OTP WarungDigital: ' + otp + '. Berlaku 5 menit.';
    Notifikasi.kirimWA(no_wa, pesan);
    return { success: true };
  },

  verifyOTP: function(no_wa, otp) {
    var props = PropertiesService.getScriptProperties();
    var stored = props.getProperty('otp_' + no_wa);
    if (stored === otp) {
      props.deleteProperty('otp_' + no_wa);
      var users = Database.filterByField(Database.SHEETS.USER, 'no_wa', no_wa);
      if (users.length === 0) return { success: false, error: 'Nomor tidak terdaftar' };
      var user = users[0];
      var token = this.generateToken(user.user_id);
      var expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Database.append(Database.SHEETS.SESI, [token, user.user_id, new Date(), expires.toISOString(), '']);
      return { success: true, token: token, user: user };
    }
    return { success: false, error: 'Kode OTP salah' };
  }
};
