import { NavbarProps } from "../../types";


const Navbar = ({ expansions, openModal }: NavbarProps) => {
  return (
    <nav>
      <ol>
        <li
          className={`classic ${expansions.classic}`}
          onClick={() => openModal('classic')}
        >
          Vanilla
        </li>
        <li
          className={`tbc ${expansions.tbc}`}
          onClick={() => openModal('tbc')}
        >
          The Burning Crusade
        </li>
        <li
          className={`wotlk ${expansions.wotlk}`}
          onClick={() => openModal('wotlk')}
        >
          Wrath of the Lich King
        </li>
      </ol>
    </nav>
  );
}

export default Navbar;