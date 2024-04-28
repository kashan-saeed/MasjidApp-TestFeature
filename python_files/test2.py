import unittest
from myCode import theDate

class Testing(unittest.TestCase):

    def test_incDec(self):
        """
        Testing Something
        """
        date = theDate(6, 27, 2014)
        date.setCurrMonthMax(29)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 1")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 2")

        date.incrementBy(10)
        self.assertEqual(date.strDate(), "Ramadan 12")

        date.decrementBy(10)
        self.assertEqual(date.strDate(), "Ramadan 2")

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 1")

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 28")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 28")

        date.setCurrMonthMax(30)
        self.assertEqual(date.getCurrMonthMax(), 30)

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 30")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 1")

    def test_incDec2(self):
        """
        Testing Something
        """
        date = theDate(6, 27, 2014)
        date.setCurrMonthMax(29)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 1")

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.setCurrMonthMax(30)
        self.assertEqual(date.getCurrMonthMax(), 30)

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 30")

    def test_incDec3(self):
        """
        Testing Something
        """
        date = theDate(6, 27, 2014)
        date.setCurrMonthMax(29)
        self.assertEqual(date.strDate(), "Shaban 29")

        date.incrementBy(1)
        self.assertEqual(date.strDate(), "Ramadan 1")

        date.setCurrMonthMax(30)
        self.assertEqual(date.getCurrMonthMax(), 30)

        date.decrementBy(1)
        self.assertEqual(date.strDate(), "Shaban 30")


if __name__ == '__main__':
    unittest.main()