import type { FetchCompQuests, FetchTemplateQuests } from '../types';
import { url } from '../config';


export const fetchCompletedQuests: FetchCompQuests = async (expansion, characters) => {
  const expansionParams = new URLSearchParams({ expansion, characters });

  return fetch(`${url}/quests/completed?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}

export const fetchTemplateQuests: FetchTemplateQuests = async expansion => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${url}/quests/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}
