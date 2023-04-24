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
with open(from_root('tests/samples/achCredit.json'), 'r') as json_file:
    ach_credit = json.load(json_file)
with open(from_root('tests/samples/rawAchCredit.json'), 'r') as json_file:
    raw_ach_credit = json.load(json_file)


class TestFormatAchCredit(TestCase):
    """Should return achievement credit formatted by character"""
    def test_format_ach_credit(self):
        result = format_ach_credit(raw_ach_credit)
        self.assertDictEqual(result, ach_credit)


class TestFormatAchProg(TestCase):
    """PLACEHOLDER"""
    def test_format_ach_prog(self):
        self.assertDictEqual({}, {})


class TestCombineCharData(TestCase):
    """PLACEHOLDER"""
    def test_combine_char_data(self):
        self.assertDictEqual({}, {})


class TestFormatAchRewards(TestCase):
    """PLACEHOLDER"""
    def test_format_ach_rew(self):
        self.assertDictEqual({}, {})


class TestFormatRewItemCharges(TestCase):
    """PLACEHOLDER"""
    def test_format_rew_item_charges(self):
        self.assertDictEqual({}, {})


class TestFactionSpefCharMatch(TestCase):
    """PLACEHOLDER"""
    def test_faction_spef_char_match(self):
        self.assertDictEqual({}, {})
