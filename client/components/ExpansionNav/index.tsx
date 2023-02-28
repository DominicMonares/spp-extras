import { useState } from 'react';
import Modal from 'react-modal';
import Tabs from './Tabs';
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
    dispatch(storeFeature(null));
    closeModal();
  }

  return (
    <div className={`xpac-nav-${expansion}`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Expansion Warning"
      >
        <div>WARNING</div>
        Switching expansions will unload all current data.
        <button onClick={closeModal}>Cancel</button>
        <button onClick={switchExpansion}>Continue</button>
      </Modal>
      <Tabs openModal={openExpansionModal} />
    </div>
  );
}

export default ExpansionNav;
