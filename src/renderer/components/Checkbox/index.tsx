import checked from '../../../../assets/checkboxes/checked.png'
import unchecked from '../../../../assets/checkboxes/unchecked.png'
import './Checkbox.css';

interface Props {
  callback: () => void;
  isChecked: boolean;
  text: string;
}

const Checkbox = ({ callback, isChecked, text }: Props) => {
  return (
    <div className="checkbox">
      <img
        className="checkbox-img"
        src={isChecked ? checked : unchecked}
        onClick={callback}
      />
      <span className="checkbox-text">{text}</span>
    </div>
  );
}

export default Checkbox;
