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

pytest tests/api/test_suites.py


============ CSS Hierarchy ============
DISPLAY
display
flex-direction
justify-content
align-items
direction
overflow-x
overflow-y
list-style-type

POSITION
position
left
right
top
bottom
margin-left
margin-right
margin-top
margin-bottom
padding-left
padding-right
padding-top
padding-bottom
z-index

SIZE
width
min-width
max-width
height
min-height
max-height

BORDER
box-sizing
border
border-left
border-right
border-top
border-bottom
border-radius
border-top-left-radius
border-top-right-radius
border-bottom-left-radius
border-bottom-right-radius
scrollbar-gutter
scroll-snap-type
scroll-snap-align

BACKGROUND
background
background-color
background-img
background-size
background-repeat
background-clip
-webkit-background-clip
-webkit-text-fill-color
filter
opacity

TEXT
text-align
font-family
font-size
font-weight
color

ANIMATIONS
transform
transform-origin
transition
transition-duration
animation-name
animation-duration

CURSOR
cursor


============ Import Hierarchy ============
REACT
useEffect, useState
components

REDUX
useAppDispatch, useAppSelector
store functions.

API CALLS
api call functions

UTILS
util functions

IMAGES
image imports

DATA
JSON data imports

TYPES
type imports

CSS
CSS import

============ State/Store Hierarchy ============
dispatch
redux store
react state
other vars


TODO
Account-wide Achievements
- handle no accounts
- combine char accounts before running
Account-wide Reputation

TEST
mail reward items for multiple characters and multiple rewards at once
