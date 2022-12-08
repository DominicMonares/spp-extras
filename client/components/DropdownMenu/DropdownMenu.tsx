// Components
import MenuItems from './MenuItems';

// Types
import { Menu, Submenu, DropdownType } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  menu: Menu,
  type: DropdownType
}

const DropdownMenu = ({ type, menu }: Props) => {
  return (
    <>
      {menu.map((m: Submenu, i: number) => {
        const depthLevel = 0;
        return (
          <MenuItems
            type={type}
            items={m}
            key={i}
            depthLevel={depthLevel}
          />
        );
      })}
    </>
  );
};

export default DropdownMenu;
