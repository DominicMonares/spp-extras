import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.feature.selected);
  const [hovering, setHovering] = useState<string>('');

  const switchFeature = (feat: SelectedTool): void => {
    dispatch(storeTool(feat));
  }

  return (
    <li className={`tool ${tool === selectedTool ? 'active' : ''}`}>
      {tool === 'accountAchievements' ? (
        <button
          className={`tool-big-button${hovering}`}
          onClick={() => switchFeature(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`tool-big-button-text${hovering}`}>{name.split(' ')[0]}</div>
          <div className={`tool-big-button-text${hovering}`}>{name.split(' ')[1]}</div>
        </button>

      ) : (
        <button
          className={`tool-button${hovering}`}
          onClick={() => switchFeature(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`tool-button-text${hovering}`}>Quest Tracker</div>
        </button>
      )}
    </li>
  );
}

export default Tool;
