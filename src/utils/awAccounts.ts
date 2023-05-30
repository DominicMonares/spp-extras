// Organize all quest, achievement, and other character related data by character
export const formatAllAcctData = ( // TEMP ANYS
  accounts: any,
  achCredit: any,
  achCharProg: any,
  achSharedProg: any,
  completedQuests: any,
) => {
  // Use accounts as base for all data
  const all: any = accounts; // TEMP ANY

  // Iterate through all accounts and characters to add data
  for (const acctID in accounts) {
    const account = all[acctID];
    const player = acctID === '0';
    const playerAccts = player ? account.playerAccts : [];

    // Combine characters
    const allianceChars = account.characters.alliance;
    const hordeChars = account.characters.horde;
    const mergedChars = { ...allianceChars, ...hordeChars };
    all[acctID]['characters'] = mergedChars;
    const chars = all[acctID]['characters'];

    // Combine quests and achievement credit/progress
    const credit: any = {}; // TEMP ANY
    const sharedProgress = achSharedProg[acctID] || {};
    const quests: any = {}; // TEMP ANY
    if (!chars) continue;
    for (const charID in chars) {
      // Ensure character matches account
      const char = chars[charID];
      const validPlayerAcct = playerAccts[char.account];
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
              const existing_date = quests[questID]['timer'];
              const incoming_date = quest.timer;

              // Use more recent date for Loremaster progress
              if (incoming_date > existing_date) quests[questID] = quest;
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
    all[acctID]['sharedProgress'] = sharedProgress;
    all[acctID]['quests'] = quests;
  }

  return all;
}
