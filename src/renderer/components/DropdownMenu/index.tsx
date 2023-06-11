import MenuItems from './MenuItems';
import { useAppSelector } from '../../store/hooks';
import {
  DropdownType,
  Menu,
  Submenu
} from '../../../types';
import './DropdownMenu.css';

type Props = {
  dropdownType: DropdownType;
  menu: Menu;
  dropdown?: boolean;
  depthLevel?: number | undefined;
}

const DropdownMenu = ({ depthLevel, dropdown, dropdownType, menu }: Props) => {
  const windowHeight = useAppSelector(state => state.window.windowHeight);

  // Create class names depending on different factors
  depthLevel === undefined ? depthLevel = 0 : depthLevel = depthLevel + 1;
  const level = depthLevel ? `-l${depthLevel}` : '';
  // const size = smallWindow ? '-sm' : '';
  // const subMultiplier = ((windowHeight - 500) / 25)
  const ddScroll = depthLevel === 3 ? 'dd-scroll' : '';
  const ddZone = dropdownType === 'zone' && depthLevel === 1 ? 'dd-zone' : '';

  return (
    <div
      className={`
        ${depthLevel ? `dropdown${level} ${ddScroll} ${ddZone}` : ''}
        ${dropdown ? 'dropdown-show' : ''}
      `}
      style={`dropdown${level}` === 'dropdown-l3'
        ? { height: Math.floor((windowHeight - 350) / 25) * 25 }
        : {}
      }
    >
      {menu.map((m: Submenu, i: number) => {
        return (
          <MenuItems
            dropdownType={dropdownType}
            items={m}
            key={i}
            depthLevel={depthLevel}
          />
        );
      })}
    </div>
  );
};

export default DropdownMenu;
