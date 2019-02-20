import * as React from 'react';
import withRoot from './withRoot';
import { Switch, Route, Redirect } from 'react-router';
import Formik from './modules/FormikUsers/FormikContainer';
import Login from './modules/Login';
import Page from './modules/Page';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact={true} from="/" to="/formik" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/object" component={Page} />
        <Route exact path="/formik" component={Formik} />
      </Switch>
    </BrowserRouter>
  );
};

export default withRoot(App);