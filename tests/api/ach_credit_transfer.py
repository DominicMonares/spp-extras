import json
from freezegun import freeze_time
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_credit_transfer import transfer_ach_credit


class TestTransferAchCredit(TestCase):
    """Should return all credit and reward arguments"""
    @freeze_time("2023-04-24")
    def test_transfer_ach_credit(self):
        with open(from_root('tests/samples/api/achCreditTransfer.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/api/achProgTransfer.json'), 'r') as json_file:
            ach_prog_transfer = json.load(json_file)
        with open(from_root('tests/samples/formattedData/achRewards.json'), 'r') as json_file:
            ach_rewards = json.load(json_file)
        with open(from_root('tests/samples/formattedData/itemCharges.json'), 'r') as json_file:
            item_charges = json.load(json_file)
        accounts = ach_prog_transfer['new_accounts']
        result = transfer_ach_credit(accounts, ach_rewards, item_charges, 1000, 1000)
        self.assertDictEqual(result, expected)
