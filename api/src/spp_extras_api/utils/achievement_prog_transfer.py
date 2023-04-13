import json
from from_root import from_root
with open(from_root('data/zoneContinents.json'), 'r') as json_file:
    zone_continents = json.load(json_file)
with open(from_root('data/progAchievements.json'), 'r') as json_file:
    prog_achievements = json.load(json_file)


def create_prog_args():
    return