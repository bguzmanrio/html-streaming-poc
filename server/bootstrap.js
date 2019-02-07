require('ignore-styles');
require('url-loader');
require('file-loader');
require('babel-polyfill');
require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
});
global.fetch = global.fetch || require('node-fetch');
require('./index');