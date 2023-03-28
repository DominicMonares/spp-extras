import Store from 'electron-store';
import { StoreSchema } from './types';


const schema: StoreSchema = {
  expansion: { type: 'string', default: '' },
  faction: { type: 'string', default: '' }
};

const store = new Store<StoreSchema>({ schema });

export default store;
