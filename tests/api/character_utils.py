import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.characters import (
    check_faction,
    format_characters,
    format_reputations
)
with open(from_root('tests/samples/characters.json'), 'r') as json_file:
    characters = json.load(json_file)
with open(from_root('tests/samples/rawCharacters.json'), 'r') as json_file:
    raw_characters = json.load(json_file)


class TestCheckFaction(TestCase):
    """Should return 'alliance' if Alliance ID provided"""
    def test_alliance(self):
        self.assertEqual(check_faction(11), 'alliance')

    """Should return 'horde' if Horde ID provided"""
    def test_horde(self):
        self.assertEqual(check_faction(5), 'horde')


class TestFormatCharacters(TestCase):
    """Should return characters dict sorted by faction"""
    def test_format_characters(self):
        accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'}
        ]

        result = format_characters(accounts, raw_characters)
        self.assertDictEqual(result, characters)

    """Should return empty characters dict if no characters provided"""
    def test_no_characters(self):
        result = format_characters([], [])
        self.assertDictEqual(result, {})



