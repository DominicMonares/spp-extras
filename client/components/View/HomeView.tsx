import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import { ViewProps } from '../../types';
import label from '../../assets/labels/long-label.png';
import './View.css';


const HomeView = ({ loading, error }: ViewProps) => {
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div>
      {loading ? <Loading /> : <></>}
      {!loading && !error && !tool ? (
        <div className="qt-select-header">
          <img src={label} />
          <div className="qt-select-text">
            Please select a tool
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomeView;
