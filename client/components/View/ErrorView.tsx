import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import MainBigHeader from "../MainBigHeader";
import './View.css';


const ErrorView = ({ error }: ViewProps) => {
  return (
    <div className="error-view">
      <MainBigHeader headerText="Error" />
      <div className="error-view-body">
        <div className="error-text">{error}</div>
        <div className="error-db-text">
          Please ensure the database is still running.
        </div>
        <MainButton handleClick={location.reload} buttonText={'Retry'} />
      </div>
    </div>
  );
}

export default ErrorView;
