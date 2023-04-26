import checked from '../../assets/checkboxes/checked.png'
import unchecked from '../../assets/checkboxes/unchecked.png'
import { CheckboxProps } from '../../types';
import './Checkbox.css';


const Checkbox = ({ callback, isChecked, text }: CheckboxProps) => {
  return (
    <div>
      <img 
        src={isChecked ? checked : unchecked} 
        onClick={callback} 
      />
      <span>{text}</span>
    </div>
  );
}

export default Checkbox;
