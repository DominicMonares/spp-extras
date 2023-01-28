import type { FetchChars } from '../types';
import { port, url } from '../config';


export const fetchCharacters: FetchChars = async expansion => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${url}:${port}/characters/all?` + expansionParams)
    .then(data => data.json())
    .catch(err => console.error('API ERROR: ', err)); // TEMP ERR HANDLING
}
