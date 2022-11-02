// Achievement: { Associated Faction, Opposing Faction Version of Achievement }
const factionAchievements = {
  /* Dungeons & Raids */

  /* Wrath of the Lich King */
  4296: { faction: 'A', alt: 3778 }, // Trial of the Champion
  3778: { faction: 'H', alt: 4296 }, // Trial of the Champion
  4298: { faction: 'A', alt: 4297 }, // Heroic: Trial of the Champion
  4297: { faction: 'H', alt: 4298 }, // Heroic: Trial of the Champion


  /* Feats of Strength */

  /* Dungeons & Raids */
  4156: { faction: 'A', alt: 4079 }, // A Tribute to Immortality
  4079: { faction: 'H', alt: 4156 }, // A Tribute to Immortality
  4784: { faction: 'A', alt: 4785 }, // Emblematic
  4785: { faction: 'H', alt: 4784 }, // Emblematic

  /* Mounts */
  3356: { faction: 'A', alt: 3357 }, // Winterspring Frostsaber
  3357: { faction: 'H', alt: 3356 }, // Venomhide Ravasaur

  /* PVP */
  442: { faction: 'A', alt: 454 }, // Private
  454: { faction: 'H', alt: 442 }, // Scout
  470: { faction: 'A', alt: 468 }, // Corporal
  468: { faction: 'H', alt: 470 }, // Grunt
  471: { faction: 'A', alt: 453 }, // Sergeant
  453: { faction: 'H', alt: 471 }, // Sergeant
  441: { faction: 'A', alt: 450 }, // Master Sergeant
  450: { faction: 'H', alt: 441 }, // Senior Sergeant
  440: { faction: 'A', alt: 452 }, // Sergeant Major
  452: { faction: 'H', alt: 440 }, // First Sergeant
  439: { faction: 'A', alt: 451 }, // Knight
  451: { faction: 'H', alt: 439 }, // Stone Guard
  472: { faction: 'A', alt: 449 }, // Knight-Lieutenant
  449: { faction: 'H', alt: 472 }, // Blood Guard
  438: { faction: 'A', alt: 469 }, // Knight-Captain
  469: { faction: 'H', alt: 438 }, // Legionnaire
  437: { faction: 'A', alt: 448 }, // Knight-Champion
  448: { faction: 'H', alt: 437 }, // Centurion
  436: { faction: 'A', alt: 447 }, // Lieutenant Commander
  447: { faction: 'H', alt: 436 }, // Champion
  435: { faction: 'A', alt: 444 }, // Commander
  444: { faction: 'H', alt: 435 }, // Lieutenant General
  473: { faction: 'A', alt: 446 }, // Marshal
  446: { faction: 'H', alt: 473 }, // General
  434: { faction: 'A', alt: 445 }, // Field Marshal
  445: { faction: 'H', alt: 434 }, // Warlord
  433: { faction: 'A', alt: 443 }, // Grand Marshal
  443: { faction: 'H', alt: 433 }, // High Warlord

  /* Realm Firsts */
  1406: { faction: 'A', alt: null }, // Realm First! Level 80 Draenei
  1405: { faction: 'H', alt: null }, // Realm First! Level 80 Blood Elf
  1407: { faction: 'A', alt: null }, // Realm First! Level 80 Dwarf
  1413: { faction: 'H', alt: null }, // Realm First! Level 80 Forsaken
  1404: { faction: 'A', alt: null }, // Realm First! Level 80 Gnome
  1412: { faction: 'H', alt: null }, // Realm First! Level 80 Troll
  1408: { faction: 'A', alt: null }, // Realm First! Level 80 Human
  1410: { faction: 'H', alt: null }, // Realm First! Level 80 Orc
  1409: { faction: 'A', alt: null }, // Realm First! Level 80 Night Elf
  1411: { faction: 'H', alt: null }, // Realm First! Level 80 Tauren

  /* World Events */
  4786: { faction: 'A', alt: 4790 }, // Operation: Gnomeregan
  4790: { faction: 'H', alt: 4786 }, // Zalazane's Fall


  /* General */

  /* Mounts */
  2536: { faction: 'A', alt: 2537 }, // Mountain o' Mounts
  2537: { faction: 'H', alt: 2536 }, // Mountain o' Mounts


  /* Professions  */

  /* Cooking */
  1563: { faction: 'A', alt: 1784 }, // Hail to the Chef
  1784: { faction: 'H', alt: 1563 }, // Hail to the Chef
  1782: { faction: 'A', alt: 1783 }, // Our Daily Bread
  1783: { faction: 'H', alt: 1782 }, // Our Daily Bread


  /* PVP */

  /* General */
  230: { faction: 'A', alt: 1175 }, // Battlemaster
  1175: { faction: 'H', alt: 230 }, // Battlemaster
  610: { faction: 'A', alt: 615 }, // Death to the Warchief!
  615: { faction: 'H', alt: 610 }, // Storming Stormwind
  611: { faction: 'A', alt: 616 }, // Bleeding Bloodhoof
  616: { faction: 'H', alt: 611 }, // Death to the King!
  612: { faction: 'A', alt: 617 }, // Downing the Dark Lady
  617: { faction: 'H', alt: 612 }, // Immortal No More
  613: { faction: 'A', alt: 618 }, // Killed in Quel'Thalas
  618: { faction: 'H', alt: 613 }, // Putting Out the Light
  908: { faction: 'A', alt: 909 }, // Call to Arms!
  909: { faction: 'H', alt: 908 }, // Call to Arms!
  388: { faction: 'A', alt: 1006 }, // City Defender
  1006: { faction: 'H', alt: 388 }, // City Defender
  614: { faction: 'A', alt: 619 }, // For The Alliance!
  619: { faction: 'H', alt: 614 }, // For The Horde!
  701: { faction: 'A', alt: 700 }, // Freedom of the Alliance
  700: { faction: 'H', alt: 701 }, // Freedom of the Horde
  2016: { faction: 'A', alt: 2017 }, // Grizzled Veteran
  2017: { faction: 'H', alt: 2016 }, // Grizzled Veteran
  246: { faction: 'A', alt: 1005 }, // Know Thy Enemy
  1005: { faction: 'H', alt: 246 }, // Know Thy Enemy
  907: { faction: 'A', alt: 714 }, // The Justicar
  714: { faction: 'H', alt: 907 }, // The Conqueror
  604: { faction: 'A', alt: 603 }, // Wrath of the Alliance
  603: { faction: 'H', alt: 604 }, // Wrath of the Horde

  /* Alterac Valley */
  225: { faction: 'A', alt: 1164 }, // Everything Counts
  1164: { faction: 'H', alt: 225 }, // Everything Counts
  1151: { faction: 'A', alt: 224 }, // Loyal Defender
  224: { faction: 'H', alt: 1151 }, // Loyal Defender
  220: { faction: 'A', alt: 873 }, // Stormpike Perfection
  873: { faction: 'H', alt: 220 }, // Frostwolf Perfection
  707: { faction: 'A', alt: 706 }, // Stormpike Battle Charger
  706: { faction: 'H', alt: 707 }, // Frostwolf Howler
  709: { faction: 'A', alt: 708 }, // Hero of the Stormpike Guard
  708: { faction: 'H', alt: 709 }, // Hero of the Frostwolf Clan
  1167: { faction: 'A', alt: 1168 }, // Master of Alterac Valley
  1168: { faction: 'H', alt: 1167 }, // Master of Alterac Valley

  /* Arathi Basin */
  711: { faction: 'A', alt: 710 }, // Knight of Arathor
  710: { faction: 'H', alt: 711 }, // The Defiler
  1169: { faction: 'A', alt: 1170 }, // Master of Arathi Basin
  1170: { faction: 'H', alt: 1169 }, // Master of Arathi Basin

  /* Isle of Conquest */
  3856: { faction: 'A', alt: 4256 }, // Demolition Derby
  4256: { faction: 'H', alt: 3856 }, // Demolition Derby
  3851: { faction: 'A', alt: 4177 }, // Mine
  4177: { faction: 'H', alt: 3851 }, // Mine
  3857: { faction: 'A', alt: 3957 }, // Master of Isle of Conquest
  3957: { faction: 'H', alt: 3857 }, // Master of Isle of Conquest

  /* Strand of the Ancients */
  1757: { faction: 'A', alt: 2200 }, // Defense of the Ancients
  2200: { faction: 'H', alt: 1757 }, // Defense of the Ancients
  1762: { faction: 'A', alt: 2192 }, // Not Even a Scratch
  2192: { faction: 'H', alt: 1762 }, // Not Even a Scratch
  2194: { faction: 'A', alt: 2195 }, // Master of Strand of the Ancients 
  2195: { faction: 'H', alt: 2194 }, // Master of Strand of the Ancients 

  /* Warsong Gulch */
  203: { faction: 'A', alt: 1251 }, // Not in My House
  1251: { faction: 'H', alt: 203 }, // Not in My House
  202: { faction: 'A', alt: 1502 }, // Quick Cap
  1502: { faction: 'H', alt: 202 }, // Quick Cap
  713: { faction: 'A', alt: 712 }, // Silverwing Sentinel
  712: { faction: 'H', alt: 713 }, // Warsong Outrider
  206: { faction: 'A', alt: 1252 }, // Supreme Defender
  1252: { faction: 'H', alt: 206 }, // Supreme Defender
  1172: { faction: 'A', alt: 1173 }, // Master of Warsong Gulch
  1173: { faction: 'H', alt: 1172 }, // Master of Warsong Gulch

  /* Wintergrasp */
  1737: { faction: 'A', alt: 2476 }, // Destruction Derby
  2476: { faction: 'H', alt: 1737 }, // Destruction Derby
  1752: { faction: 'A', alt: 2776 }, // Master of Wintergrasp
  2776: { faction: 'H', alt: 1752 }, // Master of Wintergrasp


  /* Quests */

  /* General */
  1681: { faction: 'A', alt: 1682 }, // The Loremaster
  1682: { faction: 'H', alt: 1681 }, // The Loremaster

  /* Classic */
  1676: { faction: 'A', alt: 1677 }, // Loremaster of Eastern Kingdoms
  1677: { faction: 'H', alt: 1676 }, // Loremaster of Eastern Kingdoms
  1678: { faction: 'A', alt: 1680 }, // Loremaster of Kalimdor
  1680: { faction: 'H', alt: 1678 }, // Loremaster of Kalimdor

  /* The Burning Crusade */
  1192: { faction: 'A', alt: 1273 }, // Nagrand Slam
  1273: { faction: 'H', alt: 1192 }, // Nagrand Slam
  899: { faction: 'A', alt: 901 }, // Oh My, Kurenai
  901: { faction: 'H', alt: 899 }, // Mag'har of Draenor
  1191: { faction: 'A', alt: 1272 }, // Terror of Terokkar
  1272: { faction: 'H', alt: 1191 }, // Terror of Terokkar
  764: { faction: 'A', alt: 763 }, // The Burning Crusader
  763: { faction: 'H', alt: 764 }, // The Burning Crusader
  1189: { faction: 'A', alt: 1271 }, // To Hellfire and Back
  1271: { faction: 'H', alt: 1189 }, // To Hellfire and Back
  1262: { faction: 'A', alt: 1274 }, // Loremaster of Outland
  1274: { faction: 'H', alt: 1262 }, // Loremaster of Outland

  /* Wrath of the Lich King */
  37: { faction: 'A', alt: 1357 }, // Fo' Grizzle My Shizzle
  1357: { faction: 'H', alt: 37 }, // Fo' Grizzle My Shizzle
  34: { faction: 'A', alt: 1356 }, // I've Toured the Fjord
  1356: { faction: 'H', alt: 34 }, // I've Toured the Fjord
  35: { faction: 'A', alt: 1359 }, // Might of Dragonblight
  1359: { faction: 'H', alt: 35 }, // Might of Dragonblight
  33: { faction: 'A', alt: 1358 }, // Nothing Boring About Borean
  1358: { faction: 'H', alt: 33 }, // Nothing Boring About Borean
  1012: { faction: 'A', alt: 1011 }, // The Winds of the North
  1011: { faction: 'H', alt: 1012 }, // The Winds of the North
  41: { faction: 'A', alt: 1360 }, // Loremaster of Northrend
  1360: { faction: 'H', alt: 41 }, // Loremaster of Northrend


  /* Reputation */

  /* General */
  948: { faction: 'A', alt: 762 }, // Ambassador of the Alliance
  762: { faction: 'H', alt: 948 }, // Ambassador of the Horde
  942: { faction: 'A', alt: 943 }, // The Diplomat
  943: { faction: 'H', alt: 942 }, // The Diplomat


  /* World Events */

  /* General */
  2144: { faction: 'A', alt: 2145 }, // What A Long, Strange Trip It's Been
  2145: { faction: 'H', alt: 2144 }, // What A Long, Strange Trip It's Been

  /* Argent Tournament */
  3676: { faction: 'A', alt: 3677 }, // A Silver Confidant
  3677: { faction: 'H', alt: 3676 }, // The Sunreavers
  2777: { faction: 'A', alt: 2786 }, // Champion of Darnassus
  2786: { faction: 'H', alt: 2777 }, // Champion of Thunder Bluff
  2779: { faction: 'A', alt: 2784 }, // Champion of Gnomeregan
  2784: { faction: 'H', alt: 2779 }, // Champion of Sen'jin
  2780: { faction: 'A', alt: 2787 }, // Champion of Ironforge
  2787: { faction: 'H', alt: 2780 }, // Champion of Undercity
  2781: { faction: 'A', alt: 2783 }, // Champion of Stormwind
  2783: { faction: 'H', alt: 2781 }, // Champion of Orgrimmar
  2778: { faction: 'A', alt: 2785 }, // Champion of the Exodar
  2785: { faction: 'H', alt: 2778 }, // Champion of Silvermoon City
  2782: { faction: 'A', alt: 2788 }, // Champion of the Alliance
  2788: { faction: 'H', alt: 2782 }, // Champion of the Horde
  2760: { faction: 'A', alt: 2768 }, // Exalted Champion of Darnassus
  2768: { faction: 'H', alt: 2760 }, // Exalted Champion of Thunder Bluff
  2762: { faction: 'A', alt: 2766 }, // Exalted Champion of Gnomeregan
  2766: { faction: 'H', alt: 2762 }, // Exalted Champion of Sen'jin
  2763: { faction: 'A', alt: 2769 }, // Exalted Champion of Ironforge
  2769: { faction: 'H', alt: 2763 }, // Exalted Champion of the Undercity
  2764: { faction: 'A', alt: 2765 }, // Exalted Champion of Stormwind
  2765: { faction: 'H', alt: 2764 }, // Exalted Champion of Orgrimmar
  2761: { faction: 'A', alt: 2767 }, // Exalted Champion of the Exodar
  2767: { faction: 'H', alt: 2761 }, // Exalted Champion of Silvermoon City
  2817: { faction: 'A', alt: 2816 }, // Exalted Argent Champion of the Alliance
  2816: { faction: 'H', alt: 2817 }, // Exalted Argent Champion of the Horde

  /* Brewfest */
  1184: { faction: 'A', alt: 1203 }, // Strange Brew
  1203: { faction: 'H', alt: 1184 }, // Strange Brew
  1684: { faction: 'A', alt: 1683 }, // Brewmaster
  1683: { faction: 'H', alt: 1684 }, // Brewmaster

  /* Hallow's End */
  1040: { faction: 'A', alt: 1041 }, // Rotten Hallow
  1041: { faction: 'H', alt: 1040 }, // Rotten Hallow
  970: { faction: 'A', alt: 971 }, // Tricks and Treats of Azeroth
  971: { faction: 'H', alt: 970 }, // Tricks and Treats of Azeroth
  966: { faction: 'A', alt: 967 }, // Tricks and Treats of Eastern Kingdoms
  967: { faction: 'H', alt: 966 }, // Tricks and Treats of Eastern Kingdoms
  963: { faction: 'A', alt: 965 }, // Tricks and Treats of Kalimdor
  965: { faction: 'H', alt: 963 }, // Tricks and Treats of Kalimdor
  969: { faction: 'A', alt: 968 }, // Tricks and Treats of Outland
  968: { faction: 'H', alt: 969 }, // Tricks and Treats of Outland
  3846: { faction: 'A', alt: 4176 }, // Resource Glut
  4176: { faction: 'H', alt: 3846 }, // Resource Glut
  1656: { faction: 'A', alt: 1657 }, // Hallowed Be Thy Name
  1657: { faction: 'H', alt: 1656 }, // Hallowed Be Thy Name

  /* Love is in the Air */
  1279: { faction: 'A', alt: 1280 }, // Flirt With Disaster
  1280: { faction: 'H', alt: 1279 }, // Flirt With Disaster
  1697: { faction: 'A', alt: 1698 }, // Nation of Adoration
  1698: { faction: 'H', alt: 1697 }, // Nation of Adoration
  1707: { faction: 'A', alt: 1693 }, // Fool For Love
  1693: { faction: 'H', alt: 1707 }, // Fool For Love

  /* Midsummer */
  1035: { faction: 'A', alt: 1037 }, // Desecration of the Horde
  1037: { faction: 'H', alt: 1035 }, // Desecration of the Alliance
  1028: { faction: 'A', alt: 1031 }, // Extinguishing Eastern Kingdoms
  1031: { faction: 'H', alt: 1028 }, // Extinguishing Eastern Kingdoms
  1029: { faction: 'A', alt: 1032 }, // Extinguishing Kalimdor
  1032: { faction: 'H', alt: 1029 }, // Extinguishing Kalimdor
  1030: { faction: 'A', alt: 1033 }, // Extinguishing Outland
  1033: { faction: 'H', alt: 1030 }, // Extinguishing Outland
  1022: { faction: 'A', alt: 1025 }, // Flame Warden of Eastern Kingdoms
  1025: { faction: 'H', alt: 1022 }, // Flame Keeper of Eastern Kingdoms
  1023: { faction: 'A', alt: 1026 }, // Flame Warden of Kalimdor
  1026: { faction: 'H', alt: 1023 }, // Flame Keeper of Kalimdor
  1024: { faction: 'A', alt: 1027 }, // Flame Warden of Outland
  1027: { faction: 'H', alt: 1024 }, // Flame Keeper of Outland
  1034: { faction: 'A', alt: 1036 }, // The Fires of Azeroth
  1036: { faction: 'H', alt: 1034 }, // The Fires of Azeroth
  1038: { faction: 'A', alt: 1039 }, // The Flame Warden
  1039: { faction: 'H', alt: 1038 }, // The Flame Keeper

  /* Noble Garden */
  2421: { faction: 'A', alt: 2420 }, // Noble Garden
  2420: { faction: 'H', alt: 2421 }, // Noble Garden
  2797: { faction: 'A', alt: 2798 }, // Noble Gardener
  2798: { faction: 'H', alt: 2797 }, // Noble Gardener
  2419: { faction: 'A', alt: 2497 }, // Spring Fling
  2497: { faction: 'H', alt: 2419 }, // Spring Fling

  /* Pilgrim's Bounty */
  3576: { faction: 'A', alt: 3577 }, // Now We're Cookin'
  3577: { faction: 'H', alt: 3576 }, // Now We're Cookin'
  3556: { faction: 'A', alt: 3557 }, // Pilgrim's Paunch
  3557: { faction: 'H', alt: 3556 }, // Pilgrim's Paunch
  3580: { faction: 'A', alt: 3581 }, // Pilgrim's Peril
  3581: { faction: 'H', alt: 3580 }, // Pilgrim's Peril
  3596: { faction: 'A', alt: 3597 }, // Pilgrim's Progress
  3597: { faction: 'H', alt: 3596 }, // Pilgrim's Progress
  3478: { faction: 'A', alt: 3656 }, // Pilgrim
  3656: { faction: 'H', alt: 3478 }, // Pilgrim

  /* Winter Veil */
  4436: { faction: 'A', alt: 4437 }, // BB King
  4437: { faction: 'H', alt: 4436 }, // BB King
  1686: { faction: 'A', alt: 1685 }, // Bros. Before Ho Ho Ho's
  1685: { faction: 'H', alt: 1686 }, // Bros. Before Ho Ho Ho's
  1255: { faction: 'A', alt: 259 }, // Scrooge
  259: { faction: 'H', alt: 1255 }, // Scrooge
  1692: { faction: 'A', alt: 1691 }, // Merrymaker
  1691: { faction: 'H', alt: 1692 }, // Merrymaker
};

module.exports = { factionAchievements: factionAchievements };
