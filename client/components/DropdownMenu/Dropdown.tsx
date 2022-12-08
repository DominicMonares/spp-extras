// Components
import MenuItems from './MenuItems';

// Types
import { Menu, Submenu, DropdownType } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  type: DropdownType,
  submenus: Menu,
  dropdown: boolean,
  depthLevel: number
}

const Dropdown = ({ type, submenus, dropdown, depthLevel }: Props) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <ul
      className={`dropdown ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}
    >
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
