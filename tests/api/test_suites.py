from unittest import TestLoader, TestSuite, TextTestRunner
from .characters import (
    TestCheckFaction, 
    TestFormatCharacters,
    TestFormatReputations
)
from .quests import TestFormatCompletedQuests, TestFormatTemplateQuests


# Prevents init constructor warnings
TestLoader.__test__ = False
TestSuite.__test__ = False


def suites():
    # Character Utils
    check_faction_suite = TestLoader()\
        .loadTestsFromTestCase(TestCheckFaction)
    format_characters_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCharacters)
    format_char_reps_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatReputations)
    # Quest Utils
    format_completed_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatCompletedQuests)
    format_template_quests_suite = TestLoader()\
        .loadTestsFromTestCase(TestFormatTemplateQuests)
    # Top Level Suite
    top_suite = TestSuite([
        check_faction_suite,
        format_characters_suite,
        format_char_reps_suite,
        format_completed_quests_suite,
        format_template_quests_suite
    ])

    return top_suite


if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
