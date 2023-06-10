import { useEffect, useState } from 'react';
import arrow from '../../../../assets/buttons/button-arrow.webp';
import './DropdownMenu.css';

type Props = {
  selected: () => string;
  subHovering: boolean;
  title: string;
}

const MenuButton = ({ selected, subHovering, title }: Props) => {
  // Need to use hovering class name to track nested sub-button hovering
  const [active, setActive] = useState<string>('');

  // Keep main button hovering if hovering over sub-buttons
  useEffect(() => subHovering ? setActive('-active') : setActive(''));

  // Font size depends on title length
  const titleLength = () => {
    const length = selected() ? selected().length : title.length;
    return length <= 11 ? 11 : length;
  }

  return (
    <button
      className={`dd-main-button${active}`}
      onMouseEnter={() => setActive('-active')}
      onMouseLeave={() => setActive('')}
    >
      <div className="dd-main-button-content">
        <div className={`dd-text dd-${titleLength()}${active}`}>
          {selected() ? selected() : title}
        </div>
        <img className={`dd-main-arrow-sm${active}`} src={arrow} />
      </div>
    </button>
  );
}

export default MenuButton;
