import { url } from '../config';

import type { SelectedExpansion } from "../store/types";


export const getQuests = async (expansion: SelectedExpansion, charQuery: string) => {
  const expansionParams = new URLSearchParams(
    { expansion: expansion, chars: charQuery }
  );

  return fetch(`${url}/quests/completed?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}

