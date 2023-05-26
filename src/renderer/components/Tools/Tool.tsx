import { useEffect, useState } from 'react';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeMessages, storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();

  // Keep currently selected tool active
  const selectedTool = useAppSelector(state => state.tool.selected);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    tool === selectedTool ? setActive('-active') : setActive('');
  });

  const switchTool = (feat: SelectedTool): void => {
    setActive('-active');
    dispatch(storeMessages('del'))
    dispatch(storeTool(feat));
  }

  return (
    <li>
      <MainButton
        active={active}
        handleClick={() => switchTool(tool)}
        buttonText={name}
      />
    </li>
  );
}

export default Tool;
