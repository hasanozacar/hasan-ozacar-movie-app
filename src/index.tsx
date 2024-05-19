// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store
import App from './App';
import './index.css'; // Import index.css
import './App.css'; //
ReactDOM.render(
  <Provider store={store}> {/* Wrap your App with Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
