import { url } from '../config';

import type { SelectedExpansion } from "../store/types";


export const getCompletedQuests = async (expansion: SelectedExpansion, charQuery: string) => {
  const expansionParams = new URLSearchParams(
    { expansion: expansion, chars: charQuery }
  );

  return fetch(`${url}/quests/completed?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}

export const getAllQuests = async (expansion: SelectedExpansion) => {
  const expansionParams = new URLSearchParams(
    { expansion: expansion }
  );

  return fetch(`${url}/quests/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}

