import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import store, {persister} from './service/store/store'
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App/>
    </PersistGate>
  </Provider>

);

serviceWorkerRegistration.register();