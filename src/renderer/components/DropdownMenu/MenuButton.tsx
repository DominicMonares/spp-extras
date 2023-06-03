import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import arrow from '../../../../assets/buttons/button-arrow.webp';
import './DropdownMenu.css';

type Props = {
  selected: () => string;
  subHovering: boolean;
  title: string;
}

const MenuButton = ({ selected, subHovering, title }: Props) => {
  const smallWindow = useAppSelector(state => state.window.smallWindow);

  // Need to use hovering class name to track nested sub-button hovering
  const [active, setActive] = useState<string>('');

  // Keep main button hovering if hovering over sub-buttons
  useEffect(() => subHovering ? setActive('-active') : setActive(''));

  // Font size depends on title length
  const titleLength = () => {
    const length = selected() ? selected().length : title.length;
    return length <= 12 ? 12 : length;
  }

  return (
    <button
      className={`dd-main-button${active}`}
      onMouseEnter={() => setActive('-active')}
      onMouseLeave={() => setActive('')}
    >
      <div className="dd-main-button-content">
        {!smallWindow ? (
          <img className={`dd-main-arrow${active}`} src={arrow} />
        ) : (
          <></>
        )}
        <div className={`dd-text dd-${titleLength()}${active}`}>
          {selected() ? selected() : title}
        </div>
        {smallWindow ? (
          <img className={`dd-main-arrow-sm${active}`} src={arrow} />
        ) : (
          <></>
        )}
      </div>
    </button>
  );
}

export default MenuButton;
