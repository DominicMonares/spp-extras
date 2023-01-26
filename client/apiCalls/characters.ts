import type { FetchChars } from '../types';
import { url } from '../config';


export const fetchCharacters: FetchChars = async expansion => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${url}/characters/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}
