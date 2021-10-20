import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './routers';

console.log(process.env.NOTES || 'Jangan Maling Oi!');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
