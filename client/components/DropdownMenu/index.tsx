import MenuItems from './MenuItems';
import { DropdownMenuProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ menu, type, }: DropdownMenuProps) => {
  return (
    <>
      {menu.map((m: Submenu, i: number) => {
        const depthLevel = 0;
        return (
          <MenuItems
            questType={type}
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
