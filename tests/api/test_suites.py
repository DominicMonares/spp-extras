from unittest import TestLoader, TestSuite, TextTestRunner
from .character_utils import TestAllCharacters, TestGetAccountIds, TestCheckFaction
from .quest_utils import TestAllCompletedQuests, TestAllTemplateQuests


# Prevents init constructor warnings
TestLoader.__test__ = False
TestSuite.__test__ = False


def suites():
    # Character Utils
    all_characters_suite = TestLoader().loadTestsFromTestCase(TestAllCharacters)
    check_faction_suite = TestLoader().loadTestsFromTestCase(TestCheckFaction)
    get_account_id_suite = TestLoader().loadTestsFromTestCase(TestGetAccountIds)
    # Quest Utils
    all_completed_quests_suite = TestLoader().loadTestsFromTestCase(TestAllCompletedQuests)
    all_template_quests_suite = TestLoader().loadTestsFromTestCase(TestAllTemplateQuests)
    # Top Level Suite
    top_suite = TestSuite([
        all_characters_suite,
        check_faction_suite,
        get_account_id_suite,
        all_completed_quests_suite,
        all_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
