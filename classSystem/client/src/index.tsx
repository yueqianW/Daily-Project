import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConnectedRouter from 'connected-react-router';
import store from './store';
import history from './store/history';
import Home from './routes/Home';
import Mine from './routes/Mine';
import Profile from './routes/Profile';
import Tabs from './components/Tabs';
import './assets/style/global.less';
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main className="main-container">
        <Switch>
          <Route path="/" component={Home}></Route>
          <Route path="/mine" component={Mine}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
      <Tabs></Tabs>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
