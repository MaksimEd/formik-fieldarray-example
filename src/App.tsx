import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import store from './store/store';
import withRoot from './withRoot';

import Formik from './modules/FormikUsers/FormikContainer';
import Login from './modules/Login';
import Page from './modules/Page';
import Table from './modules/Table/Table';
import MapboxDraw from './modules/MapboxDraw/MapboxDraw';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Redirect exact={true} from="/" to="/mapboxDraw" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/object" component={Page} />
          <Route exact path="/formik" component={Formik} />
          <Route exact path="/table" component={Table} />
          <Route exact path="/mapboxDraw" component={MapboxDraw} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default withRoot(App);