import MenuItem from './MenuItem';
import { DropdownMenuProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ menu, questType, }: DropdownMenuProps) => {
  return (
    <>
      {menu.map((m: Submenu, i: number) => {
        const depthLevel = 0;
        return (
          <MenuItem
            questType={questType}
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
