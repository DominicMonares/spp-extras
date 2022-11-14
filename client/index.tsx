// React
import * as ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

// Components
import App from './components/App';

// Styling
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
