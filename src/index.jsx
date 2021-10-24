import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/layouts/main-layout.css';
import './styles/components/modals.css';
import './styles/components/button.css';
import './styles/components/indicator.css';
import './styles/components/priority-dropdown.css';
import './styles/components/sort-dropdown.css';
import './styles/layouts/activity.css';
import './styles/layouts/activity-detail.css';
import App from './routers';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
