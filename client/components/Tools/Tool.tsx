import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeTool } from '../../store/slices';
import { ToolNavProps, SelectedTool } from '../../types';
import './Tools.css';


const Tool = ({ tool, name }: ToolNavProps) => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.feature.selected);

  const switchFeature = (feat: SelectedTool): void => {
    dispatch(storeTool(feat));
  }

  return (
    <>
      <div
        className={`tool ${tool === selectedTool ? 'active' : ''}`}
        onClick={() => switchFeature(tool)}
      >
        {name}
      </div>
    </>
  );
}

export default Tool;
