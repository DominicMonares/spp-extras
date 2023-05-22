import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import logo from '../../client/assets/logos/main.png';
import header from '../../client/assets/headers/main-header.png';
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    setInterval(() => {
      const newDots = dots.length === 3 ?  '' : dots + '.';
      setDots(newDots);
    }, 500);
  })

  return (
    <div>
      <img className="splash-logo" src={logo} />
      <div className="loading-container">
        <img src={header} />
        <div className="loading-text">Loading{dots}</div>
      </div>
    </div>
  )
}

root.render(<App />);
