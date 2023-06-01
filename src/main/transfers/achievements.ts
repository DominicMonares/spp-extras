import {
  createSharedProgTable,
  insCharAchs,
  insCutTitles,
  insRewardItemInstances,
  insRewardMail,
  insRewardMailItems,
  insUpdAchProg,
  insUpdCharAchSharedProg,
  selAchCredit,
  selAchProg,
  selAchRewards,
  selAchSharedProg,
  selCompletedRegQuests,
  selCutTitle,
  selLastItemInstID,
  selLastMailID,
  selRewItemCharges,
  selTemplateQuests,
  showSharedProg,
  updRewardTitles,
} from '../db';
import {
  createCreditRewValues,
  createProgValues,
  formatAchCredit,
  formatAchProg,
  formatAchRewards,
  formatAllAcctData,
  formatCompletedQuests,
  formatRewItemCharges,
  formatTemplateQuests,
  send,
} from '../../utils';

export const transferAchievements = async ( // TEMP ANY
  acctChars: any,
  acctIDs: any,
  charIDs: any,
  reply: any,
  charactersDB: any,
  mangosDB: any,
) => {
  send('Starting achievement data transfers...', reply);

  // ----------------------------------------------------------------
  // Add cut titles and create character table needed for transfers
  // ----------------------------------------------------------------

  // Restore cut titles if they don't exist in db
  try {
    const cutTitle = await selCutTitle(mangosDB, reply);
    if (!cutTitle.length) try {
      await insCutTitles(mangosDB, reply);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }

  // Create CharacterAchievementSharedProgress table if it doesn't exist
  try {
    let sharedProgExists = false;
    const sharedProgTable = await showSharedProg(charactersDB, reply);
    if (sharedProgTable.length) sharedProgExists = true;
    if (!sharedProgExists) try {
      await createSharedProgTable(charactersDB, reply);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Fetch and format account/char related data
  // ----------------------------------------------------------------

  // Achievement credit
  let achCredit: any = {}; // TEMP ANY
  try {
    const rawAchCredit = await selAchCredit(charactersDB, charIDs, reply);
    achCredit = formatAchCredit(rawAchCredit);
  } catch (err) {
    throw err;
  }

  // Achievement progress
  let achProg: any = {}; // TEMP ANY
  try {
    const rawAchProg = await selAchProg(charactersDB, charIDs, reply);
    achProg = formatAchProg('char', rawAchProg);
  } catch (err) {
    throw err;
  }

  // Shared achievement progress
  let achProgShared: any = {}; // TEMP ANY
  try {
    const rawAchSharedProg = await selAchSharedProg(charactersDB, acctIDs, reply);
    achProgShared = formatAchProg('acct', rawAchSharedProg);
  } catch (err) {
    throw err;
  }

  // Completed quests
  // Reg progress tracked through completed quests
  // Dailies tracked through progress table
  // Weekly and monthly quests not tracked for any achievements (AFAIK)
  let completedQuests: any = {}; // TEMP ANY
  try {
    const rawCompletedQuests = await selCompletedRegQuests(charactersDB, charIDs, reply);
    completedQuests = formatCompletedQuests(rawCompletedQuests, [], [], []);
  } catch (err) {
    throw err;
  }

  // All account data
  let allAcctData = formatAllAcctData(
    acctChars,
    achCredit,
    achProg,
    achProgShared,
    completedQuests
  );

  // Last item instance ID
  let lastItemInstID = 0;
  try {
    const rawLastItemInstID = await selLastItemInstID(charactersDB, reply);
    lastItemInstID = rawLastItemInstID[0]['MAX(guid)'];
  } catch (err) {
    throw err;
  }

  // Last mail ID
  let lastMailID = 0;
  try {
    const rawLastMailID = await selLastMailID(charactersDB, reply);
    lastMailID = rawLastMailID[0]['MAX(guid)'];
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Fetch and format world related data
  // ----------------------------------------------------------------

  // Achievement reward template
  let achItemIDs: any = []; // TEMP ANY
  let achRewards: any = {}; // TEMP ANY
  try {
    const rawAchRewards = await selAchRewards(mangosDB, reply);
    achItemIDs = rawAchRewards.map((r: any) => r.item); // TEMP ANY
    achRewards = formatAchRewards(rawAchRewards);
  } catch (err) {
    throw err;
  }

  // Achievement reward item charges
  let itemCharges: any = {}; // TEMP ANY
  try {
    const rawItemCharges = await selRewItemCharges(mangosDB, achItemIDs, reply);
    itemCharges = formatRewItemCharges(rawItemCharges);
  } catch (err) {
    throw err;
  }

  // Template Quests
  let templateQuests: any; // TEMP ANY
  try {
    const rawTemplateQuests = await selTemplateQuests(mangosDB, reply);
    templateQuests = formatTemplateQuests(rawTemplateQuests);
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Create new DB values
  // ----------------------------------------------------------------

  // Create progress values and add any new achievements to credit
  let charProgValues: any = []; // TEMP ANY
  let sharedProgValues: any = []; // TEMP ANY
  try {
    send('Creating new achievement progress DB values...', reply);
    const achProgValues = createProgValues(allAcctData, templateQuests);
    const { charProgVals, sharedProgVals, newAcctData } = achProgValues;
    charProgValues = charProgVals;
    sharedProgValues = sharedProgVals;
    allAcctData = newAcctData;
    send('New achievement progress DB values created!', reply);
  } catch (err) {
    const errMsg = `Failed to create new achievement progress DB values!\n${err}`;
    send(errMsg, reply);
    throw err;
  }

  // Create credit and reward values
  let creditValues: any = []; // TEMP ANY
  let itemInstValues: any = []; // TEMP ANY
  let mailValues: any = []; // TEMP ANY
  let mailItemValues: any = []; // TEMP ANY
  let titleValues: any = []; // TEMP ANY
  try {
    send('Creating new achievement credit and reward DB values...', reply);
    const creditRewardValues = createCreditRewValues(
      allAcctData,
      achRewards,
      itemCharges,
      lastItemInstID,
      lastMailID
    );
    const {
      creditVals,
      itemInstVals,
      mailVals,
      mailItemVals,
      titleVals
    } = creditRewardValues;
    creditValues = creditVals;
    itemInstValues = itemInstVals;
    mailValues = mailVals;
    mailItemValues = mailItemVals;
    titleValues = titleVals;
    send('New achievement credit and reward DB values created!', reply);
  } catch (err) {
    const errMsg = `Failed to create new achievement credit and reward DB values!\n${err}`;
    send(errMsg, reply);
    throw err;
  }

  // ----------------------------------------------------------------
  // Run queries to save new data
  // ----------------------------------------------------------------

  // Save new character achievement progress
  if (charProgValues.length) try {
    await insUpdAchProg(charactersDB, charProgValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new shared achievement progress
  if (sharedProgValues.length) try {
    await insUpdCharAchSharedProg(charactersDB, sharedProgValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new credit
  if (creditValues.length) try {
    await insCharAchs(charactersDB, creditValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new item instances
  if (itemInstValues.length) try {
    await insRewardItemInstances(charactersDB, itemInstValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new mail
  if (mailValues.length) try {
    await insRewardMail(charactersDB, mailValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new mail items
  if (mailItemValues.length) try {
    await insRewardMailItems(charactersDB, mailItemValues, reply);
  } catch (err) {
    throw err;
  }

  // Save new titles
  if (titleValues.length) try {
    await updRewardTitles(charactersDB, titleValues, reply);
  } catch (err) {
    throw err;
  }

  send('Achievement data transfers complete!', reply);
}
