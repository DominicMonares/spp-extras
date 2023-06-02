import Store from 'electron-store';

export interface SchemaString {
  type: 'string';
  default: '';
}

export interface StoreSchema {
  expansion: SchemaString;
  faction: SchemaString;
}

const schema: StoreSchema = {
  expansion: { type: 'string', default: '' },
  faction: { type: 'string', default: '' },
};

const store = new Store<StoreSchema>({ schema });

export default store;
