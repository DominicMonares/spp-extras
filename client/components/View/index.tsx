import HomeView from "./HomeView";
import ErrorView from './ErrorView';
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
      {error ? (
        <ErrorView loading={loading} error={error} retry={retry} />
      ) : (
        <></>
      )}
      {!tool ? (
        <HomeView
          error={error}
          loading={loading}
        />
      ) : (
        <></>
      )}
      {tool === 'questTracker' ? (
        <QuestTrackerView
          error={error}
          loading={loading}
          retry={retry}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
