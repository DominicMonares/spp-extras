import { useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import Modal from 'react-modal';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeMessages } from '../../store/slices';
import { openAchievementSocket, openReputationSocket } from '../../apiCalls';
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
    } else if (tool === 'acctMountsPets') {
      setMsgTool('mounts and pets');
      setBotsActive(true);
    }
  }, [tool])

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  // Clear all current websocket message data then open new achievement connection
  const openSocket = () => {
    dispatch(storeMessages('del'));
    if (tool === 'acctAchievements') {
      openAchievementSocket((message: string) => {
        // Display each message sent from server as they come in
        dispatch(storeMessages(message));
      }, botsActive);
    } else if (tool === 'acctReps') {
      openReputationSocket((message: string) => {
        // Display each message sent from server as they come in
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
        <div className="msg-warning">is highly recommended.</div>
        <div className="msg-warning-buttons">
          <MainButton handleClick={closeModal} buttonText="Cancel" />
          <MainButton handleClick={openSocket} buttonText="Continue" />
        </div>
      </Modal>
      <Checkbox 
        callback={() => setBotsActive(!botsActive)} 
        isChecked={botsActive} 
        text="Apply to bot accounts" 
      />
      <MainButton handleClick={openModal} buttonText="Start" />
      <div className="msg-options-container">
      </div>
    </div>
  );
}

export default AccountWideControls;
