from unittest import TestCase
from api.src.spp_extras_api.utils.characters import all_characters, check_faction, get_account_id


class TestAllCharacters(TestCase):
    """Should return 'alliance' if Alliance ID provided"""

    def test_all_characters(self):
        accounts = [
            {'id': 4501, 'username': 'ACCOUNT1'},
            {'id': 4505, 'username': 'ACCOUNT1'}
        ]


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
