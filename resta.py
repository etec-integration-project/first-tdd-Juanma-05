import unittest

def resta(a, b):
    return a - b

class TestResta(unittest.TestCase):

    def test_resta(self):
        a = 3 + 5j
        b = 2 - 6j
        resultado_esperado = 1 + 11j
        self.assertEqual(resta(a, b), resultado_esperado)

if __name__ == '__main__':
    unittest.main()