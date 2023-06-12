import './MainBigHeader.css';

type Props = {
  headerText: string;
}

const MainBigHeader = ({ headerText }: Props) => {
  return (
    <div className="main-big-header">
      <div className="main-big-header-label">
        <div className={`
          main-big-header-text
          ${headerText.includes('Loading') ? 'loading-text' : ''}
        `}>
          {headerText}
        </div>
      </div>
    </div>
  );
}

export default MainBigHeader;
