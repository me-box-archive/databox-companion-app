import { combineReducers } from 'redux';
import apps from './apps';
import appstore from './appstore';
import installer from './installer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  apps,
  appstore,
  installer,
  routing: routerReducer,
});

export default rootReducer;
