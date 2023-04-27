import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.characters import (
    check_faction,
    format_accts_n_chars,
    format_player_accts
)
from api.src.spp_extras_api.utils.reputations import (
    format_reputations
)


class TestCheckFaction(TestCase):
    """Should return 'alliance' if Alliance ID provided"""
    def test_alliance(self):
        self.assertEqual(check_faction(11), 'alliance')

    """Should return 'horde' if Horde ID provided"""
    def test_horde(self):
        self.assertEqual(check_faction(5), 'horde')


class TestFormatCharacters(TestCase):
    """Should return accounts and characters dict"""
    def test_format_accts_n_chars(self):
        with open(from_root('tests/samples/formattedData/accounts.json'), 'r') as json_file:
            accounts = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawCharacters.json'), 'r') as json_file:
            raw_characters = json.load(json_file)
        raw_accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'},
            {'id': 502, 'username': 'RNDBOT2'}
        ]

        result = format_accts_n_chars(raw_accounts, raw_characters)
        self.assertDictEqual(result, accounts)

    """Should return empty characters dict if no characters provided"""
    def test_no_characters(self):
        result = format_accts_n_chars([], [])
        self.assertDictEqual(result, {})


class TestFormatPlayers(TestCase):
    """Should return all accounts with player accounts combined into one account along with random bots"""
    def test_format_player_accts(self):
        with open(from_root('tests/samples/formattedData/accounts.json'), 'r') as json_file:
            accounts = json.load(json_file)
        with open(from_root('tests/samples/formattedData/playerSortedAccounts.json'), 'r') as json_file:
            player_sorted_accts = json.load(json_file)
        result = format_player_accts(accounts, True)
        self.assertDictEqual(result, player_sorted_accts)

    """Should return all accounts with player accounts combined into one account with random bots unincluded"""
    def test_format_player_accts_no_bots(self):
        with open(from_root('tests/samples/formattedData/accounts.json'), 'r') as json_file:
            accounts = json.load(json_file)
        with open(from_root('tests/samples/formattedData/playerSortedAccounts.json'), 'r') as json_file:
            player_sorted_accts = json.load(json_file)
        result = format_player_accts(accounts, False)
        expected = {'0': player_sorted_accts['0']}
        self.assertDictEqual(result, expected)


class TestFormatReputations(TestCase):
    """Should return reputations dict sorted by character"""
    def test_format_reputations(self):
        with open(from_root('tests/samples/formattedData/characterReputations.json'), 'r') as json_file:
            char_reps = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawCharacterReps.json'), 'r') as json_file:
            raw_char_reps = json.load(json_file)
        result = format_reputations(raw_char_reps)
        self.assertDictEqual(result, char_reps)
