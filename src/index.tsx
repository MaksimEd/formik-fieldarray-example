import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({
 dsn: "https://60002afc01ab49d2a70b94f3d8e1d778@sentry.io/1443351"
});

const render = (Component: React.ComponentType<{}>) => ReactDOM.render(<Component  />, document.getElementById('root'));

render(App);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

if ((module as any).hot) {
  // tslint:disable-next-line:no-console
  console.log('hot reload');
  (module as any).hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}