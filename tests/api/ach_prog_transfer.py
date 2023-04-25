import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.ach_prog_transfer import transfer_ach_prog
with open(from_root('tests/samples/achProgTransfer.json'), 'r') as json_file:
    expected = json.load(json_file)
with open(from_root('tests/samples/combinedChars.json'), 'r') as json_file:
    all_chars = json.load(json_file)
with open(from_root('tests/samples/templateQuests.json'), 'r') as json_file:
    template_quests = json.load(json_file)


class TestTransferAchProg(TestCase):
    """Should return progress arguments and char dict with updated credit"""
    def test_transfer_ach_prog(self):
        result = transfer_ach_prog(all_chars, template_quests)
        print(f'HELLOOOO {result}')
        self.assertDictEqual(result, expected)
