import MenuItems from './MenuItems';
import './DropdownMenu.css';

interface DropdownMenuProps {
  menu: any // temp any
}

const DropdownMenu = ({ menu }: DropdownMenuProps) => {
  return (
    <>
      {menu.map((m: any) => { // temp any
        const depthLevel = 0;
        return (
          <MenuItems
            items={m}
            depthLevel={depthLevel}
          />
        );
      })}
    </>
  );
};

export default DropdownMenu;
