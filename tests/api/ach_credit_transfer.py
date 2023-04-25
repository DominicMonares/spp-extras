import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_credit_transfer import transfer_ach_credit
with open(from_root('tests/samples/achCreditTransfer.json'), 'r') as json_file:
    expected = json.load(json_file)
with open(from_root('tests/samples/achProgTransfer.json'), 'r') as json_file:
    ach_prog_transfer = json.load(json_file)
with open(from_root('tests/samples/achRewards.json'), 'r') as json_file:
    ach_rewards = json.load(json_file)
with open(from_root('tests/samples/itemCharges.json'), 'r') as json_file:
    item_charges = json.load(json_file)


class TestTransferAchCredit(TestCase):
    """Should return all credit and reward arguments"""
    def test_transfer_ach_credit(self):
        chars = ach_prog_transfer['new_chars']
        result = transfer_ach_credit(chars, ach_rewards, item_charges, 1000, 1000)
        print(f'OIIIIIII {result}')
        self.assertDictEqual(result, expected)
