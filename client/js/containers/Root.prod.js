import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Apps from './Apps';
import AppStore from './AppStore';
import { Router, Route, browserHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

export default class Root extends Component {
  
  render(){

    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
              <Route path="/" component={Apps} />
              <Route path="/appstore" component={AppStore}/>
          </Router>
        </div>
      </Provider>
    );
  }
}