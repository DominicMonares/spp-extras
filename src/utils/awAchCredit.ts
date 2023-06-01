import { checkFactionAch } from "./achievements";
import { checkFaction } from './characters';
import _titles from '../../data/titles/titles.json';

interface Title {
  name: string;
  inGameOrder: number;
}
interface Titles {
  [key: string]: Title;
}
const titles = _titles as Titles;

export const createCreditRewValues = ( // TEMP ANYS
allAcctData: any,
  achRewards: any,
  itemCharges: any,
  lastItemInstID: any,
  lastMailID: any,
) => {
  // Item IDs appear to be overwritten as new items are added through the game
  // Add 10000 to last ids to prevent items from being overwritten for a while
  lastItemInstID += 10000;
  lastMailID += 10000;

  interface CreditRewValues { // REFACTOR/MOVE TO TYPES FILE
    [key: string]: any[];
  }
  const dbValues: CreditRewValues = {
    creditValues: [],
    itemInstValues: [],
    mailValues: [],
    mailItemValues: [],
    titleValues: [],
  };

  const addCreditValue = (charID: any, achID: any, date: any) => {
    dbValues.creditValues.push({
      guid: charID,
      achievement: achID,
      date: date,
    });
  }

  const addItemInstValue = ( // TEMP ANYS
    lastItemInstID: any,
    charID: any,
    itemID: any,
    itemCharges: any,
  ) => {
    dbValues.itemInstValues.push({
      guid: lastItemInstID,
      owner_guid: charID,
      itemEntry: itemID,
      creatorGuid: 0,
      giftCreatorGuid: 0,
      count: 1,
      duration: 0,
      charges: `${itemCharges[itemID]} 0 0 0 0 `,
      flags: 0,
      enchantments: '0 '.repeat(36),
      randomPropertyId: 0,
      durability: 0,
      playedTime: 0,
      text: '',
    });
  }

  const addMailValue = ( // TEMP ANYS
    lastMailID: any,
    sender: any,
    charID: any,
    reward: any,
    newDate: any,
  ) => {
    dbValues.mailValues.push({
      id: lastMailID,
      messageType: 3,
      stationery: 41,
      mailTemplateId: 0,
      sender: sender,
      receiver: charID,
      subject: reward['subject'],
      body: reward['text'],
      has_items: 1,
      expire_time: newDate + 7776000,  // 7776000 = 90 days
      deliver_time: newDate,
      money: 0,
      cod: 0,
      checked: 0,
    });
  }

  const addMailItemValue = ( // TEMP ANYS
    lastMailID: any,
    lastItemInstID: any,
    itemID: any,
    charID: any,
  ) => {
    dbValues.mailItemValues.push({
      mail_id: lastMailID,
      item_guid: lastItemInstID,
      item_template: itemID,
      receiver: charID,
    });
  }

  // Run all previously defined argument creation functions
  const addDBValues = ( // TEMP ANYS
    charID: any,
    achID: any,
    date: any,
    char: any,
    lastItemInstID: any,
    lastMailID: any,
  ) => {
    // Add achievement credit
    addCreditValue(charID, achID, date);

    // Add reward(s) if achievement has reward(s)
    const rewardList = achRewards[achID];
    if (rewardList) {
      const matronPatron = rewardList.length > 1;
      const gender = char.gender;
      const reward = matronPatron ? rewardList[gender] : rewardList[0];

      // Add title if achievement rewards one
      const faction = checkFaction(char.race);
      const titleA = reward.title_A;
      const titleH = reward.title_H;
      const alliance = faction === 'alliance';
      const titleID = alliance ? titleA : titleH;
      if (titleID) {
        let knownTitles = char.knownTitles.split(' ');

        // Remove empty string created by trailing space
        knownTitles.pop();

        // Update known titles
        const inGameOrder = titles[titleID]['inGameOrder'];
        let titleIndex = Number((inGameOrder / 32).toString()[0]);
        const titleValue = Number(knownTitles[titleIndex]);
        const bit = 2 ** (inGameOrder % 32);
        knownTitles[titleIndex] = (titleValue + bit);
        char.knownTitles = knownTitles.join(' ') + ' ';
      }

      // Add mail item if achievement rewards one
      const newDate = new Date().getTime() / 1000;
      const sender = reward.sender;
      if (sender) {
        addMailValue(lastMailID, sender, charID, reward, newDate);
        const itemID = reward.item;
        if (itemID) {
          addMailItemValue(lastMailID, lastItemInstID, itemID, charID);
          addItemInstValue(lastItemInstID, charID, itemID, itemCharges);
        }
      }
    }
  }

  // Iterate through all accounts and characters to check achievements
  for (const acctID in allAcctData) {
    const chars = allAcctData[acctID]['characters'];
    const credit = allAcctData[acctID]['credit'];
    if (!chars) continue;
    for (const charID in chars) {
      const char = chars[charID];
      const charCredit = char.credit;
      const faction = checkFaction(char.race);
      for (let achID in credit) {
        let existingAch = charCredit[achID];
        const date = credit[achID];
        const itemInstLen = dbValues.itemInstValues.length;
        const mailLen = dbValues.mailValues.length;

        // Check to see if achievement if faction specific/matches char faction
        const factionAch = checkFactionAch(Number(achID), faction);
        const factionMatch = factionAch[0];
        const factionAchID = factionAch[1];
        if (achID !== factionAchID.toString()) {
          if (credit[factionAchID]) continue;
        }

        achID = factionAchID;
        existingAch = charCredit[achID];

        // Create all char achievement values if achievement if valid
        if (!existingAch && factionMatch) {
          addDBValues(charID, achID, date, char, lastItemInstID, lastMailID);
        }

        // Increment mail and item reward IDs for items added
        const newItemInstLen = dbValues.itemInstValues.length;
        const newMailLen = dbValues.mailValues.length;
        if (newItemInstLen > itemInstLen) lastItemInstID++;
        if (newMailLen > mailLen) lastMailID++;

        // Add known titles once all achievement rewards given
        dbValues.titleValues.push({
          guid: charID,
          knownTitles: char.knownTitles
        });
      }
    }
  }

  return dbValues;
}
