import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.reputations import (
    format_reputations,
    transfer_reputations
)


class TestFormatReputations(TestCase):
    """Should return reputations dict sorted by character"""
    def test_format_reputations(self):
        with open(from_root('tests/samples/formattedData/characterReputations.json'), 'r') as json_file:
            char_reps = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawCharacterReps.json'), 'r') as json_file:
            raw_char_reps = json.load(json_file)
        result = format_reputations(raw_char_reps)
        self.assertDictEqual(result, char_reps)


class TestTransferReputations(TestCase):
    """Should return array of new rep progress arguments"""
    def test_transfer_reputations(self):
        with open(from_root('tests/samples/formattedData/characterReputations.json'), 'r') as json_file:
            char_reps = json.load(json_file)
        with open(from_root('tests/samples/api/repCharacters.json'), 'r') as json_file:
            characters = json.load(json_file)
        with open(from_root('tests/samples/api/transferredReps.json'), 'r') as json_file:
            expected = json.load(json_file)

        result = transfer_reputations(characters, char_reps)
        self.assertEqual(result, expected)
