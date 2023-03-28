export interface StoreSchema {
  expansion: SchemaString;
  faction: SchemaString;
}

export interface SchemaString {
  type: 'string';
  default: '';
}
