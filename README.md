<div align="center">
  <img
    src="https://github.com/DominicMonares/spp-extras/blob/main/assets/logos/main.png"
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
Transfer data between all characters for each account
  - All non-bot accounts are combined, so you can share between multiple accounts if you want to have more than 10 characters
  - Achievement transfers can be applied to bots if the option is selected

## Achievements
  - Achievements that have been earned on any character are shared between all other characters
  - Faction specific achievements are converted depending on each character's faction
  - Achievements transferred to characters will use the earliest date if earned on multiple characters
  - Achievements won't be overwritten on any characters

- Transfers achievement rewards between all characters
  - Every new achievement transferred also grants its corresponding title and/or item rewards
  - Faction specific rewards are converted depending on each character's faction
  - Feats of strength that don't explicitly reward titles but are title related (Vanilla PVP titles, Scarab Lord, etc.) are rewarded when shared
  - All item rewards will appear in each character's mailbox on login 

- Transfers achievement progress for select achievements between all characters
  - Achievements and achievement chains include:
    - Got My Mind On My Money (100g - 25,000g)
    - Dungeon & Raid Emblems (25 - 2,500)
    - Mercilessly, Vengefully, and Brutally Dedicated
    - Battleground Veteran
      - Alterac Valley
      - Arathi Basin
      - Eye of the Storm
      - Strand of the Ancients
      - Warsong Gulch
    - Honorable Kills (100 - 100,000)
    - The Bread Winner
    - Daily Quests Complete (5 - 1,000)
    - Quests Complete (50 - 3,000)
    - Loremaster of Eastern Kingdoms (Progress tracked separately for each faction)
    - Loremaster of Kalimdor (Progress tracked separately for each faction)
  - If the combined progress for an achievement is greater than the completion threshold, the achievement and reward will be added
  
## Pets & Mounts
  - Pet and mount items are not transferred, only their spells
  - Faction specific pets and mounts are converted depending on each character's faction
  - Counts toward Mountain o' Mounts achievement chain
  - Counts toward Lil' Game Hunter achievement chain

## Reputations
  - Takes the highest standing for each reputation and transfers to all other characters
  - Faction specific reputations do not get shared (i.e. Horde characters won't get Stormwind rep)
    - Faction specific standings are NOT converted to their opposing faction equivalents
  - Counts toward REP CHAIN NAME HERE
  
- Cut title content has been restored, including Realm First titles and 'the Flawless Victor'

- All non-bot accounts are combined, so you can share between multiple accounts if you want to play more than 10 characters
- Achievement transfers can be applied to bots if option is selected.

# Quest Tracker
An in-depth 


## Warnings/Limitations:
  - Always make a backup save before transferring
  - Must be logged out before transferring
  - You will no longer be able to see individual honorable kills per character, as they need to be shared in order for the in-game achievement counter to work properly
  - If your alts are logged in as bots, any progress they make will count toward shared progress
  - Mounts that are above a character's riding skill level are not given to that character on transfer, you will need to re-run the transfer once they have the appropriate riding skill to share those mounts with them
  - It is highly recommended to retrieve item rewards from mail immediately after transfer, in order to reduce risk of mail being lost
  - Only works on characters that have logged in at least once since being created
  - In-game progress counters do not work properly for X Quests Complete, Loremaster of the Eastern Kingdoms, and Loremaster of Kalimdor due to limitations
    - Unless playing a Blood Elf or Draenei, the in-game progress counters for these achievements may not update after completing eligible quests, but progress will still be counted and the in-game counter will be updated next time the user runs the transfer
  - Progress for Isle of Conquest and Wintergrasp Veteran achievements currently unavailable, will be updated once they're playable
  - Progress for Looking for More, Many, and Multitudes achievements currently unavailable, will be updated once LFG is usable with solo queue

## Installation:
### For Users
Download [latest release](https://github.com/akaClay/spp-achievements/releases), save anywhere.
  
### For Devs
```
npm install
```

## Usage:
### For Users
- Ensure that database is running
- Run .exe file
    
### For Devs
Run program:
```
npm start
```
  
Build .exe file:
```
npm run build
```

If testing with a repack or fork other than [Celguar's SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos), be sure to make a database backup and check config.js to ensure database credentials are correct.


https://github.com/DominicMonares/spp-extras/assets/78285106/3ea33f6f-cb81-4fb1-892f-4467e55e5fd3



https://github.com/DominicMonares/spp-extras/assets/78285106/967ac467-ca81-4268-9dbb-8dfeee065a09



https://github.com/DominicMonares/spp-extras/assets/78285106/fb9db23e-1e6d-48f4-8d89-a5bca5f5dbd4



https://github.com/DominicMonares/spp-extras/assets/78285106/a287fd1a-92e5-4f7a-ad8c-19a6e67de800


NOTES
Loremaster:
  Some quests like Captain's Chest are neutral but are different quests
    - Alliance is 614 and Horde is 8551
    - This doesn't seem to be the case for all though - further testing needed
Completed Quest in-game counter doesn't work without cluttering db/sharing quests

All account-wide tools:
  Deleting a character will remove most of their progress from your account-wide prog
  If you want to delete a character to make space, but want to keep their account-wide prog,
  I recommend creating a second account and moving that char to the second account using an
  editor like HeidiSQL
    - get account id from wotlkrealmd > account and change the character's account in wotlkcharacters > characters

Account-wide rep and pets/mounts:
  - Random bot accounts are not included in the rep or pets/mounts transfers
  - I decided not to implement this because rep/pets/mounts cannot be inspected in-game

Rep achievement progress is on character basis

[SPP Classics Repack](https://github.com/celguar/spp-classics-cmangos) is CMaNGOS based so this program will likely work with other CMaNGOS based repacks or forks.
