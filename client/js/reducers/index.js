import { combineReducers } from 'redux';
import apps from './apps';
import appstore from './appstore';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  apps,
  appstore,
  routing: routerReducer,
});

export default rootReducer;
