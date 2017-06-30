import React from "react";
import ReactDOM from "react-dom";
import { Provider }   from 'react-redux';
import { persistStore } from 'redux-persist';
import "./index.css";
import App from "./components/App";
import configureStore from './store/configureStore'
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();
persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
