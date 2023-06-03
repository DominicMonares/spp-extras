import MessageView from './MessageView';
import ErrorView from './ErrorView';
import HomeView from "./HomeView";
import LoadingView from './LoadingView';
import QuestTrackerView from "./QuestTrackerView";
import { useAppSelector } from '../../store/hooks';
import './View.css';

type Props = {
  error: string;
  getAllData: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const View = ({ error, getAllData, loading, setLoading }: Props) => {
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
      {error ? <ErrorView error={error} getAllData={getAllData} /> : <></>}
      {!tool && !loading && !error ? <HomeView /> : <></>}
      {tool === 'accountWide' && (!loading && !error) ? (
        <MessageView />
      ) : (
        <></>
      )}
      {tool === 'questTracker' && !loading && !error ? (
        <QuestTrackerView setLoading={setLoading} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
