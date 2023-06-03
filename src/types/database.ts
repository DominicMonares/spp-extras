import mysql from 'mysql2/promise';
import { AllAccountsData } from './accountWide';

// ----------------------------------------------------------------
// Connection
// ----------------------------------------------------------------

export type DBName = 'realmd' | 'characters' | 'mangos';

export type Connection = mysql.Connection;

export type ConnectionPool = [Connection, DBName][];

// ----------------------------------------------------------------
// Achievement Credit Query Values
// ----------------------------------------------------------------

export type CreditValue = {
  guid: number;
  achievement: number;
  date: number;
}

export type CreditValues = CreditValue[];

// ----------------------------------------------------------------
// Achievement Progress Query Values
// ----------------------------------------------------------------

export type ProgBase = {
  criteria: number;
  counter: number;
  date: number;
}

export interface CharProgValue extends ProgBase {
  guid: number;
}

export type CharProgValues = CharProgValue[];

export interface SharedProgValue extends ProgBase {
  id: number;
}

export type SharedProgValues = SharedProgValue[];

// ----------------------------------------------------------------
// Achievement Item Reward Query Values
// ----------------------------------------------------------------

export type ItemInstanceValue = {
  guid: number;
  owner_guid: number;
  itemEntry: number;
  creatorGuid: number;
  giftCreatorGuid: number;
  count: number;
  duration: number;
  charges: string;
  flags: number;
  enchantments: string;
  randomPropertyId: number;
  durability: number;
  playedTime: number;
  text: string;
}

export type ItemInstanceValues = ItemInstanceValue[];

export type MailValue = {
  id: number;
  messageType: number;
  stationery: number;
  mailTemplateId: number;
  sender: number;
  receiver: number;
  subject: string;
  body: string;
  has_items: number;
  expire_time: number;
  deliver_time: number;
  money: number;
  cod: number;
  checked: number;
}

export type MailValues = MailValue[];

export type MailItemValue = {
  mail_id: number;
  item_guid: number;
  item_template: number;
  receiver: number;
}

export type MailItemValues = MailItemValue[];

// ----------------------------------------------------------------
// Achievement Title Reward Query Values
// ----------------------------------------------------------------

export type TitleValue = {
  guid: number;
  knownTitles: string;
}

export type TitleValues = TitleValue[];

// ----------------------------------------------------------------
// Pet and Mount Spell Query Values
// ----------------------------------------------------------------

export type PetMountSpellValue = {
  guid: number;
  spell: number;
}

export type PetMountSpellValues = PetMountSpellValue[];

// ----------------------------------------------------------------
// Reputation Query Values
// ----------------------------------------------------------------

export type ReputationValue = {
  guid: number;
  faction: number;
  standing: number;
  flags: number;
}

export type ReputationValues = ReputationValue[];

// ----------------------------------------------------------------
// Complete Values
// ----------------------------------------------------------------

export type CreditRewardValues = {
  creditVals: CreditValues;
  itemInstVals: ItemInstanceValues;
  mailVals: MailValues;
  mailItemVals: MailItemValues;
  titleVals: TitleValues;
}

export type ProgressValues = {
  charProgVals: CharProgValues;
  sharedProgVals: SharedProgValues;
  newAcctData: AllAccountsData;
}
