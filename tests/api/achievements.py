import json
from from_root import from_root
from unittest import TestCase
from api.src.spp_extras_api.utils.achievements import (
    format_ach_credit,
    format_ach_prog,
    combine_acct_data,
    format_ach_rewards,
    format_rew_item_charges,
    check_faction_ach
)


class TestCombineAcctData(TestCase):
    """Should combine all character data into one main dict"""
    def test_combine_acct_data(self):
        with open(from_root('tests/samples/formattedData/achCredit.json'), 'r') as json_file:
            ach_credit = json.load(json_file)
        with open(from_root('tests/samples/formattedData/achProgress.json'), 'r') as json_file:
            ach_prog = json.load(json_file)
        with open(from_root('tests/samples/api/combinedAccounts.json'), 'r') as json_file:
            combined_accounts = json.load(json_file)
        with open(from_root('tests/samples/formattedData/completedQuests.json'), 'r') as json_file:
            completed_quests = json.load(json_file)
        with open(from_root('tests/samples/formattedData/playerSortedAccounts.json'), 'r') as json_file:
            accounts = json.load(json_file)
        acct_prog = ach_prog['account']
        char_prog = ach_prog['character']
        result = combine_acct_data(
            accounts, ach_credit, char_prog, acct_prog, completed_quests)
        self.assertDictEqual(result, combined_accounts)


class TestFormatAchCredit(TestCase):
    """Should return achievement credit organized by character"""
    def test_format_ach_credit(self):
        with open(from_root('tests/samples/formattedData/achCredit.json'), 'r') as json_file:
            ach_credit = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawAchCredit.json'), 'r') as json_file:
            raw_ach_credit = json.load(json_file)
        result = format_ach_credit(raw_ach_credit)
        self.assertDictEqual(result, ach_credit)


class TestFormatAchProg(TestCase):
    """Should return achievement progress organized by account"""
    def test_format_ach_prog_acct(self):
        with open(from_root('tests/samples/formattedData/achProgress.json'), 'r') as json_file:
            ach_prog = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawAchProgress.json'), 'r') as json_file:
            raw_ach_prog = json.load(json_file)
        raw_acct_prog = raw_ach_prog['account']
        acct_prog = ach_prog['account']
        result = format_ach_prog('shared', raw_acct_prog)
        self.assertDictEqual(result, acct_prog)

    """Should return achievement progress organized by character"""
    def test_format_ach_prog_char(self):
        with open(from_root('tests/samples/formattedData/achProgress.json'), 'r') as json_file:
            ach_prog = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawAchProgress.json'), 'r') as json_file:
            raw_ach_prog = json.load(json_file)
        raw_char_prog = raw_ach_prog['character']
        char_prog = ach_prog['character']
        result = format_ach_prog('char', raw_char_prog)
        self.assertDictEqual(result, char_prog)


class TestFormatAchRewards(TestCase):
    """Should return achievement rewards organized by achievement"""
    def test_format_ach_rew(self):
        with open(from_root('tests/samples/formattedData/achRewards.json'), 'r') as json_file:
            ach_rewards = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawAchRewards.json'), 'r') as json_file:
            raw_ach_rewards = json.load(json_file)
        result = format_ach_rewards(raw_ach_rewards)
        self.assertDictEqual(result, ach_rewards)


class TestFormatRewItemCharges(TestCase):
    """Should return item charges for each reward item"""
    def test_format_rew_item_charges(self):
        with open(from_root('tests/samples/formattedData/itemCharges.json'), 'r') as json_file:
            item_charges = json.load(json_file)
        with open(from_root('tests/samples/rawData/rawItemCharges.json'), 'r') as json_file:
            raw_item_charges = json.load(json_file)
        result = format_rew_item_charges(raw_item_charges)
        self.assertDictEqual(result, item_charges)


class TestCheckFactionAch(TestCase):
    """Should return true and ach_id if achievement is neutral"""
    def test_check_faction_ach_neutral(self):
        result = check_faction_ach("2136", 'horde')
        expected = [True, "2136"]
        self.assertEqual(result, expected)

    """Should return true and ach_id if achievement and char factions match"""
    def test_check_faction_ach_match(self):
        result = check_faction_ach("1173", 'horde')
        expected = [True, "1173"]
        self.assertEqual(result, expected)

    """Should return true and alt ach_id if achievement and char factions don't match and alt exists"""
    def test_check_faction_ach_match_alt(self):
        result = check_faction_ach("1173", 'alliance')
        expected = [True, "1172"]
        self.assertEqual(result, expected)

    """Should return false and ach_id if achievement and char factions don't match and alt doesn't exist"""
    def test_check_faction_ach_no_match(self):
        result = check_faction_ach("1405", 'alliance')
        expected = [False, "1405"]
        self.assertEqual(result, expected)
