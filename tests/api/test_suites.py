from unittest import TestLoader, TestSuite, TextTestRunner
from .ach_credit_transfer import TestTransferAchCredit
from .ach_prog_transfer import TestTransferAchProg
from .achievements import (
    TestFormatAchCredit,
    TestFormatAchProg,
    TestCombineCharData,
    TestFormatAchRewards,
    TestFormatRewItemCharges,
    TestCheckFactionAch
)
from .characters import (
    TestCheckFaction,
    TestFormatCharacters,
    TestFormatPlayers,
    TestFormatReputations
)
from .loremaster import (
    TestLoremaster,
    TestMiscLmCriteria,
    TestLoremasterEarned
)
from .quests import TestFormatCompletedQuests, TestFormatTemplateQuests


# Prevents init constructor warnings
TestLoader.__test__ = False
TestSuite.__test__ = False


def suites():
    # Achievement Credit Transfer Utils
    transfer_ach_credit_suite = TestLoader()\
        .loadTestsFromTestCase(TestTransferAchCredit)
    # Achievement Progress Transfer Utils
    transfer_ach_prog_suite = TestLoader()\
        .loadTestsFromTestCase(TestTransferAchProg)
    # Achievement Utils
    format_ach_credit_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatAchCredit)
    format_ach_prog_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatAchProg)
    combine_char_data_suite = TestLoader()\
        .loadTestsFromTestCase(TestCombineCharData)
    format_ach_rew_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatAchRewards)
    format_rew_item_charges_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatRewItemCharges)
    check_faction_ach_suite = TestLoader()\
        .loadTestsFromTestCase(TestCheckFactionAch)
    # Character Utils
    check_faction_suite = TestLoader()\
        .loadTestsFromTestCase(TestCheckFaction)
    format_characters_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCharacters)
    format_players_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatPlayers)
    format_char_reps_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatReputations)
    # Loremaster Utils
    loremaster_suite = TestLoader()\
        .loadTestsFromTestCase(TestLoremaster)
    misc_lm_criteria_suite = TestLoader()\
        .loadTestsFromTestCase(TestMiscLmCriteria)
    loremaster_earned_suite = TestLoader()\
        .loadTestsFromTestCase(TestLoremasterEarned)
    # Quest Utils
    format_completed_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCompletedQuests)
    format_template_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatTemplateQuests)
    # Top Level Suite
    top_suite = TestSuite([
        transfer_ach_credit_suite,
        transfer_ach_prog_suite,
        format_ach_credit_suite,
        format_ach_prog_suite,
        combine_char_data_suite,
        format_ach_rew_suite,
        format_rew_item_charges_suite,
        check_faction_ach_suite,
        check_faction_suite,
        format_characters_suite,
        format_players_suite,
        format_char_reps_suite,
        loremaster_suite,
        misc_lm_criteria_suite,
        loremaster_earned_suite,
        format_completed_quests_suite,
        format_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
