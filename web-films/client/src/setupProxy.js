const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/survey',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: false,
      pathRewrite: function (path, req) { return path.replace('/survey', '') },
    })
  );
};