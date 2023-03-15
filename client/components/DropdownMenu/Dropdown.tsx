import MenuItems from './MenuItems';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const Dropdown = ({ depthLevel, dropdown, dropdownType, submenus }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const submenu = depthLevel > 1 ? '-submenu' : '';

  return (
    <ul className={`dropdown${submenu} ${dropdown ? 'dropdown-show' : ''}`}>
      {submenus.map((submenu: Submenu, i: number) => (
        <MenuItems
          dropdownType={dropdownType}
          items={submenu}
          key={i}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
