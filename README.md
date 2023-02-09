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


============ ALL BELOW MUST BE DONE FROM ACTIVATED VE ============

INSTALL PYTHON DEPENDENCIES
pip install -r requirements.txt


RUN SERVER
python src/manage.py runserver --settings=spp_extras.settings.dev   |   run from electron/index


CREATE MODELS
python src/manage.py inspectdb --database=characters > src/spp_extras_api/characters.py

MIGRATE AFTER CHANGING MODELS
python src/manage.py migrate --database=wotlkmangos --fake spp_extras_api


PACKAGE
pyinstaller --name=spp_extras_api src\manage.py --noconfirm

TEST PACKAGED SERVER
cd dist\spp_extras_api
spp_extras_api.exe runserver --settings=spp_extras.settings.prod --noreload

============ ALL ABOVE MUST BE DONE FROM ACTIVATED VE ============
