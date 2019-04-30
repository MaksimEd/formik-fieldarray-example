import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { rootReducer } from './reducers';

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store: any;
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(reduxThunk, reduxLogger))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(reduxThunk));
}

if ((module as any).hot) {
  (module as any).hot.accept('./reducers', () => {
    // tslint:disable-next-line:no-console
    console.log('hot reload reducers');
    const nextRootReducer = require('./reducers').rootReducer;
    store.replaceReducer(nextRootReducer);
  });
}

export type AppReduxState = ReturnType<typeof rootReducer>;
export default store;
