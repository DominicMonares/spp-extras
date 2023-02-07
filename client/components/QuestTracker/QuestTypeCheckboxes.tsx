import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { storeQuestTrackerType } from '../../store/slices';


const QuestTypeCheckboxes = () => {
  const dispatch = useAppDispatch();
  const [checks, setChecks] = useState([true, false, false, false]);

  const selectType = (checkboxes: boolean[], type: string) => {
    setChecks(checkboxes);
    dispatch(storeQuestTrackerType({ type: type }));
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checks[0]}
          onChange={() => selectType([true, false, false], 'regular')}
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

export default QuestTypeCheckboxes;
