import QuestTrackerView from "./QuestTrackerView";
import { useAppSelector } from '../../store/hooks';
import { ViewProps } from '../../types';
import './View.css';

const View = ({ error, loading, retry }: ViewProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const smallWindow = useAppSelector(state => state.window.smallWindow);
  const tool = useAppSelector(state => state.tool.selected);

  const smallWindowClass = () => smallWindow ? 'small-view' : '';

  return (
    <div className={`view ${smallWindowClass()} ${expansion}-view`}>
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
