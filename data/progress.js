// Achievement: { Progress Criteria, Completion Threshold }

/* Currencies */

const gold = {
  1176: { // Got My Mind On My Money - 100g
    criteria: 3506,
    complete: 1000000
  },
  1177: { // Got My Mind On My Money - 1,000g
    criteria: 3507,
    complete: 10000000
  },
  1178: { // Got My Mind On My Money - 5,000g
    criteria: 3512,
    complete: 50000000
  },
  1180: { // Got My Mind On My Money - 10,000gd
    criteria: 3510,
    complete: 100000000
  },
  1181: { // Got My Mind On My Money - 25,000g
    criteria: 3511,
    complete: 250000000
  }
};

const emblems = {
  3839: { // 25 Dungeon & Raid Emblems
    criteria: 11556,
    complete: 25
  },
  3840: { // 50 Dungeon & Raid Emblems
    criteria: 11601,
    complete: 50
  },
  3841: { // 100 Dungeon & Raid Emblems
    criteria: 11605,
    complete: 100
  },
  3842: { // 250 Dungeon & Raid Emblems
    criteria: 11609,
    complete: 250
  },
  3843: { // 500 Dungeon & Raid Emblems
    criteria: 11613,
    complete: 500
  },
  3844: { // 1000 Dungeon & Raid Emblems
    criteria: 11617,
    complete: 1000
  },
  3876: { // 1500 Dungeon & Raid Emblems
    criteria: 11621,
    complete: 1500
  },
  4316: { // 2500 Dungeon & Raid Emblems
    criteria: 12421,
    complete: 2500
  }
};


/* LFG */

// const lfg = {
//   // UNABLE TO GET CRITERIA - RANDOM BOTS LFG NYI
//   4476: { // Looking For More
//     criteria: UNKNOWN,
//     complete: 10
//   },
//   4477: { // Looking For Many
//     criteria: UNKNOWN,
//     complete: 50
//   },
//   4478: { // Looking For Multitudes
//     criteria: UNKNOWN,
//     complete: 100
//   }
// };


/* PVP */

const arena = {
  398: { // Mercilessly Dedicated
    criteria: 307,
    complete: 100
  },
  875: { // Vengefully Dedicated
    criteria: 1829,
    complete: 200
  },
  876: { // Brutally Dedicated
    criteria: 1830,
    complete: 300
  }
};

const bg = {
  ab: {
    155: { // Arathi Basin Veteran
      criteria: 176,
      complete: 100
    }
  },
  av: {
    219: { // Alterac Valley Veteran
      criteria: 225,
      complete: 100
    }
  },
  eos: {
    209: { // Eye of the Storm Veteran
      criteria: 223,
      complete: 100
    }
  },
  // ioc: { // UNABLE TO GET CRITERIA - BG BUGGED
  //   3777: { // Isle of Conquest Victory
  //     criteria: UNKNOWN,
  //     complete: 100
  //   }
  // },
  soa: {
    1309: { // Strand of the Ancients Veteran
      criteria: 4502,
      complete: 100
    }
  },
  // wg: { // UNABLE TO GET CRITERIA - BG BUGGED
  //   1718: { // Wintergrasp Veteran
  //     criteria: UNKNOWN,
  //     complete: 100
  //   }
  // },
  wsg: {
    167: { // Warsong Gulch Veteran
      criteria: 221,
      complete: 100
    }
  }
}

const hk = {
  513: { // 100 Honorable Kills
    criteria: 6797,
    complete: 100
  },
  515: { // 500 Honorable Kills
    criteria: 6796,
    complete: 500
  },
  516: { // 1000 Honorable Kills
    criteria: 6795,
    complete: 1000
  },
  512: { // 5000 Honorable Kills
    criteria: 6794,
    complete: 5000
  },
  509: { // 10000 Honorable Kills
    criteria: 6793,
    complete: 10000
  },
  239: { // 25000 Honorable Kills
    criteria: 6792,
    complete: 25000
  },
  869: { // 50000 Honorable Kills
    criteria: 6791,
    complete: 50000
  },
  870: { // 100000 Honorable Kills
    criteria: 6790,
    complete: 100000
  }
};


/* Quests */

const bread = {
  1182: { // The Bread Winner
    criteria: 3513,
    complete: 100000000
  }
};

const daily = {
  973: { // 5 Daily Quests Complete
    criteria: 2232,
    complete: 5
  },
  974: { // 50 Daily Quests Complete
    criteria: 2233,
    complete: 50
  },
  975: { // 200 Daily Quests Complete
    criteria: 2234,
    complete: 200
  },
  976: { // 500 Daily Quests Complete
    criteria: 2235,
    complete: 500
  },
  977: { // 1000 Daily Quests Complete
    criteria: 2236,
    complete: 1000
  }
};

const lmA = {
  0: { 
    1676: { // Loremaster of Eastern Kingdoms - Alliance
      criteria: 7884,
      complete: 700
    }
  },
  1: { 
    1678: { // Loremaster of Kalimdor - Alliance
      criteria: 7894,
      complete: 700
    }
  }
};

const lmH = {
  0: { 
    1677: { // Loremaster of Eastern Kingdoms - Horde
      criteria: 7890,
      complete: 550
    }
  },
  1: { 
    1680: { // Loremaster of Kalimdor - Horde
      criteria: 7896,
      complete: 685
    }
  }
};

const quest = {
  503: { // 50 Quests Completed
    criteria: 230,
    complete: 50
  },
  504: { // 100 Quests Completed
    criteria: 231,
    complete: 100
  },
  505: { // 250 Quests Completed
    criteria: 232,
    complete: 250
  },
  506: { // 500 Quests Completed
    criteria: 233,
    complete: 500
  },
  507: { // 1000 Quests Completed
    criteria: 234,
    complete: 1000
  },
  508: { // 1500 Quests Completed
    criteria: 236,
    complete: 1500
  },
  32: { // 2000 Quests Completed
    criteria: 73,
    complete: 2000
  },
  978: { // 3000 Quests Completed
    criteria: 2239,
    complete: 3000
  }
};

module.exports = {
  gold: gold,
  emblems: emblems,
  // lfg: lfg,
  arena: arena,
  bg: bg,
  hk: hk,
  bread: bread,
  daily: daily,
  lmA: lmA,
  lmH: lmH,
  quest: quest
};
