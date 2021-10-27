import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Layout from '../layouts';
import Activity from '../pages/Activity';
import ActivityDetail from '../pages/ActivityDetail';

const App = () => (
  <HashRouter basename="/">
    <Layout>
      <Switch>
        <Route exact path="/" component={Activity} />
        <Route exact path="/detail/:id" component={ActivityDetail} />
      </Switch>
    </Layout>
  </HashRouter>
);

export default App;
