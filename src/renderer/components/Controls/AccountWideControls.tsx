import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Checkbox from '../Checkbox';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { storeMessages } from 'renderer/store/slices';
import { AccountWideSettings, ElectronCallback } from 'types';
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
    height: '270px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'black 2px solid',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

// Attach modal component to root div
Modal.setAppElement('#root');

const AccountWideControls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const tool = useAppSelector(state => state.tool.selected);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [petsMountsChecked, setPetsMountsChecked] = useState<boolean>(true);
  const [repsChecked, setRepsChecked] = useState<boolean>(true);
  const [achsChecked, setAchsChecked] = useState<boolean>(true);
  const [botsChecked, setBotsChecked] = useState<boolean>(false);

  // Clear settings when tool changes
  useEffect(() => {
    if (expansion === 'wotlk') {
      setPetsMountsChecked(true);
      setAchsChecked(true);
    } else {
      setPetsMountsChecked(false);
      setAchsChecked(false);
    }

    setRepsChecked(true);
    setBotsChecked(false);
  }, [tool]);

  // Shorten modal window if no settings are checked
  useEffect(() => {
    !petsMountsChecked && !repsChecked && !achsChecked
      ? modalStyles.content.height = '148px'
      : modalStyles.content.height = '270px';
  });

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  // Start account-wide transfer
  const startAccountWide = async () => {
    // Clear previous messages
    dispatch(storeMessages('del'));

    // Dispatch to display each message sent from main as they come in
    const settings: AccountWideSettings = {
      xpac: expansion,
      petsMounts: petsMountsChecked,
      reputations: repsChecked,
      achievements: achsChecked,
      bots: botsChecked,
    };

    const listener = (msg: string) => dispatch(storeMessages(msg));
    window.electron.ipcRenderer.on('account-wide', listener as ElectronCallback);
    window.electron.ipcRenderer.sendMessage('account-wide', settings);
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
          <div>
            <div className="msg-warning">Please select a data option</div>
            <div className="msg-warning-buttons">
              <MainButton handleClick={closeModal} buttonText="Close" />
            </div>
          </div>
        ) : (
          <>
            <div className="msg-warning"><b>WARNING</b></div>
            <div className="msg-warning">Transferring data between characters is irreversible.</div>
            <div className="msg-warning">Making a backup of your database through</div>
            <div className="msg-warning">the SPP Classics launcher before proceeding</div>
            <div className="msg-warning">is <b>STRONGLY</b> recommended.</div>
            <div className="msg-warning-buttons">
              <MainButton handleClick={closeModal} buttonText="Cancel" />
              <MainButton handleClick={startAccountWide} buttonText="Continue" />
            </div>
          </>
        )}
      </Modal>
      <div className="ctrl-label msg-label">Choose data to transfer</div>
      <div className={`checkboxes ${expansion}-checkboxes`}>
        {expansion === 'wotlk' ? (
          <Checkbox
            callback={() => setPetsMountsChecked(!petsMountsChecked)}
            isChecked={petsMountsChecked}
            text="Pets & Mounts"
          />
        ) : (
          <></>
        )}
        <Checkbox
          callback={() => setRepsChecked(!repsChecked)}
          isChecked={repsChecked}
          text="Reputations"
        />
        {expansion === 'wotlk' ? (
          <>
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
            <div className="msg-note">
              <b>Note:</b> You will not receive any achievements, pets, etc. from bot accounts.
              This only runs transfers for bot accounts in addition to yours.
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <MainButton handleClick={openModal} buttonText="Start" />
      <div className="msg-options-container">
      </div>
    </div>
  );
}

export default AccountWideControls;
