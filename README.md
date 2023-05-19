# spp-extras
Desktop application for WoW Single Player Project extras.

python 3.9.13
virtualenv 20.16.6
node 14.21.0

MUST USE CMD

Install npm/yarn
yarn install

Create python package lock
pip freeze > requirements.txt

=========================================================


DJANGO SETUP
cd api

CREATE VIRTUAL ENV
python -m virtualenv spp_extras_env   |   api:env

ACTIVATE VE
.\spp_extras_env\Scripts\activate
. spp_extras_env/bin/activate FOR MAC ONLY


============ ALL BELOW MUST BE DONE FROM ACTIVATED VE ============

INSTALL PYTHON DEPENDENCIES
pip install -r requirements.txt


RUN SERVER
python src/manage.py runserver --settings=spp_extras.settings.dev   |   run from electron/index


CREATE MODELS
python src/manage.py inspectdb --database=wotlkcharacters > src/spp_extras_api/characters.py

MIGRATE AFTER CHANGING MODELS
python src/manage.py makemigrations
python src/manage.py migrate --database=wotlkcharacters --fake spp_extras_api


PACKAGE
pyinstaller --name=spp_extras_api src\manage.py --noconfirm

TEST PACKAGED SERVER
cd dist\spp_extras_api
spp_extras_api.exe runserver --settings=spp_extras.settings.prod --noreload

============ ALL ABOVE MUST BE DONE FROM ACTIVATED VE ============


TODO
- Final styling cleanup
  - Window size
  - Taskbar, window, and other icons for production
- Create actual readme file


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
