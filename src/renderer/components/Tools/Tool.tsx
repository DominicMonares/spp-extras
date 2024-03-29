import { useEffect, useState } from 'react';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { storeMessages, storeTool } from 'renderer/store/slices';
import { SelectedTool } from 'types';
import './Tools.css';

type Props = {
  tool: SelectedTool;
  name: string;
}

const Tool = ({ tool, name }: Props) => {
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
