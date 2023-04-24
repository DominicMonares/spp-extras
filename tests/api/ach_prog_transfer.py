import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_prog_transfer import transfer_ach_prog
with open(from_root('tests/samples/completedQuests.json'), 'r') as json_file:
    completed_quests = json.load(json_file)


class TestTransferAchProg(TestCase):
    """PLACEHOLDER"""
    def test_transfer_ach_prog(self):
        self.assertDictEqual({}, {})
