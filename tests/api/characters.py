import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.characters import (
    check_faction,
    format_accts_n_chars,
    format_player_accts,
    format_reputations
)
with open(from_root('tests/samples/characterReputations.json'), 'r') as json_file:
    char_reps = json.load(json_file)
with open(from_root('tests/samples/characters.json'), 'r') as json_file:
    characters = json.load(json_file)
with open(from_root('tests/samples/playerSortedChars.json'), 'r') as json_file:
    player_sorted_chars = json.load(json_file)
with open(from_root('tests/samples/rawCharacterReps.json'), 'r') as json_file:
    raw_char_reps = json.load(json_file)
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
    def test_format_accts_n_chars(self):
        accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'},
            {'id': 502, 'username': 'RNDBOT2'}
        ]

        result = format_accts_n_chars(accounts, raw_characters)
        self.assertDictEqual(result, characters)

    """Should return empty characters dict if no characters provided"""
    def test_no_characters(self):
        result = format_accts_n_chars([], [])
        self.assertDictEqual(result, {})


class TestFormatPlayers(TestCase):
    """Should return all accounts with player accounts combined into one account"""
    def test_format_player_accts(self):
        result = format_player_accts(characters)
        self.assertDictEqual(result, player_sorted_chars)


class TestFormatReputations(TestCase):
    """Should return reputations dict sorted by character"""
    def test_format_reputations(self):
        result = format_reputations(raw_char_reps)
        self.assertDictEqual(result, char_reps)
