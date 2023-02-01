import { httpUrl, port } from '../config';
import { FetchCompQuests, FetchTemplateQuests } from '../types';


export const fetchCompletedQuests: FetchCompQuests = async (expansion, characters) => {
  const expansionParams = new URLSearchParams({ expansion, characters });

  return fetch(`${httpUrl}:${port}/quests/completed/?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}

export const fetchTemplateQuests: FetchTemplateQuests = async expansion => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${httpUrl}:${port}/quests/all/?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}
