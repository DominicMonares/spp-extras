# spp-extras
Desktop application for WoW Single Player Project extras.


POWERSHELL
Install npm/yarn
yarn install

Have Python3 installed

Create python package lock
pip freeze > requirements.txt

Instal python dependencies
pip install -r requirements.txt


Django setup
cd api

CREATE VIRTUAL ENV
python -m virtualenv spp_extras_env


CMD
Activate vm
.\spp_extras_env\Scripts\activate

RUN SERVER
python spp_extras/manage.py runserver --settings=spp_extras.settings.dev


CREATE MODELS
python spp_extras/manage.py inspectdb --database=characters > spp_extras/spp_extras_api/characters.py

MIGRATE AFTER CHANGING MODELS
python spp_extras/manage.py migrate --database=characters --fake spp_extras_api

PACKAGE
pyinstaller --name=spp_extras_api spp_extras\manage.py --noconfirm

TEST PACKAGED SERVER
cd dist\spp_extras_api
spp_extras_api.exe runserver --settings=spp_extras.settings.prod --noreload