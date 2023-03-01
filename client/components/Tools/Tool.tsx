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
      {tool === 'accountAchievements' ? (
        <button 
          className="tool-button"
          onClick={() => switchFeature(tool)}
        >
          <img src={bigButton} />
          <div className="tool-big-label-text">{name}</div>
        </button>
      ) : (
        <button 
          className="tool-button"
          onClick={() => switchFeature(tool)}
        >
          <img src={button} />
          <div className="tool-label-text">{name}</div>
        </button>
      )}
    </li>
  );
}

export default Tool;
