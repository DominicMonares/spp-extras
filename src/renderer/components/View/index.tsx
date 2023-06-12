import ErrorView from './ErrorView';
import HomeView from "./HomeView";
import LoadingView from './LoadingView';
import MessageView from './MessageView';
import QuestTrackerView from './QuestTrackerView';
import { useAppSelector } from 'renderer/store/hooks';
import './View.css';

type Props = {
  error: string;
  getAllData?: () => void;
  loading: boolean;
}

const View = ({ error, getAllData, loading }: Props) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);

  return (
    <div className={`view ${expansion}-view`}>
      {loading && !error ? <LoadingView /> : <></>}
      {error ? <ErrorView error={error} getAllData={getAllData} /> : <></>}
      {!tool && !loading && !error ? <HomeView /> : <></>}
      {tool === 'accountWide' && (!loading && !error) ? (
        <MessageView />
      ) : (
        <></>
      )}
      {tool === 'questTracker' && !loading && !error ? (
        <QuestTrackerView />
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
