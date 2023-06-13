import { useAppSelector } from 'renderer/store/hooks';
import { ViewQuest } from 'types';
import complete from '../../../../assets/status/complete.webp';
import incomplete from '../../../../assets/status/incomplete.webp';

type Props = {
  quest: ViewQuest;
}

const Quest = ({ quest }: Props) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <tr className={`${expansion}-quest`}>
      <td className="qt-td3">
        {quest.completed ? (
          <img className="qt-complete" src={complete} />
        ) : (
          <img className="qt-incomplete" src={incomplete} />
        )}
      </td>
      <td className="qt-td2">{quest.entry}</td>
      <td className="qt-td1">{quest.Title}&lrm;</td>
    </tr>
  );
}

export default Quest;
