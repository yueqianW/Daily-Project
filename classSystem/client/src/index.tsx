import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch,Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store from './store';
import Tabs from './components/Tabs';
import {Spin} from 'antd';
const Home = React.lazy(()=>import(/*webpackPreload:true*/'./routes/Home'));
const Mine = React.lazy(()=>import(/*webpackPrefetch:true*/'./routes/Mine'));
const Register = React.lazy(()=>import(/*webpackPrefetch:true*/'./routes/Register'));
const Login = React.lazy(()=>import(/*webpackPrefetch:true*/'./routes/Login'));
const Profile = React.lazy(()=>import(/*webpackPrefetch:true*/'./routes/Profile'));
const Detail = React.lazy(()=>import(/*webpackPrefetch:true*/'./routes/Detail'));
import history from './store/history';
import './assets/style/global.less'
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Suspense fallback={<Spin/>}>
        <main className="main-container">
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/mine" component={Mine}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/detail/:id" component={Detail}/>
            <Redirect to="/"/>
          </Switch>
        </main>
      </React.Suspense>
      <Tabs/>
    </ConnectedRouter>
  </Provider>
  ,document.getElementById('root'));