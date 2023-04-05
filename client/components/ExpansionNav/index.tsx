import { useState } from 'react';
import Modal from 'react-modal';
import MainButton from '../MainButton';
import Tabs from './Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeExpansion,
  storeQuestTrackerAll,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone,
  storeTemplateQuests,
  storeTool
 } from '../../store/slices';
import { Expansion, ExpansionProps } from '../../types';
import './ExpansionNav.css';


// Modal styling must be passed down to Modal component via props
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '182px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'black 2px solid'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

// Attach modal component to root div
Modal.setAppElement('#root');

const ExpansionNav = ({ getAllData }: ExpansionProps) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Tracks the newly selected expansion
  const [nextExpansion, setNextExpansion] = useState<Expansion>(null);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const openExpansionModal = (xpac: Expansion) => {
    if (expansion === xpac) {
      return;
    } else {
      // Confirm selection through modal before dispatching
      setNextExpansion(xpac);
      openModal();
    }
  }

  const switchExpansion = () => {
    // Clear all stores that rely on expansion specific data
    dispatch(storeCharacters({}))
    dispatch(storeExpansion(nextExpansion));
    dispatch(storeCompletedQuests({}));
    dispatch(storeTemplateQuests({ alliance: {}, horde: {}, both: {} }));
    dispatch(storeQuestTrackerAll(false));
    dispatch(storeQuestTrackerCharacter({ character: { id: 0 } }));
    dispatch(storeQuestTrackerClass({ characterClass: { id: 0 } }));
    dispatch(storeQuestTrackerRace({ race: { id: 0 } }));
    dispatch(storeQuestTrackerType({ type: 'all quest types' }));
    dispatch(storeQuestTrackerZone({ zone: 'All Zones' }));
    dispatch(storeTool(''));

    // Re-fetch all data for new expansion
    getAllData(nextExpansion);
    closeModal();
  }

  return (
    <div className={`${expansion}-xpac-nav`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Expansion Warning"
      >
        <div className="xpac-warning">WARNING</div>
        <div className="xpac-warning">Switching expansions will unload all current data</div>
        <div className="xpac-warning-buttons">
          <MainButton handleClick={closeModal} buttonText="Cancel" />
          <MainButton handleClick={switchExpansion} buttonText="Continue" />
        </div>
      </Modal>
      <div className="nav-underline"></div>
      <Tabs openModal={openExpansionModal} />
    </div>
  );
}

export default ExpansionNav;
