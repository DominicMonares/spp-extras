import { ViewProps } from "../../types";
import MainButton from "../MainButton";
import MainBigHeader from "../MainBigHeader";
import './View.css';


const ErrorView = ({ error, getAllData }: ViewProps) => {
  return (
    <div className="error-view">
      <MainBigHeader headerText="Error" />
      <div className="error-view-body">
        <div className="error-text">{error}</div>
        <MainButton handleClick={getAllData} buttonText={'Retry'} />
      </div>
    </div>
  );
}

export default ErrorView;
