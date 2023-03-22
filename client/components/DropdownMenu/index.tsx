import MenuItems from './MenuItems';
import { useAppSelector } from '../../store/hooks';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ depthLevel, dropdown, dropdownType, menu }: DropdownProps) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);
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
            depthLevel={depthLevel}
          />
        );
      })}
    </ul>
  );
};

export default DropdownMenu;
