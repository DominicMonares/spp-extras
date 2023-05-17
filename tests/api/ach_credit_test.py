import json
from freezegun import freeze_time
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_credit import create_ach_credit_args


class TestAchCredit(TestCase):
    """Should return all credit and reward arguments"""
    @freeze_time("2023-04-24")
    def test_ach_credit_args(self):
        with open(from_root('tests/samples/api/achCreditTransfer.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/api/achProgTransfer.json'), 'r') as json_file:
            ach_prog_transfer = json.load(json_file)
        with open(from_root('tests/samples/formattedData/achRewards.json'), 'r') as json_file:
            ach_rewards = json.load(json_file)
        with open(from_root('tests/samples/formattedData/itemCharges.json'), 'r') as json_file:
            item_charges = json.load(json_file)
        accounts = ach_prog_transfer['new_accounts']
        result = create_ach_credit_args(accounts, ach_rewards, item_charges, 1000, 1000)
        self.assertDictEqual(result, expected)
