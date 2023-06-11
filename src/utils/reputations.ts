import { AllReputations, RawReputations } from 'types';

// Organize reputation data by character
export const formatReputations = (reputations: RawReputations) => {
  const all: AllReputations = {};
  reputations.forEach(rep => {
    const guid = rep.guid;
    const faction = rep.faction;
    if (!all[guid]) all[guid] = {};
    all[guid][faction] = {
      standing: rep.standing,
      flags: rep.flags,
    };
  });
  return all;
}
