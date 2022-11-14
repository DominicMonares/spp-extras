// Types
import type { SelectedExpansion } from '../types/general';

// Config
import { url } from '../config';


export const getCompletedQuests = async (
  expansion: SelectedExpansion,
  chars: string
) => {
  const expansionParams = new URLSearchParams({ expansion, chars });

  return fetch(`${url}/quests/completed?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}

export const getAllQuests = async (expansion: SelectedExpansion) => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${url}/quests/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}
