import { httpUrl, port } from '../config';
import { FetchCompQuests, FetchTemplateQuests } from '../types';


export const fetchCompletedQuests: FetchCompQuests = async (expansion, characters) => {
  const parameters = new URLSearchParams({ expansion, characters });
  return fetch(`${httpUrl}:${port}/quests/completed/?` + parameters)
    .then(async data => {
      const status = data.status;
      const response = await data.json();
      if (status === 200) return response;
      else throw response;
    });
}

export const fetchTemplateQuests: FetchTemplateQuests = async expansion => {
  const parameters = new URLSearchParams({ expansion });
  return fetch(`${httpUrl}:${port}/quests/all/?` + parameters)
    .then(async data => {
      const status = data.status;
      const response = await data.json();
      if (status === 200) return response;
      else throw response;
    });
}
