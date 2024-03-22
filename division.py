import unittest

def division(a, b):
    return a / b

class TestDivision(unittest.TestCase):

    def test_division(self):
        a = 3 + 5j
        b = 2 - 6j
        resultado_esperado = (-3/5 + 7/10j)
        self.assertAlmostEqual(division(a, b), resultado_esperado)

if __name__ == '__main__':
    unittest.main()