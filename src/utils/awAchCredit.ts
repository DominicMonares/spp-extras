import { checkFactionAch } from './achievements';
import { checkFaction } from './characters';
import {
  AchReward,
  AchRewardItemCharges,
  AchRewards,
  AllAccountsData,
  Character,
  CreditRewardValues,
  Titles,
} from 'types';
import _titles from '../../data/titles/titles.json';

const titles = _titles as Titles;

export const createCreditRewValues = (
  allAcctData: AllAccountsData,
  achRewards: AchRewards,
  itemCharges: AchRewardItemCharges,
  lastItemInstID: number,
  lastMailID: number,
) => {
  // Item IDs appear to be overwritten as new items are added through the game
  // Add 10000 to last ids to prevent items from being overwritten for a while
  lastItemInstID += 10000;
  lastMailID += 10000;

  const dbValues: CreditRewardValues = {
    creditVals: [],
    itemInstVals: [],
    mailVals: [],
    mailItemVals: [],
    titleVals: [],
  };

  const addCreditValue = (charID: number, achID: number, date: number) => {
    dbValues.creditVals.push({
      guid: charID,
      achievement: achID,
      date: date,
    });
  }

  const addItemInstValue = (
    lastItemInstID: number,
    charID: number,
    itemID: number,
    itemCharges: AchRewardItemCharges,
  ) => {
    dbValues.itemInstVals.push({
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

  const addMailValue = (
    lastMailID: number,
    sender: number,
    charID: number,
    reward: AchReward,
    newDate: number,
  ) => {
    dbValues.mailVals.push({
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

  const addMailItemValue = (
    lastMailID: number,
    lastItemInstID: number,
    itemID: number,
    charID: number,
  ) => {
    dbValues.mailItemVals.push({
      mail_id: lastMailID,
      item_guid: lastItemInstID,
      item_template: itemID,
      receiver: charID,
    });
  }

  // Run all previously defined argument creation functions
  const addDBValues = (
    charID: number,
    achID: number,
    date: number,
    char: Character,
    lastItemInstID: number,
    lastMailID: number,
  ) => {
    // Add achievement credit
    addCreditValue(charID, achID, date);

    // Add reward(s) if achievement has reward(s)
    const rewardList = achRewards[achID];
    if (rewardList) {
      const matronPatron = rewardList.length > 1;
      const gender = char.gender || 0;
      const reward = rewardList[matronPatron ? gender : 0];

      // Add title if achievement rewards one
      const faction = checkFaction(char.race);
      const titleA = reward?.title_A;
      const titleH = reward?.title_H;
      const alliance = faction === 'alliance';
      const titleID = alliance ? titleA : titleH;
      if (titleID && char.knownTitles) {
        const knownTitles = char.knownTitles.split(' ');

        // Remove empty string created by trailing space
        knownTitles.pop();

        // Update known titles
        const inGameOrder = titles[titleID]['inGameOrder'];
        let titleIndex = Number((inGameOrder / 32).toString()[0]);
        const titleValue = Number(knownTitles[titleIndex]);
        const bit = 2 ** (inGameOrder % 32);
        knownTitles[titleIndex] = (titleValue + bit).toString();
        char.knownTitles = knownTitles.join(' ') + ' ';
      }

      // Add mail item if achievement rewards one
      const newDate = new Date().getTime() / 1000;
      const sender = reward?.sender;
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
    for (const charID in chars) {
      const char = chars[charID];
      const charCredit = char.credit;
      const faction = checkFaction(char.race);
      for (let achID in credit) {
        let existingAch = charCredit?.[achID];
        const date = credit[achID];
        const itemInstLen = dbValues.itemInstVals.length;
        const mailLen = dbValues.mailVals.length;

        // Check to see if achievement is faction specific/matches char faction
        const factionAch = checkFactionAch(Number(achID), faction);
        const factionMatch = factionAch[0];
        const factionAchID = factionAch[1].toString();
        if (achID !== factionAchID && credit[factionAchID]) continue;
        achID = factionAchID;
        existingAch = charCredit?.[achID];

        // Create all char achievement values if achievement if valid
        if (!existingAch && factionMatch) {
          addDBValues(
            Number(charID),
            Number(achID),
            date,
            char,
            lastItemInstID,
            lastMailID,
          );
        }

        // Increment mail and item reward IDs for items added
        const newItemInstLen = dbValues.itemInstVals.length;
        const newMailLen = dbValues.mailVals.length;
        if (newItemInstLen > itemInstLen) lastItemInstID++;
        if (newMailLen > mailLen) lastMailID++;
      }

      // Add known titles once all achievement rewards given
      dbValues.titleVals.push({
        guid: Number(charID),
        knownTitles: char.knownTitles || '0 0 0 0 0 0 ',
      });
    }
  }

  return dbValues;
}
