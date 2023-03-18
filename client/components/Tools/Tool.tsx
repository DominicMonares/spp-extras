import { useEffect, useState } from 'react';
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
    <li className="tool">
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
            tool-big-button-text 
            ${hovering ? 'tool-big-text-hovering' : ''} 
            ${active ? 'tool-big-text-active' : ''}
          `}>
            {name.split(' ')[1]}
          </div>
        </button>
      ) : (
        <button
          className={`
            tool-button 
            ${hovering ? 'tool-hovering' : ''} 
            ${active ? 'tool-active' : ''}
          `}
          onClick={() => switchTool(tool)}
          onMouseEnter={() => setHovering('-hovering')}
          onMouseLeave={() => setHovering('')}
        >
          <div className={`
            tool-button-text 
            ${hovering ? 'tool-text-hovering' : ''} 
            ${active ? 'tool-text-active' : ''}
          `}>
            Quest Tracker
          </div>
        </button>
      )}
    </li>
  );
}

export default Tool;
