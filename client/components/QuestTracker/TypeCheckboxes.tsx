import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateQTType } from '../../store/slices';
import { QuestType } from "../../types";


const TypeCheckboxes = () => {
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState([true, false, false]);

  const selectType = (checkboxes: boolean[], type: QuestType) => {
    setChecks(checkboxes);
    dispatch(updateQTType({ type: type }));
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checks[0]}
          onChange={() => selectType([true, false, false], 'reg')}
        />
        Regular
      </label>
      <label>
        <input
          type="checkbox"
          checked={checks[1]}
          onChange={() => selectType([false, true, false], 'daily')}
        />
        Daily
      </label>
      <label>
        <input
          type="checkbox"
          checked={checks[2]}
          onChange={() => selectType([false, false, true], 'weekly')}
        />
        Weekly
      </label>
    </div>
  );
}

export default TypeCheckboxes;
