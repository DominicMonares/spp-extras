import MenuItems from './MenuItems';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const Dropdown = ({ type, submenus, dropdown, depthLevel }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu: Submenu, i: number) => (
        <MenuItems
          type={type}
          items={submenu}
          key={i}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
