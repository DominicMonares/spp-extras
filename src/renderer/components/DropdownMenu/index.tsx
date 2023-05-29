import MenuItems from './MenuItems';
import { useAppSelector } from '../../store/hooks';
import { DropdownProps, Submenu } from '../../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ depthLevel, dropdown, dropdownType, menu }: DropdownProps) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);

  // Create class names depending on different factors
  depthLevel === undefined ? depthLevel = 0 : depthLevel = depthLevel + 1;
  const level = depthLevel ? `-l${depthLevel}` : '';
  const size = smallWindow ? '-sm' : '';
  const ddScroll = depthLevel === 3 ? 'dd-scroll' : '';
  const ddZone = dropdownType === 'zone' ? 'dd-zone' : '';

  return (
    <ul className={`
      ${depthLevel ? `dropdown${size}${level} ${ddScroll} ${ddZone}` : ''}
      ${dropdown ? 'dropdown-show' : ''}
    `}>
      {menu.map((m: Submenu, i: number) => {
        return (
          <MenuItems
            dropdownType={dropdownType}
            items={m}
            key={i}
            depthLevel={depthLevel as number} // TEMP TYPE
          />
        );
      })}
    </ul>
  );
};

export default DropdownMenu;
