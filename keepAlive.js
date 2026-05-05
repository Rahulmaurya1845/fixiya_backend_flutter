const https = require('https');

const keepAlive = (url) => {
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      https.get(url, (res) => {
        console.log(`🔄 Keep-alive ping: ${res.statusCode}`);
      }).on('error', (err) => {
        console.log('Keep-alive error:', err.message);
      });
    }, 10 * 60 * 1000); // Every 10 minutes
  }
};

module.exports = keepAlive;