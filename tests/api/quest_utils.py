import json
from from_root import from_root
from operator import itemgetter
from unittest import TestCase
from api.src.spp_extras_api.utils.quests import all_completed_quests, all_template_quests
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)
with open(from_root('tests/samples/rawCharacters.json'), 'r') as json_file:
    raw_characters = json.load(json_file)
with open(from_root('tests/samples/rawCompletedQuests.json'), 'r') as json_file:
    raw_completed_quests = json.load(json_file)
with open(from_root('tests/samples/rawTemplateQuests.json'), 'r') as json_file:
    raw_template_quests = json.load(json_file)
with open(from_root('tests/samples/templateQuests.json'), 'r') as json_file:
    template_quests = json.load(json_file)


regular, daily, weekly, monthly = itemgetter(
    'regular', 'daily', 'weekly', 'monthly'
)(raw_completed_quests)


class TestAllCompletedQuests(TestCase):
    """Should return dict with completed quests sorted by faction and character"""

    def test_all_completed(self):
        result = all_completed_quests(raw_characters, regular, daily, weekly, monthly)
        self.assertDictEqual(result, completed_quests)


class TestAllTemplateQuests(TestCase):
    """Should return dict with template quests sorted by faction"""

    def test_all_template(self):
        result = all_template_quests(raw_template_quests)
        self.assertDictEqual(result, template_quests)
