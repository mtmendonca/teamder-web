import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { context } from '../providers/Auth';
import Apollo from '../providers/Apollo';
import Layout from './Layout';
import Login from './Login';
import Setup from './Setup';
import Events from './Events';
import Event from './Event';

export default function Main() {
  const { context: authContext, setContext } = useContext(context);
  if (!authContext) {
    return <Login setAuthContext={setContext} />;
  }
  return (
    <Layout>
      <Router>
        <Apollo>
          <Switch>
            <Route path="/" exact component={Events} />
            <Route path="/event/:id" exact component={Event} />
            <Route path="/setup" component={Setup} />
            <Route component={() => <h1>Hello there</h1>} />
          </Switch>
        </Apollo>
      </Router>
    </Layout>
  );
}
