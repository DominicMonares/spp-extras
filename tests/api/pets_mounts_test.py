import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.pets_mounts import (
    format_pet_mount_item_data,
    format_char_spell_data,
    format_char_skill_data,
    create_pet_mount_spell_args
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
        self.assertDictEqual(result, char_spells)


class TestFormatCharSkills(TestCase):
    """Should return riding skill dict sorted by character"""
    def test_format_char_skill_data(self):
        with open(from_root('tests/samples/formattedData/characterSkills.json'), 'r') as json_file:
            char_skills = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawCharacterSkills.json'), 'r') as json_file:
            raw_char_skills = json.load(json_file)
        result = format_char_skill_data(raw_char_skills)
        self.assertDictEqual(result, char_skills)


class TestTransferPetMountSpells(TestCase):
    """Should return array of pet and mount spell query arguments"""
    def test_create_pet_mount_spell_args(self):
        with open(from_root('tests/samples/api/transferredPetsMounts.json'), 'r') as json_file:
            expected = json.load(json_file)
        with open(from_root('tests/samples/formattedData/characterSkills.json'), 'r') as json_file:
            char_skills = json.load(json_file)
        with open(from_root('tests/samples/formattedData/characterSpells.json'), 'r') as json_file:
            char_spells = json.load(json_file)
        with open(from_root('tests/samples/formattedData/mergedCharacters.json'), 'r') as json_file:
            merged_chars = json.load(json_file)
        with open(from_root('tests/samples/formattedData/petMountItems.json'), 'r') as json_file:
            pet_mount_items = json.load(json_file)
        result = create_pet_mount_spell_args(pet_mount_items, merged_chars, char_spells, char_skills)
        print(f'RESULT {result}')
        self.assertEqual(result, expected)
