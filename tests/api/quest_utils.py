import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.quests import all_completed_quests, all_template_quests
with open(from_root('tests/samples/characterQuests.json'), 'r') as json_file:
    sample_character_quests = json.load(json_file)
with open(from_root('tests/samples/templateQuests.json'), 'r') as json_file:
    sample_template_quests = json.load(json_file)


class TestAllCompletedQuests
