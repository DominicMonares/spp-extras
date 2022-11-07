import { url } from '../config';

import type { SelectedExpansion } from "../store/types";


export const getQuests = async (expansion: SelectedExpansion, charIds: string) => {
  const expansionParams = new URLSearchParams({ expansion: expansion, charIds: charIds });

  return fetch(`${url}/quests/completed?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}

