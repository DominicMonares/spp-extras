import MainBigHeader from '../MainBigHeader';
import { useAppSelector } from '../../store/hooks';


const AccountAchievementsView = () => {
  const messages = useAppSelector(state => state.websocket.messages);

  return (
    <div>
      {!messages.length ? (
        <ol>
          {messages.map((m: string) => {
            return <li>{m}</li>
          })}
        </ol>
      ) : (
        <MainBigHeader headerText="Share achievements between all characters" /> 
      )}
    </div>
  );
}

export default AccountAchievementsView;
