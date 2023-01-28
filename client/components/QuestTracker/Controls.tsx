import { useEffect } from 'react';
import DropdownMenu from '../DropdownMenu';
import FactionCheckboxes from './FactionCheckboxes';
import TypeCheckboxes from './TypeCheckboxes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  storeCharacters,
  storeCompletedQuests,
  storeTemplateQuests
} from '../../store/slices';
import {
  fetchCharacters,
  fetchCompletedQuests,
  fetchTemplateQuests
} from '../../apiCalls';
import { getFaction } from '../../utils/characters';
import zoneMenu from '../../../data/zoneMenu.json';
import { Character } from "../../types";
import './QuestTracker.css';


const Controls = () => {
  const dispatch = useAppDispatch();
  const expansion = useAppSelector(state => state.expansion.selected);
  const characters = useAppSelector(state => state.characters);
  const settings = useAppSelector(state => state.questTracker);
  const faction = settings.faction;

  useEffect(() => {
    // Fetch template quests and completed quests
    const updateQuests = async () => await storeQuests();
    updateQuests();
  });

  const storeQuests = async () => {
    // Fetch all characters if they aren't in store
    const allianceCharactersExist = Object.keys(characters.alliance).length;
    const hordeCharactersExist = Object.keys(characters.horde).length;
    const charactersExist = allianceCharactersExist || hordeCharactersExist;
    const existingCharacters = !charactersExist ? await getCharacters() : characters;

    // Fetch all template quests
    await getTemplateQuests();

    // Fetch all completed quests
    const allianceCharacters = Object.values(existingCharacters.alliance);
    const allianceParameters = allianceCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const hordeCharacters = Object.values(existingCharacters.horde);
    const hordeParameters = hordeCharacters.map((c: Character) => [c.guid, getFaction(c.race)]);
    const characterParameters = allianceParameters.concat(hordeParameters).flat().join(',');
    const allCompletedQuests = await fetchCompletedQuests(expansion, characterParameters);
    dispatch(storeCompletedQuests(allCompletedQuests));
  }

  const getCharacters = async () => {
    const newCharacters = await fetchCharacters(expansion);
    dispatch(storeCharacters(newCharacters));
    return newCharacters;
  }

  const getTemplateQuests = async () => {
    const newTemplateQuests = await fetchTemplateQuests(expansion);
    dispatch(storeTemplateQuests(newTemplateQuests));
  }

  return (
    <div className="controls">
      <FactionCheckboxes />
      {faction ? (
        <>
          <TypeCheckboxes />
          <DropdownMenu type="zone" menu={zoneMenu} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Controls;
