import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import MainBigHeader from "../MainBigHeader";
import { useAppSelector } from '../../store/hooks';
import './View.css';


const ErrorView = ({ error, getAllData }: ViewProps) => {
  const expansion = useAppSelector(state => state.expansion.selected);

  // TEMP ANY IN MAIN BUTTON
  return (
    <div>
      <MainBigHeader headerText="Error" />
      <div className={`error ${expansion}-error`}>
        <div className="error-text">{error}</div>
        {error?.includes('Unexpected') ? ( // TEMP DOUBLE CHECK ERROR TYPE
          <div className="error-text">
            Please ensure the database is still running.
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="error-btn">
        <MainButton handleClick={getAllData as any} buttonText={'Retry'} />
      </div>
    </div>
  );
}

export default ErrorView;
