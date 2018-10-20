import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux'
import * as serviceWorker from './serviceWorker';

const reducers = {
  session: sessionReducer
};
const reducer = combineReducers(reducers);

const store = createStore(reducer)

sessionService.initSessionService(store, { driver: 'COOKIES' });

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-west-2',
    userPoolId: 'us-west-2_uRvzvmQ8M',
    userPoolWebClientId: '4qc73d3q2dv0cfr7cg3q4lm7j1'
  }
});

ReactDOM.render(
  <Provider store={store}>
      <App store={store}/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
