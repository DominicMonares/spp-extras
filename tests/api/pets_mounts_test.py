import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.pets_mounts import (
    format_pet_mount_item_data,
    format_char_spell_data,
    format_char_skill_data,
    transfer_pet_mount_spells
)


class TestFormatPetMountItems(TestCase):
    """Should return pet and mount item dict sorted by spell ID"""
    def test_format_pet_mount_item_data(self):
        with open(from_root('tests/samples/formattedData/petMountItems.json'), 'r') as json_file:
            pet_mount_items = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawPetMountItems.json'), 'r') as json_file:
            raw_pet_mount_items = json.load(json_file)
        result = format_pet_mount_item_data(raw_pet_mount_items)
        self.assertDictEqual(result, pet_mount_items)


class TestFormatCharSpells(TestCase):
    """Should return known pet and mount spell dict sorted by character"""
    def test_format_char_spell_data(self):
        with open(from_root('tests/samples/formattedData/characterSpells.json'), 'r') as json_file:
            char_spells = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawCharacterSpells.json'), 'r') as json_file:
            raw_char_spells = json.load(json_file)
        result = format_char_spell_data(raw_char_spells)
        self.assertEqual(result, char_spells)


class TestFormatCharSkills(TestCase):
    """Should return riding skill dict sorted by character"""
    def test_format_char_skill_data(self):
        self.assertDictEqual({}, {})


class TestTransferPetMountSpells(TestCase):
    """Should return array of pet and mount spell query arguments"""
    def transfer_pet_mount_spells(self):
        self.assertEqual([], [])
