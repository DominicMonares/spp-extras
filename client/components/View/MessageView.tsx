import MainBigHeader from '../MainBigHeader';
import { useAppSelector } from '../../store/hooks';


const MessageView = () => {
  const messages = useAppSelector(state => state.websocket.messages);

  return (
    <div>
      {messages.length ? (
        <ol className="">
          {messages.map((m: string, i) => {
            return <li key={i}>{m}</li>
          })}
        </ol>
      ) : (
        <MainBigHeader headerText="Share achievements between all characters" /> 
      )}
    </div>
  );
}

export default MessageView;
