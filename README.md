# spp-extras
Desktop application for WoW Single Player Project extras.

TODO
- Create installation and portable versions of app
- Create actual readme file
- Auto updater

TEST
General
  - Quest Tracker
    - Expansion
    - Types
  - Account-Wide
    - Achievements
      - gold - x
      - emblems - x
      - dedicated (arena) - x
      - arathi basin - x
      - alterac valley - x
      - eye of the storm - x
      - strand of the ancients - X - bg too unstable to test
      - warsong gulch - x
      - honorable kills - x - STILL REQUIRES HK SHARE
      - bread winner - x
      - dailies - x
      - loremaster alliance - x
      - loremaster horde - x
      - quests - x - COUNTER STILL DOESN'T WORK
      - mail reward items for multiple characters and multiple rewards at once
      - see if earning ek/k loremaster through sharing prog, if loremaster ol/northrend are
        already earned, does the main loremaster achievement need to be transferred or will
        it trigger on login? 

    - Pets Mounts
      - Factions
      - Neutral

    - Reputations
      - At war
      - General

  - Preferences


NOTES
Loremaster:
  Some quests like Captain's Chest are neutral but are different quests
    - Alliance is 614 and Horde is 8551
    - This doesn't seem to be the case for all though - further testing needed

All account-wide tools:
  Deleting a character will remove most of their progress from your account-wide prog
  If you want to delete a character to make space, but want to keep their account-wide prog,
  I recommend creating a second account and moving that char to the second account using an
  editor like HeidiSQL
    - get account id from wotlkrealmd > account and change the character's account in wotlkcharacters > characters

Account-wide rep:
  - Progress won't appear in the in-game Reputation tab until a character has discovered the rep

Account-wide rep and pets/mounts:
  - Random bot accounts are not included in the rep or pets/mounts transfers
  - I decided not to implement this because rep/pets/mounts cannot be inspected in-game


cwebp -q 100 collapse-arrow.png -o collapse-arrow.webp
