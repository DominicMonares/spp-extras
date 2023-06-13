import { useEffect, useState } from 'react';
import { Submenu } from 'types';
import arrow from '../../../../assets/buttons/button-arrow.webp';
import './DropdownMenu.css';

type Props = {
  final: boolean;
  handleSelection: (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
  subHovering: boolean;
  item: Submenu;
}

const SubmenuButton = ({ handleSelection, final, item, subHovering }: Props) => {
  const [active, setActive] = useState<string>('');

  // Keep parent sub-menu buttons hovering when children are hovering
  useEffect(() => subHovering ? setActive('-active') : setActive(''));

  // Need to lower font size for longer zone names
  const longTitle = item.title.length > 25 ? 'dd-long-sub-text' : '';

  return (
    <button
      id={item.id ? item.id.toString() : ''}
      className={`dd-sub-button${active}`}
      value={item.value ? item.value : ''}
      onClick={final ? handleSelection : () => {}}
      onMouseEnter={() => setActive('-active')}
      onMouseLeave={() => setActive('')}
    >
      <li
        id={item.id ? item.id.toString() : ''}
        className={`dd-sub-button-text ${longTitle}`}
        value={item.value ? item.value : ''}
      >
        {item.title}
      </li>
      {!final ? <img className="dd-sub-arrow-sm" src={arrow} /> : <></>}
    </button>
  );
}

export default SubmenuButton;
