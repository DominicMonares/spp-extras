// Components
import MenuItems from './MenuItems';

// Types
import { Menu, Submenu } from '../../types/dropdown';

// Styling
import './DropdownMenu.css';


interface Props {
  menu: Menu
}

const DropdownMenu = ({ menu }: Props) => {
  return (
    <>
      {menu.map((m: Submenu, i: number) => {
        const depthLevel = 0;
        return (
          <MenuItems
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
