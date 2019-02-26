import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const appReducer = combineReducers({
  main: mainReducer
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};