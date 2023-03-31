import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import label from '../../assets/labels/long-label.png';
import './View.css';


const ErrorView = ({ error, retry }: ViewProps) => {
  return (
    <div className="error-view">
      <div className="qt-select-header">
        <img src={label} />
        <div className="qt-select-text">
          ERROR
        </div>
      </div>
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
