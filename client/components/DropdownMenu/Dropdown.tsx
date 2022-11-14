// Components
import MenuItems from './MenuItems';

// Types
import { Menu, Submenu } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  submenus: Menu,
  dropdown: boolean,
  depthLevel: number
}

const Dropdown = ({ submenus, dropdown, depthLevel }: Props) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <ul
      className={`dropdown ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}
    >
      {submenus.map((submenu: Submenu, index: number) => (
        <MenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
