import {DateAdj} from "./dateAdjV2.js"


//Global Vars
const btn29 = document.querySelector('.btn29');
const btn30 = document.querySelector('.btn30');
const btnAdd = document.querySelector('.btnAdd');
const btnSub = document.querySelector('.btnSub');
const dateMessage = document.querySelector('.dateMessage');
const monthText = document.querySelector('.monthText');
const objGregDate = document.querySelector('.objGregDate');
const objCalcDate = document.querySelector('.objCalcDate');

//init date 
const dateObj = new DateAdj();

//init 29/30 button
update2930btn();
debugMessage();

//Date Message
dateMessage.innerHTML = dateObj.getMonthYearString();

//Max days message
//monthText.innerHTML = (`The max number of days for ${dateObj.getMonthString()}`);


//Event Listeners
btn29.addEventListener('click', () => {
    btn29.style.backgroundColor = '#006c91';
    btn30.style.backgroundColor = '#eee';

    if (dateObj.setCurrentMonthMax(29) == true) {
        dateMessage.innerHTML = dateObj.getMonthYearString();
        update2930btn();
    }

    debugMessage();
})

btn30.addEventListener('click', () => {
    btn30.style.backgroundColor = '#006c91';
    btn29.style.backgroundColor = '#eee';

    dateObj.setCurrentMonthMax(30);

    debugMessage();
})

btnAdd.addEventListener('click', () => {
    if (dateObj.incrementBtn() == true) {
        update2930btn();
    }
    dateMessage.innerHTML = dateObj.getMonthYearString();

    debugMessage();
})

btnSub.addEventListener('click', () => {
    if (dateObj.decrementBtn() == true) {
        update2930btn();
    }
    dateMessage.innerHTML = dateObj.getMonthYearString();

    debugMessage();
})



//functions
function debugMessage() {
    objGregDate.innerHTML = (`${dateObj.objGregDate.getMonth() + 1}/${dateObj.objGregDate.getDate()}`)

    var calcHijri = dateObj.convertToLocalHijriDate(dateObj.objGregDate);
    objCalcDate.innerHTML = (`${dateObj.getMonthString(calcHijri.Hmonth - 1)} ${calcHijri.Hday}`);
}


function update2930btn() {
    if (dateObj.getCurrentMonthMax() == 29) {
        btn29.style.backgroundColor = '#006c91';
        btn30.style.backgroundColor = '#eee';
    }
    else {
        btn30.style.backgroundColor = '#006c91';
        btn29.style.backgroundColor = '#eee';
    }
}