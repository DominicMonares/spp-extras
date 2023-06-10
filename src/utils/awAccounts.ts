import {
  AccountCharacters,
  AchCredit,
  AllAccountsData,
  AllAchCredit,
  AllAchProgress,
  CompletedQuests,
  CompletedRegQuests,
} from '../types';

// Organize all quest, achievement, and other character related data by character
export const formatAllAcctData = (
  acctChars: AccountCharacters,
  achCredit: AllAchCredit,
  achCharProg: AllAchProgress,
  achSharedProg: AllAchProgress,
  completedQuests: CompletedQuests,
) => {
  // Use accounts as base for all data
  const all: AllAccountsData = {};

  // Iterate through all accounts and characters to add data
  for (const acctID in acctChars) {
    const account = acctChars[acctID];
    const player = acctID === '0';
    const playerAcctIDs = player ? account.playerAcctIDs : [];

    // Combine characters
    const allianceChars = account.characters.alliance;
    const hordeChars = account.characters.horde;
    const mergedChars = { ...allianceChars, ...hordeChars };
    all[acctID] = {
      username: account.username,
      characters: mergedChars,
    };

    const chars = all[acctID]['characters'];

    // Combine quests and achievement credit/progress
    const credit: AchCredit = {};
    const sharedProgress = achSharedProg[acctID] || {};
    const quests: CompletedRegQuests = {};
    for (const charID in chars) {
      // Ensure character matches account
      const char = chars[charID];
      let validPlayerAcct = 0;
      if (playerAcctIDs) {
        const accountIndex = playerAcctIDs.indexOf(char.account);
        validPlayerAcct = playerAcctIDs?.[accountIndex];
      }
      const validPlayerChar = acctID === '0' && validPlayerAcct;
      const validBotAcct = char.account === Number(acctID);
      const validBotChar = acctID !== '0' && validBotAcct;

      // Add to account-wide achievement credit if char is valid
      if (validPlayerChar || validBotChar) {
        all[acctID]['characters'][charID]['credit'] = {};
        if (achCredit[charID]) {
          for (const achID in achCredit[charID]) {
            const incomingDate = achCredit[charID][achID];
            const existingDate = credit[achID] || incomingDate;

            // Use oldest completion date if achievement already exists
            const olderEntry = existingDate > incomingDate;
            if (!credit[achID] || olderEntry) credit[achID] = incomingDate;

            // Add data for each character
            const charCredit = achCredit[charID];
            all[acctID]['characters'][charID]['credit'] = charCredit;
          }
        }

        // Add to account-wide quest credit
        all[acctID]['characters'][charID]['quests'] = {};
        if (completedQuests[charID]) {
          all[acctID]['characters'][charID]['quests'] = {};
          const completedReg = completedQuests[charID]['regular'];
          for (const questID in completedReg) {
            const quest = completedReg[questID];
            if (!quests[questID]) {
              quests[questID] = quest;
            } else {
              const existingDate = quests[questID]['timer'] || 0;
              const incomingDate = quest.timer || 0;

              // Use more recent date for Loremaster progress
              if (incomingDate > existingDate) quests[questID] = quest;
            }
          }

          const charQuests = completedQuests[charID];
          all[acctID]['characters'][charID]['quests'] = charQuests;
        }

        // Add data for each character
        const charProg = achCharProg[charID] || {};
        all[acctID]['characters'][charID]['progress'] = charProg;
      }
    }

    // Add data for each account
    all[acctID]['credit'] = credit;
    all[acctID]['sharedProg'] = sharedProgress;
    all[acctID]['quests'] = quests;
  }

  return all;
}
