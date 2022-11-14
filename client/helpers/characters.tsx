// Types
import { Race } from '../types/characters';


export const getFaction = (race: Race) => {
  if (race === 1 || race === 3 || race === 4 || race === 7 || race === 11) {
    return 'alliance';
  } else {
    return 'horde';
  }
}
