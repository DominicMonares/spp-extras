import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.feature.selected);
  const [hovering, setHovering] = useState<string>('');
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    tool === selectedTool ? setActive('-active') : setActive('');
  });

  const switchFeature = (feat: SelectedTool): void => {
    setActive('-active');
    dispatch(storeTool(feat));
  }

  return (
    <li className="tool">
      {tool === 'accountAchievements' ? (
        <button
          className={`tool-big-button${hovering}${active}`}
          onClick={() => switchFeature(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`tool-big-button-text${hovering}${active}`}>{name.split(' ')[0]}</div>
          <div className={`tool-big-button-text${hovering}${active}`}>{name.split(' ')[1]}</div>
        </button>
      ) : (
        <button
          className={`tool-button${hovering}${active}`}
          onClick={() => switchFeature(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`tool-button-text${hovering}${active}`}>Quest Tracker</div>
        </button>
      )}
    </li>
  );
}

export default Tool;
