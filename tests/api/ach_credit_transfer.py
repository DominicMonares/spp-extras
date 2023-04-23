import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.quests import transfer_ach_credit
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)


class TestTransferAchCredit(TestCase):
    """PLACEHOLDER"""
    def test_transfer_ach_credit(self):
        self.assertDictEqual(True, True)
