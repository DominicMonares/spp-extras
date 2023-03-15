import MenuItems from './MenuItems';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ depthLevel, dropdown, dropdownType, menu }: DropdownProps) => {
  depthLevel === undefined ? depthLevel = 0 : depthLevel = depthLevel + 1;
  const submenu = depthLevel > 1 ? '-submenu' : '';

  return (
    <ul className={`
      ${depthLevel ? `dropdown${submenu}` : ''}
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
