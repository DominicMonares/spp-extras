import { ViewProps } from "../../../types";
import MainButton from "../MainButton";
import MainBigHeader from "../MainBigHeader";
import { useAppSelector } from '../../store/hooks';
import './View.css';


const ErrorView = ({ error, getAllData }: ViewProps) => { // TEMP error type
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div>
      <MainBigHeader headerText="Error" />
      <div className={`error ${expansion}-error`}>
        {error?.split('\n').map((m, i) => {
          return <div key={i} className="error-text">{m}</div>
        })}
      </div>
      <div className="error-btn">
        <MainButton
          handleClick={getAllData ? getAllData : () => {}}
          buttonText={'Retry'}
        />
      </div>
    </div>
  );
}

export default ErrorView;
