import { httpUrl, port } from '../config';
import { FetchAllData } from '../types';


export const fetchAllData: FetchAllData = async expansion => {
  const parameters = new URLSearchParams({ expansion });
  return await fetch(`${httpUrl}:${port}/data/all/?` + parameters)
    .then(async data => {
      const status = data.status;
      const response = await data.json();
      if (status === 200) return response;
      else throw response;
    });
}
