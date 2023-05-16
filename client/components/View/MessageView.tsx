import { useEffect, useState } from 'react';
import MainBigHeader from '../MainBigHeader';
import { useAppSelector } from '../../store/hooks';
import './View.css';


const MessageView = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const messages = useAppSelector(state => state.websocket.messages);
  const tool = useAppSelector(state => state.tool.selected);
  const [headerTool, setHeaderTool] = useState<string>('DATA');

  // useEffect(() => {
  //   if (tool === 'acctAchievements') {
  //     setHeaderTool('achievements');
  //   } else if (tool === 'acctReps') {
  //     setHeaderTool('reputations');
  //   } else if (tool === 'acctPetsMounts') {
  //     setHeaderTool('mounts & pets');
  //   }
  // })

  return (
    <div>
      {messages.length ? (
        <ol className={`messages ${expansion}-messages`}>
          {messages.map((m: string, i) => {
            return <li className="message" key={i}>{m}&lrm;</li>
          }).reverse()}
        </ol>
      ) : (
        <MainBigHeader headerText={`Share ${headerTool} between all characters`} /> 
      )}
    </div>
  );
}

export default MessageView;
