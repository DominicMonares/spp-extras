import json
from from_root import from_root
from operator import itemgetter
from unittest import TestCase
from api.src.spp_extras_api.utils.quests import\
    format_completed_quests,\
    format_template_quests


class TestFormatCompletedQuests(TestCase):
    """Should return dict with completed quests sorted by faction and character"""
    def test_format_completed(self):
        with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
            completed_quests = json.load(json_file)
        with open(from_root('tests/samples/rawCompletedQuests.json'), 'r') as json_file:
            raw_completed_quests = json.load(json_file)
        regular, daily, weekly, monthly = itemgetter(
            'regular', 'daily', 'weekly', 'monthly')(raw_completed_quests)
        result = format_completed_quests(regular, daily, weekly, monthly)
        self.assertDictEqual(result, completed_quests)


class TestFormatTemplateQuests(TestCase):
    """Should return dict with template quests sorted by faction"""
    def test_format_template(self):
        with open(from_root('tests/samples/rawTemplateQuests.json'), 'r') as json_file:
            raw_template_quests = json.load(json_file)
        with open(from_root('tests/samples/templateQuests.json'), 'r') as json_file:
            template_quests = json.load(json_file)
        result = format_template_quests(raw_template_quests)
        self.assertDictEqual(result, template_quests)

    """Should not sort Alliance specific zero quest into Horde quests"""
    def test_format_template_zeros(self):
        with open(from_root('tests/samples/rawTemplateQuests.json'), 'r') as json_file:
            raw_template_quests = json.load(json_file)
        quests = format_template_quests(raw_template_quests)
        result = "55" not in quests
        self.assertEqual(result, True)
