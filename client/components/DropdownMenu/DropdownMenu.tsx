// Components
import MenuItems from './MenuItems';

// Styling
import './DropdownMenu.css';


interface Props {
  menu: any // temp any
}

const DropdownMenu = ({ menu }: Props) => {
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
