import { httpUrl, port } from '../config';
import { FetchQuestTrackerData } from '../types';


export const fetchQuestTrackerData: FetchQuestTrackerData = async expansion => {
  const parameters = new URLSearchParams({ expansion });
  return await fetch(`${httpUrl}:${port}/quest_tracker/all/?` + parameters)
    .then(async data => {
      const status = data.status;
      const response = await data.json();
      if (status === 200) return response;
      else throw response;
    });
}
