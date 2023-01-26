import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
