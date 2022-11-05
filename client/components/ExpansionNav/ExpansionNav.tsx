import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateExpansion } from '../../store/slices/expansionSlice';

import type { SelectedExpansion } from '../../store/types';

import './ExpansionNav.css';

const ExpansionNav = () => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const dispatch = useAppDispatch();

  const switchExpansion = (xpac: SelectedExpansion): void => {
    dispatch(updateExpansion(xpac));
  }

  const selected = (xpac: SelectedExpansion): string => {
    if (xpac === expansion) return 'selected';
    return '';
  }

  return (
    <div className='xpac-nav'>
      <div 
        className={`vanilla ${selected('vanilla')}`} 
        onClick={() => switchExpansion('vanilla')}
      >
        Vanilla
      </div>
      <div className={`tbc ${selected('tbc')}`} onClick={() => switchExpansion('tbc')}>
        The Burning Crusade
      </div>
      <div className={`wotlk ${selected('wotlk')}`} onClick={() => switchExpansion('wotlk')}>
        Wrath of the Lich King
      </div>
    </div>
  );
}

export default ExpansionNav;
