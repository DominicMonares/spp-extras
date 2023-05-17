import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.characters import (
    check_faction,
    create_char_ids,
    format_accts_n_chars
)


class TestCheckFaction(TestCase):
    """Should return 'alliance' if Alliance ID provided"""
    def test_alliance(self):
        self.assertEqual(check_faction(11), 'alliance')

    """Should return 'horde' if Horde ID provided"""
    def test_horde(self):
        self.assertEqual(check_faction(5), 'horde')


class TestCreateCharIds(TestCase):
    """Should return list of char ID numbers"""
    def test_create_char_ids(self):
        with open(from_root('tests/samples/formattedData/allAccountsChars.json'), 'r') as json_file:
            accounts = json.load(json_file)
        expected = [5263, 1001, 4501, 79411, 6000, 6001]
        self.assertEqual(create_char_ids(accounts), expected)


class TestFormatCharacters(TestCase):
    """Should return all accounts with player accounts combined into one account with random bots included"""
    def test_format_accts_n_chars(self):
        with open(from_root('tests/samples/formattedData/allAccountsChars.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawAllCharacters.json'), 'r') as json_file:
            raw_characters = json.load(json_file)
        raw_accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'},
            {'id': 502, 'username': 'RNDBOT2'}
        ]

        result = format_accts_n_chars(raw_accounts, raw_characters)
        self.assertDictEqual(result, expected)

    """Should return all accounts with player accounts combined into one account without random bots included"""
    def test_format_player_accts_no_bots(self):
        with open(from_root('tests/samples/formattedData/playerAccountsChars.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawPlayerCharacters.json'), 'r') as json_file:
            raw_characters = json.load(json_file)
        raw_accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'}
        ]
            
        result = format_accts_n_chars(raw_accounts, raw_characters)
        self.assertDictEqual(result, expected)

    """Should return empty characters dict if no characters provided"""
    def test_no_characters(self):
        result = format_accts_n_chars([], [])
        self.assertDictEqual(result, {})
