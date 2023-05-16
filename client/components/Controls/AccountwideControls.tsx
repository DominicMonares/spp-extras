import { useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import Modal from 'react-modal';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeMessages } from '../../store/slices';
import { 
  openAchievementSocket, 
  openPetsMountsSocket,
  openReputationSocket 
} from '../../apiCalls';
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
    height: '276px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'black 2px solid'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

// Attach modal component to root div
Modal.setAppElement('#root');

const AccountWideControls = () => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [petsMountsChecked, setPetsMountsChecked] = useState<boolean>(true);
  const [repsChecked, setRepsChecked] = useState<boolean>(true);
  const [achsChecked, setAchsChecked] = useState<boolean>(true);
  const [botsChecked, setBotsChecked] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  // Open account-wide WebSocket
  const openSocket = () => {
    // Clear previous messages
    dispatch(storeMessages('del'));

    // Dispatch to display each message sent from server as they come in
    if (petsMountsChecked && !repsChecked && !achsChecked) {
      openPetsMountsSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsChecked);
    } else if (repsChecked && !petsMountsChecked && !achsChecked) {
      openReputationSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsChecked);
    } else if (achsChecked && !petsMountsChecked && !repsChecked) {
      openAchievementSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsChecked);
    } else if (petsMountsChecked && repsChecked && achsChecked) {
      // Run all
    }

    setModalIsOpen(false);
  }

  return (
    <div className="msg-controls">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Expansion Warning"
      >
        {!petsMountsChecked && !repsChecked && !achsChecked ? (
          <>
            <div className="msg-warning">Please select a data option</div>
            <MainButton handleClick={closeModal} buttonText="Close" />
          </>
        ) : (
          <>
            <div className="msg-warning"><b>WARNING</b></div>
            <div className="msg-warning">Transferring data between characters is irreversible.</div>
            <div className="msg-warning">Making a backup of your database through</div>
            <div className="msg-warning">the SPP Classics launcher before proceeding</div>
            <div className="msg-warning">is <b>strongly</b> recommended.</div>
            <div className="msg-warning-buttons">
              <MainButton handleClick={closeModal} buttonText="Cancel" />
              <MainButton handleClick={openSocket} buttonText="Continue" />
            </div>
          </>
        )}

      </Modal>
      <div>Choose the data you want to transfer</div>
      <Checkbox 
        callback={() => setPetsMountsChecked(!petsMountsChecked)} 
        isChecked={petsMountsChecked} 
        text="Pets & Mounts" 
      />
      <Checkbox 
        callback={() => setRepsChecked(!repsChecked)} 
        isChecked={repsChecked} 
        text="Reputations" 
      />
      <Checkbox 
        callback={() => setAchsChecked(!achsChecked)} 
        isChecked={achsChecked} 
        text="Achievements" 
      />
      <Checkbox 
        callback={() => setBotsChecked(!botsChecked)} 
        isChecked={botsChecked} 
        text="Include bot accounts" 
      />
      Note: You will not receive any achievements, pets, etc. from bot accounts.
      This only runs achievement transfers for bot accounts in addition to yours.
      <MainButton handleClick={openModal} buttonText="Start" />
      <div className="msg-options-container">
      </div>
    </div>
  );
}

export default AccountWideControls;
