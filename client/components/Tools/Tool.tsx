import { useEffect, useState } from 'react';
import WoWButton from '../WoWButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.tool.selected);
  const [hovering, setHovering] = useState<string>('');
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    tool === selectedTool ? setActive('-active') : setActive('');
  });

  const switchTool = (feat: SelectedTool): void => {
    setActive('-active');
    dispatch(storeTool(feat));
  }

  return (
    <li>
      {tool === 'accountAchievements' ? (
        <button
          className={`
            tool-big-button 
            ${hovering ? 'tool-big-hovering' : ''} 
            ${active ? 'tool-big-active' : ''}
          `}
          onClick={() => switchTool(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`
            tool-big-button-text 
            ${hovering ? 'tool-big-text-hovering' : ''} 
            ${active ? 'tool-big-text-active' : ''}
          `}>
            {name.split(' ')[0]}
          </div>
          <div className={`
            tool-big-button-text-bottom
            ${hovering ? 'tool-big-text-hovering-bottom' : ''} 
            ${active ? 'tool-big-text-active-bottom' : ''}
          `}>
            {name.split(' ')[1]}
          </div>
        </button>
      ) : (
        <WoWButton active={active} handleClick={() => switchTool(tool)} />
      )}
    </li>
  );
}

export default Tool;
