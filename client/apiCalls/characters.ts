import { httpUrl, port } from '../config';
import { FetchCharacters } from '../types';


export const fetchCharacters: FetchCharacters = async expansion => {
  const expansionParams = new URLSearchParams({ expansion });

  return fetch(`${httpUrl}:${port}/characters/all/?` + expansionParams)
    .then(data => data.json())
    .catch(err => { throw err });
}
