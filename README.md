# spp-extras
Desktop application for WoW Single Player Project extras.

python 3.9.13
virtualenv-20.16.6

MUST USE CMD

Install npm/yarn
yarn install

Create python package lock
pip freeze > requirements.txt

=========================================================

VIRTUALENV INSTALL
python -m pip install --user virtualenv

DJANGO SETUP
cd api

CREATE VIRTUAL ENV
python -m virtualenv spp_extras_env

Activate vm
.\spp_extras_env\Scripts\activate

INSTALL PYTHON DEPENDENCIES
pip install -r requirements.txt

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