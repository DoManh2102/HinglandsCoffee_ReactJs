import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/configStore';
import reportWebVitals from './reportWebVitals';

//setup redux
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
