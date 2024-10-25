const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://lv001.excellent.lv:7002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api/1/IVVc',
  },
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});

