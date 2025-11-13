// 🚨 VULNERABILITY 1: Hardcoded credentials
const DATABASE_PASSWORD = "admin123";  // Hardcoded secret!

// 🚨 VULNERABILITY 2: SQL Injection vulnerability
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId;  // SQL Injection!
    return db.query(query);
}

// 🚨 VULNERABILITY 3: Insecure crypto
const crypto = require('crypto');
const hash = crypto.createHash('md5');  // MD5 is broken!

module.exports = { getUserData };