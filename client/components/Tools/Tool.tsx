import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import button from '../../assets/buttons/button.png';
import bigButton from '../../assets/buttons/big-button.png';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.feature.selected);
  const [hovering, setHovering] = useState<string>('-hovering');

  const switchFeature = (feat: SelectedTool): void => {
    dispatch(storeTool(feat));
  }

  return (
    <li className={`tool ${tool === selectedTool ? 'active' : ''}`}>
      {tool === 'accountAchievements' ? (
        <button className="tool-button">
          <img src={bigButton} />
          <div className="tool-big-text-container">
            <div className="tool-label-text">{name.split(' ')[0]}</div>
            <div className="tool-label-text">{name.split(' ')[1]}</div>
            <div className="tool-big-button-overlay" onClick={() => switchFeature(tool)}></div>
          </div>
        </button>
      ) : (
        <button className="tool-button">
          <img className={`tool-button-img${hovering}`} src={button} />
          <div className={`tool-text-container${hovering}`}>
            <div className={`tool-label-text${hovering}`}>{name}</div>
            <div 
              className={`tool-button-overlay${hovering}`}
              onClick={() => switchFeature(tool)}
              onMouseEnter={() => setHovering('-hovering')}
              onMouseLeave={() => setHovering('')}
            />
          </div>
        </button>
      )}
    </li>
  );
}

export default Tool;
