import unittest

def multiplicacion(a, b):
    return a * b


class TestMultiplicacion(unittest.TestCase):

    def test_multiplicacion(self):
        a = 3 + 5j
        b = 2 - 6j
        resultado_esperado = 36 - 8j
        self.assertEqual(multiplicacion(a, b), resultado_esperado)
        print (multiplicacion)

if __name__ == '__main__':
    unittest.main()