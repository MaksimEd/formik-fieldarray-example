import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import store from './store/store';
import withRoot from './withRoot';

import Formik from './modules/FormikUsers/FormikContainer';
import Login from './modules/Login';
import Page from './modules/Page';
import Table from './modules/Table/Table';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Redirect exact={true} from="/" to="/table" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/object" component={Page} />
          <Route exact path="/formik" component={Formik} />
          <Route exact path="/table" component={Table} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default withRoot(App);