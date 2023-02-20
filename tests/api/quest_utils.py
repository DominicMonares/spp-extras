import json
from operator import itemgetter
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.quests import all_completed_quests, all_template_quests
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)
with open(from_root('tests/samples/rawCompletedQuests.json'), 'r') as json_file:
    raw_completed_quests = json.load(json_file)
with open(from_root('tests/samples/templateQuests.json'), 'r') as json_file:
    template_quests = json.load(json_file)


regular, daily, weekly, monthly = itemgetter(
    'regular', 'daily', 'weekly', 'monthly'
)(raw_completed_quests)


class TestAllCompletedQuests(TestCase):
    def test_all_completed(self):
        characters = {
            '5263': 'alliance',
            '1001': 'horde',
            '4501': 'horde',
            '79411': 'horde'
        }

        result = all_completed_quests(characters, regular, daily, weekly, monthly)
        self.assertDictEqual(result, completed_quests)

