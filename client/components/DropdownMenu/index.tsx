import MenuItem from './MenuItem';
import { DropdownMenuProps, Submenu } from '../../types';
import './DropdownMenu.css';


const DropdownMenu = ({ type, menu }: DropdownMenuProps) => {
  return (
    <>
      {menu.map((m: Submenu, i: number) => {
        const depthLevel = 0;
        return (
          <MenuItem
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
