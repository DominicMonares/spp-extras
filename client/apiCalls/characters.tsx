import { url } from '../config';

import type { SelectedExpansion } from "../store/types";


export const getCharacters = async (expansion: SelectedExpansion) => {
  const expansionParams = new URLSearchParams({ expansion: expansion });

  return fetch(`${url}/characters/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}
