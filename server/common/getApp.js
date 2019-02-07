import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../src/App';

const wait = (time = 5000) => new Promise(resolve => setTimeout(resolve, time));

const wrapApp = data => (
  <App data={data} />
);

const getData = () => App.requestData();

export const renderApp = async () => {
  const data = await getData();
  await wait();

  return {
    data,
    html: ReactDOMServer.renderToString(wrapApp(data))
  };
};

export const streamApp = async () => {
  const data = await getData();
  await wait();

  return {
    data,
    stream: ReactDOMServer.renderToNodeStream(wrapApp(data))
  }
};

export default {
  renderApp,
  streamApp
};