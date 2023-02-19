from unittest import TestLoader, TestSuite, TextTestRunner
from .character_utils import TestCheckFaction


# Prevents init constructor warnings
TestLoader.__test__ = False
TestSuite.__test__ = False

def suites():
    check_faction_suite = TestLoader().loadTestsFromTestCase(TestCheckFaction)
    top_suite = TestSuite([check_faction_suite])
    return top_suite

if __name__ == '__main__':
    runner = TextTestRunner().run(suites())
