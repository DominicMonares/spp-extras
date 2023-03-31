import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import MainBigHeader from '../MainBigHeader';
import { ViewProps } from '../../types';
import './View.css';


const HomeView = ({ loading, error }: ViewProps) => {
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div>
      {loading ? <Loading /> : <></>}
      {!loading && !error && !tool ? (
        <MainBigHeader headerText="Please select a tool" />
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomeView;
