import { useEffect, useState } from 'react';
import MainBigButton from '../MainBigButton';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.tool.selected);
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
        <MainBigButton
          active={active}
          handleClick={() => switchTool(tool)}
          buttonText={name}
        />
      ) : (
        <MainButton
          active={active}
          handleClick={() => switchTool(tool)}
          buttonText='Quest Tracker'
        />
      )}
    </li>
  );
}

export default Tool;
