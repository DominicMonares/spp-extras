import { useState } from 'react';
import Modal from 'react-modal';
import Tabs from './Tabs';
import WoWButton from '../WoWButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeExpansion, storeTool } from '../../store/slices';
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
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '182px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'black 1px solid'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

Modal.setAppElement('#root');

const ExpansionNav = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nextExpansion, setNextExpansion] = useState<SelectedExpansion>(null);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const openExpansionModal = (xpac: SelectedExpansion) => {
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
    dispatch(storeTool(null));
    closeModal();
  }

  return (
    <div className={`${expansion}-xpac-nav`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Expansion Warning"
      >
        <div className="xpac-warning">WARNING</div>
        <div className="xpac-warning">Switching expansions will unload all current data</div>
        <div className="xpac-warning-buttons">
          <WoWButton handleClick={closeModal} buttonText="Cancel" />
          <WoWButton handleClick={switchExpansion} buttonText="Continue" />
        </div>
      </Modal>
      <div className="nav-underline"></div>
      <Tabs openModal={openExpansionModal} />
    </div>
  );
}

export default ExpansionNav;
