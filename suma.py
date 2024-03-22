import unittest

def suma(a, b):
    return a + b

class TestSuma(unittest.TestCase):

    def test_suma(self):
        a = 3 + 5j
        b = 2 - 6j
        resultado_esperado = 5 - 1j
        self.assertEqual(suma(a, b), resultado_esperado)

if __name__ == '__main__':
    unittest.main()