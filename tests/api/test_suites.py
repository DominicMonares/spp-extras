from unittest import TestLoader, TestSuite, TextTestRunner
from .ach_credit_test import TestAchCredit
from .ach_prog_test import TestAchProg
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
from .pets_mounts_test import (
    TestFormatPetMountItems,
    TestFormatCharSpells,
    TestFormatCharSkills,
    TestTransferPetMountSpells
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
    ach_credit_suite = TestLoader()\
        .loadTestsFromTestCase(TestAchCredit)
    
    # Achievement Progress Transfer Utils
    ach_prog_suite = TestLoader()\
        .loadTestsFromTestCase(TestAchProg)
    
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
    
    # Pet and Mount Utils
    format_pet_mount_items_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatPetMountItems)
    format_char_spells_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCharSpells)
    format_char_skills_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCharSkills)
    transfer_pet_mount_spells_suite = TestLoader()\
        .loadTestsFromTestCase(TestTransferPetMountSpells)

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
        ach_credit_suite,
        ach_prog_suite,
        format_all_acct_data_suite,
        format_ach_credit_suite,
        format_ach_prog_suite,
        format_ach_rew_suite,
        format_rew_item_charges_suite,
        check_faction_ach_suite,
        check_faction_suite,
        format_characters_suite,
        format_players_suite,
        format_pet_mount_items_suite,
        format_char_spells_suite,
        format_char_skills_suite,
        transfer_pet_mount_spells_suite,
        format_char_reps_suite,
        transfer_reputations_suite,
        format_completed_quests_suite,
        format_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
