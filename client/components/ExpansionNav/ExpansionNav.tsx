import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateExpansion } from '../../store/slices/expansionSlice';

import type { SelectedExpansion } from '../../store/types';

import './ExpansionNav.css';

const ExpansionNav = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const xpacActive = (xpac: SelectedExpansion) => xpac === expansion ? 'active' : '';
  const xpacs = {
    vanilla: xpacActive('vanilla'),
    tbc: xpacActive('tbc'),
    wotlk: xpacActive('wotlk')
  };

  const switchXpac = (xpac: SelectedExpansion): void => {
    dispatch(updateExpansion(xpac));
  }

  return (
    <div className='xpac-nav'>
      <div className={`vanilla ${xpacs.vanilla}`} onClick={() => switchXpac('vanilla')}>
        Vanilla
      </div>
      <div className={`tbc ${xpacs.tbc}`} onClick={() => switchXpac('tbc')}>
        The Burning Crusade
      </div>
      <div className={`wotlk ${xpacs.wotlk}`} onClick={() => switchXpac('wotlk')}>
        Wrath of the Lich King
      </div>
    </div>
  );
}

export default ExpansionNav;
