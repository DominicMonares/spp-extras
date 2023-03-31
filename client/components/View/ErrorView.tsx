import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import './View.css';
import MainBigHeader from "../MainBigHeader";


const ErrorView = ({ error, retry }: ViewProps) => {
  return (
    <div className="error-view">
      <MainBigHeader headerText="ERROR" />
      <div className="error-view-body">
        <div className="error-text">{JSON.stringify(error)}</div>
        <div className="error-db-text">
          Please ensure the database is still running.
        </div>
        <MainButton handleClick={retry} buttonText={'Retry'} />
      </div>
    </div>
  );
}

export default ErrorView;
