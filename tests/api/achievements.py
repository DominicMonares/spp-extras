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
with open(from_root('tests/samples/achProgress.json'), 'r') as json_file:
    ach_prog = json.load(json_file)
with open(from_root('tests/samples/rawAchCredit.json'), 'r') as json_file:
    raw_ach_credit = json.load(json_file)
with open(from_root('tests/samples/rawAchProgress.json'), 'r') as json_file:
    raw_ach_prog = json.load(json_file)


class TestFormatAchCredit(TestCase):
    """Should return achievement credit organized by character"""
    def test_format_ach_credit(self):
        result = format_ach_credit(raw_ach_credit)
        self.assertDictEqual(result, ach_credit)


class TestFormatAchProg(TestCase):
    """Should return achievement progress organized by account"""
    def test_format_ach_prog(self):
        raw_acct_prog = raw_ach_prog['account']
        acct_prog = ach_prog['account']
        result = format_ach_prog('shared', raw_acct_prog)
        self.assertDictEqual(result, acct_prog)

    """Should return achievement progress organized by character"""
    def test_format_ach_prog(self):
        raw_char_prog = raw_ach_prog['character']
        char_prog = ach_prog['character']
        result = format_ach_prog('char', raw_char_prog)
        self.assertDictEqual(result, char_prog)


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
