//dateAdjV1.js
  //V1 is before trying to keep track of maxDays of months outside of current month
import {UQCal} from "../v2/UQCal.js";

//the dateAjd class is the system that controls the users interaction with the cal. It sits on top of the system

//Using the UQCal lib for Hijri date calculations. Commenting out hijri-date library lines
    //Modified UQCal to initialize using Date object
    //Month is 0 indexed


/*
What ever date you give to the convert function it gives you the hijri day for that gregorian day in Saudi.

When you declare new Date() it will declare the date according to where you live.
So in Cali 2/29/2024 11:15 PM

and so when you throw that into the Hijri converter it will calculate it as:
 - Give hijri calc for the morning of 2/29/2024 in Saudi
   - Pay attention
   - it doesn't look at the time only the date. 
   - It will give you the hijri date for the morning of that day in Saudi

Things to uderstand:
 - Saudi is 11 hours ahead of Cali
   - 11:25 PM Thursday in Cali is 10:25 AM Friday in Saudi

Things to confirm:
 - So Cali won't start a month until Saudi has started it?
 - Does every country in the world only start the new month after Saudi?
   - Which ones do and don't?

Too much confusion due to conversion:
 - First we have to add hours to get Hijri date of that country according to the actual current time in Saudi
   - Realize hours do not matter as the formula is only high def anough to give to the hijri date the morning of that day
 - Maybe we won't have to do that. Maybe all we need is what the Islamic day was during that day in Saudi

  - You also have to adjust it for whether its maghreb or not



*/

export class DateAdj {
    constructor() {
        //hijri-date //console.log(convert(new Date(2024, 2, 4, 1), -1));

        this.initGregDate = new Date();
        this.initHijriDate = this.convertToLocalHijriDate(this.initGregDate);
        console.log(this.initHijriDate);

        this.objHijriYear = this.initHijriDate.Hyear;
        this.objHijriMonth = this.initHijriDate.Hmonth;
        this.objHijriDay = this.initHijriDate.Hday;
        this.currMonthMax = this.initHijriDate.Hlength;
    }

    //hijri date for the date given adjusted for location
    convertToLocalHijriDate(theDate) {
        var UQCalDate = new UQCal(theDate);
        var UQCalHijriDate = UQCalDate.convert();
        //Lots of code here
        return UQCalHijriDate;
    }

    getCurrentMonthMax() {
        return this.currMonthMax;
    }

    setCurrentMonthMax(num) {
        if (num == 29) {
            this.currMonthMax = 29;
        }
        else {
            this.currMonthMax = 30;
        }
    }

    //returns True if month changed
    incrementADay() {
        var boolMonthChange = false;

        //if the numbers of days is greater than or equal to the month's max
        if (this.objHijriDay >= this.currMonthMax) {
            //increment the month and go to day one (for new month)
            this.objHijriMonth += 1;
            boolMonthChange = true;
            this.objHijriDay = 1;

            //if you incremented the last month, add a year and go to first month now
            if (this.objHijriMonth == 12) {
                this.objHijriMonth = 0;
                this.objHijriYear += 1;
            }
        }
        else {
            this.objHijriDay += 1;
        }
        return boolMonthChange;
    }

    //returns True if month changed
    decrementADay() {
        var boolMonthChange = false;

        if (this.objHijriDay == 1) {
            this.objHijriMonth -= 1;
            boolMonthChange = true;
            this.objHijriDay = this.currMonthMax;

            if (this.objHijriMonth == -1) {
                this.objHijriMonth = 11;
                this.objHijriYear -= 1;
            }
        }
        else {
            this.objHijriDay -= 1;
        }
        return boolMonthChange;
    }
    
    getMonthYearString() {
        var outputString = (`${this.getMonthString()} ${this.objHijriDay}`);
        return outputString;
    }

    getMonthString() {
        var monthNames = new Array("Muḥarram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah")
        var outputString = (`${monthNames[this.objHijriMonth - 1]}`);
        return outputString;
    }
    
    /*
    //returns what the Hijri calculator says is the max numbers of days for inputted greg date  is
    //was created for use with the hijri-date.js library
        //this.currMonthMax = this.#monthCalcLastDate(this.initGregDate);
    #monthCalcLastDate(inputGregDate) {
        var hijriDate = this.convertToLocalHijriDate(inputGregDate);
        var maxHijriDays = hijriDate.dayOfMonth;
        
        var tempHijriDate = this.convertToLocalHijriDate(inputGregDate); //same as hijriDate
        var daysAdd = 0;

        //while the hijri month we are investigating the numbers of days for is the same as the hijri month that we are incrementing the days for
        while (tempHijriDate.month == hijriDate.month) {
            if (tempHijriDate.dayOfMonth > maxHijriDays) {
                maxHijriDays = tempHijriDate.dayOfMonth;
            }

            daysAdd = daysAdd + 1;
            tempHijriDate = this.convertToLocalHijriDate(inputGregDate, daysAdd);
        }

        return maxHijriDays;
    }
    */
}