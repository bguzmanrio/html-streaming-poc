import { Helmet } from 'react-helmet';
import path from 'path';
import fs from 'fs';

import manifest from '../../build/asset-manifest.json';

import { renderApp } from '../common/getApp';

const formatScripts = scripts => scripts.map(c => `<script type="text/javascript" src="${c}"></script>`).join('');

const getScripts = () =>
  formatScripts(
    Object.keys(manifest)
      .filter(key => key.endsWith('.js') && key !== 'service-worker.js' && key !== 'main.js')
      .map(key => manifest[key])
  );

const getMainScript = () =>
  formatScripts(
    Object.keys(manifest)
      .filter(key => key === 'main.js')
      .map(key => manifest[key])
  );

export default (req, res, next) => {

  const filePath = path.resolve(__dirname, '..', '..', 'public', 'index.html');

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    const { data, html } = await renderApp();

    const helmet = Helmet.renderStatic();

    return res.send(
      htmlData
      .replace('</head>', '<link href="/static/css/main.88a2b488.chunk.css" rel="stylesheet"></head>')

      .replace('<div id="root"></div>', `${getScripts()}<div id="root">${html}<script>window['__CONTEXT__'] = ${JSON.stringify(data)}</script>${getMainScript()}</div>`)

      .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
    );
  });
}