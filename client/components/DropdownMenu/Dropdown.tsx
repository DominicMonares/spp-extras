import MenuItems from './MenuItems';
import './DropdownMenu.css';

interface MenuItemsProps {
  submenus: any, // temp any
  dropdown: any, // temp any
  depthLevel: number
}

const Dropdown = ({ submenus, dropdown, depthLevel }: MenuItemsProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <ul
      className={`dropdown ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}
    >
      {submenus.map((submenu: any, index: any) => ( // temp any
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
