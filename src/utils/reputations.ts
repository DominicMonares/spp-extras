// Organize reputation data by character
export const formatReputations = (reputations: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  reputations.forEach((rep: any) => { // TEMP ANY
    const guid = rep.guid.toString();
    const faction = rep.faction.toString();
    const standing = rep.standing;
    if (!all[guid]) all[guid] = {};
    all[guid][faction] = standing;
  });
  return all;
}
