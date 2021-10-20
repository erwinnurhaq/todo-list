import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './routers';

ReactDOM.render(
  <React.StrictMode>
    {!process.env.REACT_APP_VER_NOTES && <h1>Hayo maling hayo...</h1>}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
