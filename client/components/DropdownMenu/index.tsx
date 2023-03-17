import MenuItems from './MenuItems';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ depthLevel, dropdown, dropdownType, menu }: DropdownProps) => {
  depthLevel === undefined ? depthLevel = 0 : depthLevel = depthLevel + 1;
  const level = depthLevel ? `-l${depthLevel}` : '';

  return (
    <ul className={`
        ${depthLevel ? `dropdown${level}` : ''}
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
