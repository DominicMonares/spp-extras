import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import button from '../../assets/buttons/button.png';
import bigButton from '../../assets/buttons/big-button.png';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.feature.selected);

  const switchFeature = (feat: SelectedTool): void => {
    dispatch(storeTool(feat));
  }

  return (
    <li className={`tool ${tool === selectedTool ? 'active' : ''}`}>
      <button onClick={() => switchFeature(tool)}>
        {tool === 'accountAchievements' ? (
          <img src={bigButton} />
        ) : (
          <img src={button} />
        )}
      </button>
    </li>
  );
}

export default Tool;
