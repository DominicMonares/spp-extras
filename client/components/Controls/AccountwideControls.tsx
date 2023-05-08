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
  const tool = useAppSelector(state => state.tool.selected);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [botsActive, setBotsActive] = useState<boolean>(true);
  const [msgTool, setMsgTool] = useState<string>('');

  useEffect(() => {
    if (tool === 'acctAchievements') {
      setMsgTool('achievements');
      setBotsActive(true);
    } else if (tool === 'acctReps') {
      setMsgTool('reputations');
      setBotsActive(true);
    } else if (tool === 'acctPetsMounts') {
      setMsgTool('pets and mounts');
      setBotsActive(true);
    }
  }, [tool])

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
    if (tool === 'acctAchievements') {
      openAchievementSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsActive);
    } else if (tool === 'acctReps') {
      openReputationSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsActive);
    } else if (tool === 'acctPetsMounts') {
      openPetsMountsSocket((message: string) => {
        dispatch(storeMessages(message));
      }, botsActive);
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
        <div className="msg-warning">WARNING</div>
        <div className="msg-warning">Sharing {msgTool} is irreversible.</div>
        <div className="msg-warning">Making a backup of your database through</div>
        <div className="msg-warning">the SPP Classics launcher before proceeding</div>
        <div className="msg-warning">is strongly recommended.</div>
        <div className="msg-warning-buttons">
          <MainButton handleClick={closeModal} buttonText="Cancel" />
          <MainButton handleClick={openSocket} buttonText="Continue" />
        </div>
      </Modal>
      {tool === 'acctAchievements' ? (
        <Checkbox 
          callback={() => setBotsActive(!botsActive)} 
          isChecked={botsActive} 
          text="Apply to bot accounts" 
        />
      ) : (
        <></>
      )}
      <MainButton handleClick={openModal} buttonText="Start" />
      <div className="msg-options-container">
      </div>
    </div>
  );
}

export default AccountWideControls;
