from unittest import TestLoader, TestSuite, TextTestRunner
from .character_utils import TestCheckFaction, TestFormatCharacters
from .quest_utils import TestAllCompletedQuests, TestAllTemplateQuests


# Prevents init constructor warnings
TestLoader.__test__ = False
TestSuite.__test__ = False


def suites():
    # Character Utils
    check_faction_suite = TestLoader()\
        .loadTestsFromTestCase(TestCheckFaction)
    format_characters_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCharacters)
    # Quest Utils
    all_completed_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestAllCompletedQuests)
    all_template_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestAllTemplateQuests)
    # Top Level Suite
    top_suite = TestSuite([
        format_characters_suite,
        check_faction_suite,
        all_completed_quests_suite,
        all_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
