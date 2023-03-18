import QuestTrackerView from "./QuestTrackerView";
import { useAppSelector } from '../../store/hooks';
import { ViewProps } from '../../types';
import './View.css';

const View = ({ error, loading, retry }: ViewProps) => {
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div>
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
