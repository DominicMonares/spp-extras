import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.characters import all_characters, check_faction, get_account_id
with open(from_root('tests/samples/characters.json'), 'r') as json_file:
    sample_characters = json.load(json_file)


class TestAllCharacters(TestCase):
    """Should return 'alliance' if Alliance ID provided"""
    def test_all_characters(self):
        accounts = [
            {'id': 500, 'username': 'ACCOUNT1'},
            {'id': 501, 'username': 'ACCOUNT2'}
        ]

        characters = [
            {'guid': 4501, 'account': 500, 'name': 'Drak', 'race': 2, 'class_field': 3},
            {'guid': 4502, 'account': 500, 'name': 'Gaz', 'race': 8, 'class_field': 7},
            {'guid': 4503, 'account': 501, 'name': 'Bub', 'race': 1, 'class_field': 1}
        ]

        result = all_characters(accounts, characters)
        print(sample_characters)
        print(result)
        self.assertDictEqual(result, sample_characters)
        


class TestCheckFaction(TestCase):
    """Should return 'alliance' if Alliance ID provided"""
    def test_alliance(self):
        self.assertEqual(check_faction(11), 'alliance')

    """Should return 'horde' if Horde ID provided"""
    def test_horde(self):
        self.assertEqual(check_faction(5), 'horde')


class TestGetAccountIds(TestCase):
    """Should return account id if account provided"""
    def test_account_id(self):
        account = {'id': 4501, 'username': 'ACCOUNT1'}
        self.assertEqual(get_account_id(account), 4501)
