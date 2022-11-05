import React, { useState } from 'react';
import Modal from 'react-modal';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateExpansion } from '../../store/slices/expansionSlice';

import type { SelectedExpansion } from '../../store/types';

import './ExpansionNav.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ExpansionNav = () => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nextXpac, setNextXpac] = useState<SelectedExpansion>(null);
  const expansion = useAppSelector(state => state.expansion.selected);
  const xpacActive = (xpac: SelectedExpansion) => xpac === expansion ? 'active' : '';
  const xpacs = {
    vanilla: xpacActive('vanilla'),
    tbc: xpacActive('tbc'),
    wotlk: xpacActive('wotlk')
  };

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const xpacModal = (xpac: SelectedExpansion) => {
    if (expansion) {
      setNextXpac(xpac);
      openModal();
    } else {
      dispatch(updateExpansion(xpac));
    }
  }

  const switchXpac = () => {
    dispatch(updateExpansion(nextXpac));
    closeModal();
  }

  return (
    <div className='xpac-nav'>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Expansion Warning"
      >
        <div>WARNING</div>
        Switching expansions will unload all current data.
        <button onClick={closeModal}>Cancel</button>
        <button onClick={switchXpac}>Continue</button>
      </Modal>
      <div className={`vanilla ${xpacs.vanilla}`} onClick={() => xpacModal('vanilla')}>
        Vanilla
      </div>
      <div className={`tbc ${xpacs.tbc}`} onClick={() => xpacModal('tbc')}>
        The Burning Crusade
      </div>
      <div className={`wotlk ${xpacs.wotlk}`} onClick={() => xpacModal('wotlk')}>
        Wrath of the Lich King
      </div>
    </div>
  );
}

export default ExpansionNav;
