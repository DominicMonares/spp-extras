import { useState } from 'react';
import Modal from 'react-modal';
import MainButton from '../MainButton';
import Tabs from './Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeExpansion,
  storeMessages,
  storeQuestTrackerAll,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone,
  storeTemplateQuests,
  storeTool
 } from '../../store/slices';
import { Expansion, ExpansionSetting } from '../../../types';
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
    border: 'black 2px solid',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

// Attach modal component to root div
Modal.setAppElement('#root');

type Props = {
  getAllData: (e?: unknown, xpac?: ExpansionSetting) => void;
}

const ExpansionNav = ({ getAllData }: Props) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Tracks the newly selected expansion
  const [nextExpansion, setNextExpansion] = useState<ExpansionSetting>('');

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
    dispatch(storeCharacters({ alliance: {}, horde: {} }));
    dispatch(storeExpansion(nextExpansion));
    dispatch(storeCompletedQuests({}));
    dispatch(storeMessages('del'));
    dispatch(storeTemplateQuests({ alliance: {}, horde: {}, neutral: {} }));
    dispatch(storeQuestTrackerAll(false));
    dispatch(storeQuestTrackerCharacter({ id: 0, name: '', value: '' }));
    dispatch(storeQuestTrackerClass({ id: 0, title: '', value: 0 }));
    dispatch(storeQuestTrackerRace({ id: 0, title: '', value: 0 }));
    dispatch(storeQuestTrackerType(''));
    dispatch(storeQuestTrackerZone('All Zones'));
    dispatch(storeTool(''));

    // Re-fetch all data for new expansion
    getAllData(null, nextExpansion);
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
