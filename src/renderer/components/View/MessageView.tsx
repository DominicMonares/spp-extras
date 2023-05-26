import MainBigHeader from '../MainBigHeader';
import { useAppSelector } from '../../store/hooks';
import './View.css';


const MessageView = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const messages = useAppSelector(state => state.websocket.messages);

  return (
    <div>
      {messages.length ? (
        <ol className={`messages ${expansion}-messages`}>
          {messages.map((m: string, i) => {
            return <li className="message" key={i}>{m}&lrm;</li>
          }).reverse()}
        </ol>
      ) : (
        <MainBigHeader headerText={`Transfer data between all characters`} /> 
      )}
    </div>
  );
}

export default MessageView;
