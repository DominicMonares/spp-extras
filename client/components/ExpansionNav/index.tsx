import { useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeExpansion, storeFeature } from '../../store/slices';
import { SelectedExpansion } from '../../types';
import './ExpansionNav.css';


// Modal Styling
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const ExpansionNav = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nextExpansion, setNextExpansion] = useState<SelectedExpansion>(null);

  const expansionActive = (xpac: SelectedExpansion) => xpac === expansion ? 'active' : '';
  const expansions = {
    classic: expansionActive('classic'),
    tbc: expansionActive('tbc'),
    wotlk: expansionActive('wotlk')
  };

  const openModal = () => {
    setModalIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const expansionModal = (xpac: SelectedExpansion) => {
    if (expansion === xpac) {
      return;
    } else if (expansion) {
      setNextExpansion(xpac);
      openModal();
    } else {
      dispatch(storeExpansion(xpac));
    }
  }

  const switchExpansion = () => {
    dispatch(storeExpansion(nextExpansion));
    dispatch(storeFeature(null));
    closeModal();
  }

  return (
    <div className="xpac-nav">
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
        <button onClick={switchExpansion}>Continue</button>
      </Modal>
      <div className={`classic ${expansions.classic}`} onClick={() => expansionModal('classic')}>
        Vanilla
      </div>
      <div className={`tbc ${expansions.tbc}`} onClick={() => expansionModal('tbc')}>
        The Burning Crusade
      </div>
      <div className={`wotlk ${expansions.wotlk}`} onClick={() => expansionModal('wotlk')}>
        Wrath of the Lich King
      </div>
    </div>
  );
}

export default ExpansionNav;
