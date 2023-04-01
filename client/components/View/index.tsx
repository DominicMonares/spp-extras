import ErrorView from './ErrorView';
import HomeView from "./HomeView";
import LoadingView from './LoadingView';
import QuestTrackerView from "./QuestTrackerView";
import { useAppSelector } from '../../store/hooks';
import { ViewProps } from '../../types';
import './View.css';

const View = ({ error, loading, retry }: ViewProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className={`
      view
      ${expansion}-view
      ${smallWindow ? 'small-view' : ''}
    `}>
      {loading && !error ? <LoadingView /> : <></>}
      {error ? <ErrorView error={error} retry={retry} /> : <></>}
      {!tool && !loading && !error ? <HomeView /> : <></>}
      {tool === 'questTracker' && !loading && !error ? (
        <QuestTrackerView />
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
