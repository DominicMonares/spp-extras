# spp-extras
Desktop application for WoW Single Player Project extras.

TODO
- Add source code and bug report links at in top menu
- Cleanup warning messages in console
  - Development server logging during production
- Create installation and portable versions of app
- Replace double quotes with singles wherever possible
- Go through remaining old files to double check - main splash screen
- Create actual readme file
- Auto updater
- Reputations - ensure that horde doesn't go to war with horde


TEST
General
  - Starting prod build without database running - websocket
  - Test everything in production


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
