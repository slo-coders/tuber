import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

function AppWrap() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<AppWrap />, root);
