from unittest import TestLoader, TestSuite, TextTestRunner
from .ach_credit_transfer_test import TestTransferAchCredit
from .ach_prog_transfer_test import TestTransferAchProg
from .achievements_test import (
    TestFormatAchCredit,
    TestFormatAchProg,
    TestCombineAcctData,
    TestFormatAchRewards,
    TestFormatRewItemCharges,
    TestCheckFactionAch
)
from .characters_test import (
    TestCheckFaction,
    TestFormatCharacters,
    TestFormatPlayers,
)
from .reputations_test import (
    TestFormatReputations,
    TestTransferReputations
)
from .quests_test import TestFormatCompletedQuests, TestFormatTemplateQuests


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
    format_all_acct_data_suite = TestLoader()\
        .loadTestsFromTestCase(TestCombineAcctData)
    format_ach_credit_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatAchCredit)
    format_ach_prog_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatAchProg)
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
    
    # Reputation Utils
    format_char_reps_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatReputations)
    transfer_reputations_suite = TestLoader()\
        .loadTestsFromTestCase(TestTransferReputations)
    
    # Quest Utils
    format_completed_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCompletedQuests)
    format_template_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatTemplateQuests)
    
    # Top Level Suite
    top_suite = TestSuite([
        transfer_ach_credit_suite,
        transfer_ach_prog_suite,
        format_all_acct_data_suite,
        format_ach_credit_suite,
        format_ach_prog_suite,
        format_ach_rew_suite,
        format_rew_item_charges_suite,
        check_faction_ach_suite,
        check_faction_suite,
        format_characters_suite,
        format_players_suite,
        format_char_reps_suite,
        transfer_reputations_suite,
        format_completed_quests_suite,
        format_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
