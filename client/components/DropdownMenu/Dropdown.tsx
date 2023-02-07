import MenuItem from './MenuItem';
import { DropdownProps, Submenu } from '../../types';
import './DropdownMenu.css';


const Dropdown = ({ depthLevel, dropdown, questType, submenus }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu: Submenu, i: number) => (
        <MenuItem
          questType={questType}
          items={submenu}
          key={i}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
