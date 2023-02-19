from unittest import TestCase, TestLoader, TestSuite, TextTestRunner
from api.src.spp_extras_api.utils.characters import check_faction


class TestCheckFaction(TestCase):
    def test_alliance(self) -> None:
        self.assertEqual(check_faction(11), 'alliance')
    
    def test_horde(self) -> None:
        self.assertEqual(check_faction(5), 'horde')
