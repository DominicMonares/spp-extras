import { httpUrl, port } from '../config';
import { FetchCharacters } from '../types';


export const fetchCharacters: FetchCharacters = async expansion => {
  const parameters = new URLSearchParams({ expansion });
  return await fetch(`${httpUrl}:${port}/characters/all/?` + parameters)
    .then(async data => {
      const status = data.status;
      const response = await data.json();
      if (status === 200) return response;
      else throw response;
    });
}
