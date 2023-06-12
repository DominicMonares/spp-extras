import { useState } from 'react';
import Tab from './Tab';
import { useAppSelector } from 'renderer/store/hooks';
import { Expansion } from 'types';
import './ExpansionNav.css';

type Props = {
  openModal: (xpac: Expansion) => void;
}

const Tabs = ({ openModal }: Props) => {
  const expansion = useAppSelector(state => state.expansion.selected);
  const [classicBufferHover, setClassicBufferHover] = useState<boolean>(false);
  const [tbcBufferHover, setTbcBufferHover] = useState<boolean>(false);
  const [wotlkBufferHover, setWotlkBufferHover] = useState<boolean>(false);

  return (
    <nav className="xpac-tabs">
      <span className="left-buffer classic-lb">
        <div className="square classic-color"></div>
        <div className={`curve ${expansion}-flc`}></div>
      </span>
      <Tab bufferHover={classicBufferHover} openModal={openModal} xpac="classic" />
      {expansion === 'classic' ? (
        <span
          className="right-buffer classic-rb"
          onMouseEnter={() => setTbcBufferHover(true)}
          onMouseLeave={() => setTbcBufferHover(false)}
        >
          <div className="square classic-color"></div>
          <div className="curve classic-rc"></div>
        </span>
      ) : (
        <span
          className="left-buffer tbc-lb"
          onMouseEnter={() => setClassicBufferHover(true)}
          onMouseLeave={() => setClassicBufferHover(false)}
        >
          <div className="square tbc-left-sq tbc-color"></div>
          <div className="curve tbc-lc"></div>
        </span>
      )}
      <Tab bufferHover={tbcBufferHover} openModal={openModal} xpac="tbc" />
      {expansion === 'wotlk' ? (
        <span
          className="left-buffer wotlk-lb"
          onMouseEnter={() => setTbcBufferHover(true)}
          onMouseLeave={() => setTbcBufferHover(false)}
        >
          <div className="square wotlk-left-sq wotlk-color"></div>
          <div className="curve wotlk-lc"></div>
        </span>
      ) : (
        <span
          className="right-buffer tbc-rb"
          onMouseEnter={() => setWotlkBufferHover(true)}
          onMouseLeave={() => setWotlkBufferHover(false)}
        >
          <div className="square tbc-right-sq tbc-color"></div>
          <div className="curve tbc-rc"></div>
        </span>
      )}
      <Tab bufferHover={wotlkBufferHover} openModal={openModal} xpac="wotlk" />
      <span className="right-buffer wotlk-rb">
        <div className="square wotlk-color"></div>
        <div className={`curve ${expansion}-frc`}></div>
      </span>
    </nav>
  );
}

export default Tabs;
