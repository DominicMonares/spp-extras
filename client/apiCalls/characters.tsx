// Types
import type { SelectedExpansion } from '../types/general';

// Config
import { url } from '../config';


export const getCharacters = async (expansion: SelectedExpansion) => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${url}/characters/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.log('API ERROR: ', err));
}
