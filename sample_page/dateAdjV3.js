//dateAdjV3.js
import {convertGregToHijri, convertHijriToGreg} from "./TMACal.js";

//the dateAjd class is the system that controls the users interaction with the cal. It sits on top of the system


/*
Whatever date you give to the convert function it gives you the hijri day for that gregorian day in Saudi.

When you declare new Date() it will declare the date according to where you live.
So in Cali 2/29/2024 11:15 PM

and so when you throw that into the Hijri converter it will calculate it as:
 - The hijri calculation for the morning of 2/29/2024 in Saudi
   - Pay attention
   - it doesn't look at the time only the date. 
   - It will give you the hijri date for the morning of that day but in Saudi

How does the Hijri calculation work across different time zones?
 - Remember it only gives you the date for the morning of that day in Saudi.
    - Feb 29 in Saudi is 19 Shaban
    - Interestingly Feb 29 in Cali is 19 Shaban, and also Feb 29 in Sydney is also 19 Shaban. And so even tho the calculation is specifically for Mecca it works all over the world.
        - Take a look at this visual: https://docs.google.com/spreadsheets/d/1v9QRxaNXoUSo3IgupiiTyMwLpE-7bCSFP1DYdYQFEhw/edit?usp=sharing
    - To get the proper Hijri calculation per location all you have to do is put the current date and it will convert it correctly. If it is after Maghreb then give it the next Greg date.
*/


/**
* Keeps track of all calender related activities
* @param {Date} inputDateTime
* @param {Date} inputMaghrebDateTime
*/
export class DateAdj {
    constructor(inputDateTime, inputMaghrebDateTime) {
        if (!((inputDateTime instanceof Date) && (inputMaghrebDateTime instanceof Date))) {
            throw new TypeError("One or both parameters are not a Date object.");
          }

        var initGregDate = inputDateTime;
        var initMaghrebTime = inputMaghrebDateTime;
        var initHijriDate = this.initToLocalHijriDate(initGregDate, initMaghrebTime);
        console.log(initHijriDate);

        this.curGregDate = initGregDate;
        this.increment = 0;

        this.objHijriYear = initHijriDate.Hyear;
        this.objHijriMonth = initHijriDate.Hmonth;
        this.objHijriDay = initHijriDate.Hday;

        var currMonthMax = initHijriDate.Hlength;
        this.monthMaxArray = [currMonthMax];
        this.monthMaxArrayIndex = 0;
    }

    //hijri date for the date given adjusted for location and if it is maghreb yet
    //don't need to adjust for location, see notes above
    //do need to adjust for if it is maghreb already or not
    initToLocalHijriDate(theDate, maghrebTime) {
        if (theDate < maghrebTime) {
            var TMACalHijriDate = convertGregToHijri(theDate);
            return TMACalHijriDate;
        }
        //if maghreb has passed use the next greg day for calculation
        else{
            theDate.setDate(theDate.getDate() + 1);
            var TMACalHijriDate = convertGregToHijri(theDate);
            return TMACalHijriDate;
        }
    }

    convertToHijriDate(theDate) {
        var TMACalHijriDate = convertGregToHijri(theDate);
        return TMACalHijriDate;
    }

    replaceProperties(oldProperties) {
        this.curGregDate = oldProperties.curGregDate;
        this.increment = oldProperties.increment;

        this.objHijriYear = oldProperties.objHijriYear;
        this.objHijriMonth = oldProperties.objHijriMonth;
        this.objHijriDay = oldProperties.objHijriDay;

        this.monthMaxArray = [...oldProperties.monthMaxArray];
        this.monthMaxArrayIndex = oldProperties.monthMaxArrayIndex;

    }
    
    getCurrentMonthMax() {
        return this.monthMaxArray[this.monthMaxArrayIndex];
    }

    //returns true if month changed
    setCurrentMonthMax(num) {
        var boolMonthChange = false;
        if (num == 29) {
            this.monthMaxArray[this.monthMaxArrayIndex] = 29;
            //if we are at 30 then go to first of next month
            if (this.objHijriDay == 30) {
                var boolMonthChange = true;
                this.incrementObjDay();
            }
        }
        else {
            this.monthMaxArray[this.monthMaxArrayIndex] = 30;
        }
        console.log(this.monthMaxArray);
        return boolMonthChange;
    }

    getObjGregDate() {
        return new Date(this.curGregDate.getTime() + (this.increment * 24 * 60 * 60 * 1000));
    }

    incrementBtn() {
        this.increment += 1;
        return this.incrementObjDay();
    }

    decrementBtn() {
        this.increment -= 1;
        return this.decrementObjDay();
    }

    //returns True if month changed
    incrementObjDay() {
        var boolMonthChange = false;
        //if the numbers of days greater than or equal to the month's max
        if (this.objHijriDay >= this.monthMaxArray[this.monthMaxArrayIndex]) {
            //increment the month and go to day one (for new month)
            boolMonthChange = true;
            this.objHijriMonth += 1;
            this.objHijriDay = 1;
            //if you incremented the last month, add a year and go to first month now
            if (this.objHijriMonth == 13) {
                this.objHijriMonth = 1;
                this.objHijriYear += 1;
            }

            //code to keep track of months max
            //if the next new month's max is not added yet then add that
            if (this.monthMaxArrayIndex == this.monthMaxArray.length - 1) {
                this.monthMaxArray.push(this.getMaxCalcDays());
            }
            console.log(this.monthMaxArray);
            this.monthMaxArrayIndex += 1;
        }
        else {
            this.objHijriDay += 1;
        }
        return boolMonthChange;
    }

    //returns the calculated max number of days for current obj month
    getMaxCalcDays() {
        var TMACalGregDate = convertHijriToGreg(this.objHijriYear, this.objHijriMonth, this.objHijriDay);
        var tempHijriDate = convertGregToHijri(TMACalGregDate);
        return tempHijriDate.Hlength;
    }

    //returns True if month changed
    decrementObjDay() {
        var boolMonthChange = false;

        if (this.objHijriDay == 1) {
            boolMonthChange = true;
            this.objHijriMonth -= 1;

            if (this.objHijriMonth == 0) {
                this.objHijriMonth = 12;
                this.objHijriYear -= 1;
            }

            //code to keep track of months max
            //if the prev new month's max is not added yet then add that
            if (this.monthMaxArrayIndex == 0) {
                this.monthMaxArray.unshift(this.getMaxCalcDays());
            }
            else {
                this.monthMaxArrayIndex -= 1;
            }
            
            console.log(this.monthMaxArray);
            this.objHijriDay = this.monthMaxArray[this.monthMaxArrayIndex];
        }
        else {
            this.objHijriDay -= 1;
        }
        return boolMonthChange;
    }

    getMonthYearString() {
        var outputString = (`${this.getMonthString(this.objHijriMonth - 1)} ${this.objHijriDay}`);
        return outputString;
    }

    getMonthString(monthIndex) {
        var monthNames = new Array("Muḥarram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah")
        var outputString = (`${monthNames[monthIndex]}`);
        return outputString;
    }
}