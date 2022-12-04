const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.9.198:8081/reservation/api',
      changeOrigin: true,
      pathRewrite: {
        pathRewrite: {
          "^/api": ""
        }
      }
    })
  );
};