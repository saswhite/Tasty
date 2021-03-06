import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Redux/Store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

/**  components */
import Loading from './Components/Loading/Loading';
import Modal from './Components/Modal/Modal';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={ store }>
    <App />
    <Loading/>
    <Modal/>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
