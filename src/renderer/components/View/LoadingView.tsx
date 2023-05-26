import { useEffect, useState } from 'react';
import MainBigHeader from '../MainBigHeader';
import './View.css';


const LoadingView = () => {
  const [loading, setLoading] = useState<string>('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading === 'Loading') {
        setLoading('Loading.');
      } else if (loading === 'Loading.') {
        setLoading('Loading..');
      } else if (loading === 'Loading..') {
        setLoading('Loading...');
      } else {
        setLoading('Loading');
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <MainBigHeader headerText={loading} />
    </div>
  );
}

export default LoadingView;
