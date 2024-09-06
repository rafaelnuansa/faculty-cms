import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

//import RecoilRoot dari Recoil
import { RecoilRoot } from 'recoil';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)