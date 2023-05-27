export interface SchemaString {
  type: 'string';
  default: '';
}

export interface StoreSchema {
  expansion: SchemaString;
  faction: SchemaString;
}
