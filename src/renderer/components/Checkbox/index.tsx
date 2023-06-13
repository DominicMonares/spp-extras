import checked from '../../../../assets/checkboxes/checked.webp'
import unchecked from '../../../../assets/checkboxes/unchecked.webp'
import './Checkbox.css';

type Props = {
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
