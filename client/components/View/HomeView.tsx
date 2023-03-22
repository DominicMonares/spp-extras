import { useAppSelector } from '../../store/hooks';
import Loading from '../Loading';
import { ViewProps } from '../../types';
import label from '../../assets/labels/long-label.png';
import './View.css';


const HomeView = ({ loading, error, retry }: ViewProps) => {
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div>
      {loading ? <Loading /> : <></>}
      {error ? (
        <div>
          <div>ERROR: {JSON.stringify(error)}</div>
          <div>Please ensure the database is still running.</div>
          <div onClick={retry}>Retry connection</div>
        </div>
      ) : (
        <></>
      )}
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
