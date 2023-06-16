import Tabs from './Tabs';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeExpansion,
  storeMessages,
  storeQuestTrackerAll,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone,
  storeTemplateQuests,
  storeTool
 } from 'renderer/store/slices';
import { Expansion, ExpansionSetting } from 'types';
import './ExpansionNav.css';

type Props = {
  getAllData: (e?: unknown, xpac?: ExpansionSetting) => void;
}

const ExpansionNav = ({ getAllData }: Props) => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);

  const switchExpansion = (xpac: Expansion) => {
    if (expansion === xpac) {
      return;
    } else {
      // Clear all stores that rely on expansion specific data
      dispatch(storeCharacters({ alliance: {}, horde: {} }));
      dispatch(storeExpansion(xpac));
      dispatch(storeCompletedQuests({}));
      dispatch(storeMessages('del'));
      dispatch(storeTemplateQuests({ alliance: {}, horde: {}, neutral: {} }));
      dispatch(storeQuestTrackerAll(false));
      dispatch(storeQuestTrackerCharacter({ id: 0, name: '', value: '' }));
      dispatch(storeQuestTrackerClass({ id: 0, title: '', value: 0 }));
      dispatch(storeQuestTrackerRace({ id: 0, title: '', value: 0 }));
      dispatch(storeQuestTrackerType(''));
      dispatch(storeQuestTrackerZone('All Zones'));
      dispatch(storeTool(''));

      // Re-fetch all data for new expansion
      getAllData(null, xpac);
    }
  }

  return (
    <div className={`${expansion}-xpac-nav`}>
      <div className="nav-underline"></div>
      <Tabs switchExpansion={switchExpansion} />
    </div>
  );
}

export default ExpansionNav;
