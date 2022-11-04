import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateExpansion } from '../../store/slices/expansionSlice';

import type { SelectedExpansion } from '../../store/types';

import './ExpansionNav.css';

const ExpansionNav = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion);

  const switchExpansion = (xpac: SelectedExpansion): void => {
    dispatch(updateExpansion(xpac));
  }

  const navButtonClass = (xpac: SelectedExpansion): string => {
    if (xpac === expansion.selected) return 'nav-button-sel';
    return 'nav-button';
  }

  return (
    <div className='xpac-nav'>
      <div className={navButtonClass('vanilla')} onClick={() => switchExpansion('vanilla')}>
        Vanilla
      </div>
      <div className={navButtonClass('tbc')} onClick={() => switchExpansion('tbc')}>
        The Burning Crusade
      </div>
      <div className={navButtonClass('wotlk')} onClick={() => switchExpansion('wotlk')}>
        Wrath of the Lich King
      </div>
    </div>
  );
}

export default ExpansionNav;
