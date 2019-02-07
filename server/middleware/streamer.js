import manifest from '../../build/asset-manifest.json';

import { streamApp } from '../common/getApp';

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

export default async (req, res, next) => {
  res.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <title>Streamed App!</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/static/css/main.88a2b488.chunk.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet">
      </head>
    <body>
  `);
  res.write(getScripts());
  res.write('<div id="root">');
  
  try {
    const { data, stream } = await streamApp();
    stream.pipe(
      res, {
        end: false
      }
      );
      
    stream.on('end', () => {
      
      res.end('</div></body></html>');
    });
  } catch(err) {
    console.log(err);
    
    res.end('</body></html>');
  }
}