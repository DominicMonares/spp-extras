import json
from freezegun import freeze_time
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_prog import create_ach_prog_args


class TestAchProg(TestCase):
    """Should return progress arguments and char dict with updated credit"""
    @freeze_time("2023-04-24")
    def test_create_ach_prog_args(self):
        with open(from_root('tests/samples/api/achProgTransfer.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/api/allAccountData.json'), 'r') as json_file:
            all_accounts = json.load(json_file)
        with open(from_root('tests/samples/formattedData/templateQuests.json'), 'r') as json_file:
            template_quests = json.load(json_file)
        result = create_ach_prog_args(all_accounts, template_quests)
        self.assertDictEqual(result, expected)
