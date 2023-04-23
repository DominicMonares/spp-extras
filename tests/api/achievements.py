import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.achievements import (
    format_ach_credit,
    format_ach_prog,
    combine_char_data,
    format_ach_rewards,
    format_rew_item_charges,
    faction_spef_char_match
)
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)


class TestFormatAchCredit(TestCase):
    """PLACEHOLDER"""
    def test_format_ach_credit(self):
        self.assertDictEqual(True, True)


class TestFormatAchProg(TestCase):
    """PLACEHOLDER"""
    def test_format_ach_prog(self):
        self.assertDictEqual(True, True)


class TestCombineCharData(TestCase):
    """PLACEHOLDER"""
    def test_combine_char_data(self):
        self.assertDictEqual(True, True)


class TestFormatAchRewards(TestCase):
    """PLACEHOLDER"""
    def test_format_ach_rew(self):
        self.assertDictEqual(True, True)


class TestFormatRewItemCharges(TestCase):
    """PLACEHOLDER"""
    def test_format_rew_item_charges(self):
        self.assertDictEqual(True, True)


class TestFactionSpefCharMatch(TestCase):
    """PLACEHOLDER"""
    def test_faction_spef_char_match(self):
        self.assertDictEqual(True, True)
