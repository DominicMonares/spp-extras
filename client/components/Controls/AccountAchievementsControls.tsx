import { useState } from 'react';
import Modal from 'react-modal';
import MainButton from '../MainButton';
import { useAppDispatch } from '../../store/hooks';
import { storeMessages } from '../../store/slices';
import './Controls.css';


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
    height: '246px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'black 2px solid'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

// Attach modal component to root div
Modal.setAppElement('#root');

const AccountAchievementsControls = () => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const shareAchievements = () => {
    // NYI
  }

  return (
    <div className="aw-controls">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Expansion Warning"
      >
        <div className="aw-warning">WARNING</div>
        <div className="aw-warning">Sharing achievements is irreversible.</div>
        <div className="aw-warning">Please make a backup of your database through</div>
        <div className="aw-warning">the SPP Classics launcher before proceeding.</div>
        <div className="aw-warning-buttons">
          <MainButton handleClick={closeModal} buttonText="Cancel" />
          <MainButton handleClick={shareAchievements} buttonText="Continue" />
        </div>
      </Modal>
      <div className="aw-button-container">
        <MainButton handleClick={openModal} buttonText="Start" />
      </div>
    </div>
  );
}

export default AccountAchievementsControls;
