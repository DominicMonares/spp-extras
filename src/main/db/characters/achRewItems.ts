import { send } from '../../../utils';
import {
  Connection,
  ItemInstanceValues,
  MailItemValues,
  MailValues,
  Reply,
} from '../../../types';

// ----------------------------------------------------------------
// Achievement Reward Items
// ----------------------------------------------------------------

export const selLastItemInstID = async (conn: Connection, reply?: Reply) => {
  const sql = 'SELECT MAX(guid) FROM item_instance';
  try {
    const startMsg = 'Fetching last item instance ID data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Last item instance ID data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch last item instance ID data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insRewardItemInstances = async (
  conn: Connection,
  instances: ItemInstanceValues,
  reply?: Reply
) => {
  const columns = `
    guid,
    owner_guid,
    itemEntry,
    creatorGuid,
    giftCreatorGuid,
    count,
    duration,
    charges,
    flags,
    enchantments,
    randomPropertyId,
    durability,
    playedTime,
    text
  `;
  const values = instances.map(i => {
    return [
      i.guid,
      i.owner_guid,
      i.itemEntry,
      i.creatorGuid,
      i.giftCreatorGuid,
      i.count,
      i.duration,
      i.charges,
      i.flags,
      i.enchantments,
      i.randomPropertyId,
      i.durability,
      i.playedTime,
      i.text
    ];
  });
  const sql = `INSERT INTO item_instance (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new item instance data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New item instance data successfully saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new item instance data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const selLastMailID = async (conn: Connection, reply?: Reply) => {
  const sql = 'SELECT MAX(id) FROM mail';
  try {
    const startMsg = 'Fetching last mail ID data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Last mail ID data fetched!';
    send(successMsg, reply);
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch last mail ID data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insRewardMail = async (
  conn: Connection,
  mail: MailValues,
  reply?: Reply
) => {
  const columns = `
    id,
    messageType,
    stationery,
    mailTemplateId,
    sender,
    receiver,
    subject,
    body,
    has_items,
    expire_time,
    deliver_time,
    money,
    cod,
    checked
  `;
  const values = mail.map(m => {
    return [
      m.id,
      m.messageType,
      m.stationery,
      m.mailTemplateId,
      m.sender,
      m.receiver,
      m.subject,
      m.body,
      m.has_items,
      m.expire_time,
      m.deliver_time,
      m.money,
      m.cod,
      m.checked
    ];
  });
  const sql = `INSERT INTO mail (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new mail data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New mail data successfully saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new mail data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}

export const insRewardMailItems = async (
  conn: Connection,
  items: MailItemValues,
  reply?: Reply
) => {
  const columns = 'mail_id, item_guid, item_template, receiver';
  const values = items.map(i => [i.mail_id, i.item_guid, i.item_template, i.receiver]);
  const sql = `INSERT INTO mail_items (${columns}) VALUES ?`;
  try {
    const startMsg = 'Saving new mail item data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql, [values]);
    const successMsg = 'New mail item data successfully saved!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to save new mail item data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
