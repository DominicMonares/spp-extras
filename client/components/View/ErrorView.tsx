import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import MainBigHeader from "../MainBigHeader";
import { useAppSelector } from '../../store/hooks';
import './View.css';


const ErrorView = ({ error, getAllData }: ViewProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  return (
    <div>
      <MainBigHeader headerText="Error" />
      <div className={`error ${expansion}-error`}>
        <div className="error-text">{error}</div>
        {error.includes('Unexpected') ? (
          <div className="error-text">
            Please ensure the database is still running.
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="error-btn">
        <MainButton handleClick={getAllData} buttonText={'Retry'} />
      </div>
    </div>
  );
}

export default ErrorView;
