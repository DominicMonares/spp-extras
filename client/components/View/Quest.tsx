import { useState } from 'react';
import Modal from 'react-modal';
import { useAppSelector } from '../../store/hooks';
import { QuestProps } from '../../types';
import complete from '../../assets/labels/complete.png';
import incomplete from '../../assets/labels/incomplete.png';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px'
  }
};

Modal.setAppElement('#root');

const Quest = ({ quest }: QuestProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <tr className={`${expansion}-quest`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="WotLK DB"
      >
        <div onClick={closeModal}>WARNING</div>
        <iframe
          className="db-window"
          src={`https://wotlkdb.com/?quest=${quest.entry}`}
          title="WotLK DB"
        >
        </iframe>
      </Modal>
      <td className="qt-td3">
        {quest.completed ? (
          <img className="qt-complete" src={complete} />
        ) : (
          <img className="qt-incomplete" src={incomplete} />
        )}
      </td>
      <td className="qt-td2">{quest.entry}</td>
      <td className="qt-td1">
        <div className="qt-quest" onClick={openModal}>{quest.title}</div>
      </td>
    </tr>
  );
}

export default Quest;
