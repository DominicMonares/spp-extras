<div align="center">
  <img
    src="https://github.com/DominicMonares/spp-extras/blob/main/assets/logos/main-logo.png"
    width="363"
    height="177"
  />
  <p>
    A desktop application that provides miscellaneous tools for use with
    <a href="https://github.com/celguar/spp-classics-cmangos">
      Celguar's SPP Classics Repack
    </a>
  </p>
</div>

# Account-Wide
Transfer data between all of your characters
  - All non-bot accounts are combined, so you can share between multiple accounts if you want to have more than 10 characters
  - Transfers can be run for bot accounts in addition to yours if the option is selected
    - You will not receive any achievements, pets, etc. from bot accounts and vice versa

## Achievements
https://github.com/DominicMonares/spp-extras/assets/78285106/045ca524-c156-4bb6-9b41-7049225a9787

### Credit
  - Achievements that have been earned on any character are shared between all other characters
  - Faction specific achievements are converted depending on each character's faction
  - Achievements transferred to characters will use the earliest date if earned on multiple characters
  - Achievements won't be overwritten on any characters

### Rewards
  - Every new achievement transferred also grants its corresponding title and/or item rewards
  - Faction specific rewards are converted depending on each character's faction
  - All item rewards will be sent to each character's mailbox
  - Running this transfer will restore cut titles to the world database, including Realm First titles and "the Flawless Victor"
  - Feats of Strength that don't explicitly reward titles yet are title related (Vanilla PVP titles, "Scarab Lord", etc.) will give each character the title

### Progress
  - Progress for the following achievement chains are shared between all characters:
    - Quests Complete (50 - 3,000)
    - Daily Quests Complete (5 - 1,000)
    - Loremaster of Eastern Kingdoms
      - Progress tracked separately for each faction
    - Loremaster of Kalimdor
      - Progress tracked separately for each faction
    - Got My Mind On My Money (100g - 25,000g)
    - The Bread Winner
    - Dungeon & Raid Emblems (25 - 2,500)
    - Looking for More/Many/Multitudes
    - Honorable Kills (100 - 100,000)
    - Mercilessly/Vengefully/Brutally Dedicated
    - Battleground Veteran
      - Alterac Valley
      - Arathi Basin
      - Eye of the Storm
      - Isle of Conquest
      - Strand of the Ancients
      - Warsong Gulch
      - Wintergrasp
  - If the combined progress for an achievement is greater than the completion threshold, the achievement credit and rewards will be added

## Pets & Mounts
https://github.com/DominicMonares/spp-extras/assets/78285106/e3d4c5e6-12fe-455f-8697-08149f158515

- All known pets and mounts are shared between all characters
- Pet and mount items are not transferred, only their spells, so they will be available to summon/ride right away
- Faction specific pets and mounts are converted depending on each character's faction
- Counts toward Mountain o' Mounts achievement chain
- Counts toward Lil' Game Hunter achievement chain

## Reputations
https://github.com/DominicMonares/spp-extras/assets/78285106/53787772-e8da-4dc7-835d-7e83e3ccc882

- The highest current standing for each reputation is shared between all characters
- Faction specific reputations do not get shared (i.e. Horde characters won't get Stormwind rep)
  - Faction specific standings are **not** converted to their opposing faction equivalents
- "At War" flags will not be applied unless all characters are at war with that reputation/faction
- Counts toward Exalted Reputations (5 - 40) achievement chain

# Quest Tracker
Track the completion status of all quests

https://github.com/DominicMonares/spp-extras/assets/78285106/bbd40f4f-2e42-448b-8394-f29c300018f4

- Completed quests are marked with green circles and incomplete quests with red circles
- Quests can be sorted by name, ID, or completion status

## Primary Filters
  - Quests are always filtered by either Alliance or Horde
    - Neutral quests are always included
  - At least one of the following options must be selected to view quests:
    - Zone
      - Filter by world, dungeon, raid, or battleground quests
    - Class
    - Race
    - All Quests 

## Secondary Filters
  - After a primary filter is selected, you can selected the following secondary filters:
    - Character
      - Shows quest completion status for the selected character
    - Quest Type
      - Filter by regular, daily, weekly, or monthly quests

# Warnings & Limitations:
  - Account-Wide data transfers are irreversible, making a backup of your game save/database through the SPP Classics launcher before running any transfers is **STRONGLY** recommended
  - Your characters must be logged out before running transfers for them to work properly
  - Transfers only work on characters that have logged in at least once since being created
  - If your alts are logged in as bots, any achievement progress they make will count toward shared progress
  - Mounts that are above a character's riding skill level are not given to that character on transfer, you will need to re-run the transfer once they have the appropriate riding skill to transfer those mounts to them
  - Retrieving achievement item rewards from your characters' mail boxes immediately after transfer is **strongly** recommended, in order to reduce the risk of mail being lost
  - Due to how the following achievement chains track progress, in-game progress counters for them do not update properly when new progress is earned and won't reflect the true total until after the transfer is run:
    - Quests Complete (50 - 3,000)
    - Honorable Kills (100 - 100,000)
  - Deleting a character will remove most of their progress from your account-wide achievement progress
    - If you want to delete a character to make space, but want to keep their account-wide progress, I recommend creating a second account and moving that character to the second account using an editor like HeidiSQL
      - Get the newly created account ID from classicrealmd/tbcrealmd/wotlkrealmd > account
      - Find the character you planned to delete in classiccharacters/tbccharacters/wotlkcharacters > characters
      - Change their current account ID to the newly created account ID

# Installation
### For Users
If installing separate from SPP Classics (only current method, merge TBD):
  - Download [latest release](https://github.com/DominicMonares/spp-extras/releases)
  - Run SPPE_Installer.exe

Can be uninstalled via Windows Control Panel

### For Devs
```
npm install
```

# Usage
### For Users
- Ensure the database is running
- Run SPPE.exe (default shortcut located on desktop)

### For Devs
Run program:
```
npm start
```
  
Create release (both installer and unpacked versions):
```
npm run package
```

[Celguar's SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos) is CMaNGOS based, so this program will likely work with other CMaNGOS based repacks or forks.

If testing with a repack or fork other than [Celguar's SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos), be sure to make a database backup and check src/main/db/connection.ts to ensure database credentials are correct.
