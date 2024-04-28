#downloaded the umalqurra library from https://github.com/tytkal/python-hijiri-ummalqura

from umalqurra.hijri_date import HijriDate

class theDate:
    def __init__(self, num) -> None:
        self.monthNames = ["Muḥarram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"]
        self.num = num
        self.monthIndex = num//30
        self.dayNum = num%30
        if self.dayNum == 0:
            self.dayNum = 30
        self.currMonthMax = 30

    def __init__(self, month, day, year) -> None:
        self.monthNames = ["Muḥarram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"]
        self.currMonthMax = 30

        #year, month, day
        um = HijriDate(year,month,day,gr=True)
        self.monthIndex = um.month - 1
        self.dayNum = um.day


    def getDate(self) -> list:
        return [self.monthIndex + 1, self.dayNum]
    
    
    def strDate(self) -> str:
        aString = self.monthNames[self.monthIndex] + " " + str(self.dayNum)
        return aString

    def incrementDate(self) -> None:
        if self.dayNum >= self.currMonthMax:
            self.monthIndex += 1
            if self.monthIndex == 12:
                self.monthIndex = 0
            self.dayNum = 1
        else:
            self.dayNum += 1

    def incrementBy(self, num) -> None:
        for i in range(num):
            self.incrementDate()

    def decrementDate(self) -> None:
        if self.dayNum == 1:
            self.monthIndex = self.monthIndex - 1
            if self.monthIndex == -1:
                self.monthIndex = 11
            self.dayNum = self.currMonthMax
        else:
            self.dayNum -= 1

    def decrementBy(self, num) -> None:
        for i in range(num):
            self.decrementDate()

    def setCurrMonthMax(self, num) -> None:
        if num == 29:
            self.currMonthMax = 29
        elif num == 30:
            self.currMonthMax = 30
        else:
            print("Error out of bounds max. Set to 30")
            self.currMonthMax = 30

    def getCurrMonthMax(self) -> int:
        return self.currMonthMax
    
    def outputInfo(self) -> None:
        print("That is " + self.strDate())
        print("Current Max " + str(self.getCurrMonthMax()))





def main():
    inp = input("Enter current Hijri days: ")
    date = theDate(int(inp))
    inp = input("Set current month max: ")
    date.setCurrMonthMax(int(inp))
    date.outputInfo()

    inp = input("Enter a command: ")
    while inp != "exit":
        inpList = inp.split()

        if inpList[0] == "inc":
            numIncrement = int(inpList[1])
            for i in range(numIncrement):
                date.incrementDate()
            date.outputInfo()

        elif inpList[0] == "dec":
            numDecrement = int(inpList[1])
            for i in range(numDecrement):
                date.decrementDate()
            date.outputInfo()

        elif inpList[0] == "setMax":
            num = int(inpList[1])
            date.setCurrMonthMax(num)
            print("Current Max has been set to " + str(date.getCurrMonthMax()))

        else:
            pass
        inp = input("Enter a command: ")
    print("Exiting")



if __name__=="__main__":
    main()