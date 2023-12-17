import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './redux/store';

import Router from './Router';

import './css/basic.css';
import './css/styles.css';

let persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <Router />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));