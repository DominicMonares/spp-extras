import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.loremaster import (
    loremaster,
    misc_lm_criteria,
    loremaster_earned
)
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)


class TestLoremaster(TestCase):
    """PLACEHOLDER"""
    def test_loremaster(self):
        self.assertDictEqual({}, {})


class TestMiscLmCriteria(TestCase):
    """PLACEHOLDER"""
    def test_misc_lm_criteria(self):
        self.assertDictEqual({}, {})


class TestLoremasterEarned(TestCase):
    """PLACEHOLDER"""
    def test_loremaster_earned(self):
        self.assertDictEqual({}, {})
