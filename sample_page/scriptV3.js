import {DateAdj} from "./dateAdjV3.js"


//Global Vars
const btn29 = document.querySelector('.btn29');
const btn30 = document.querySelector('.btn30');
const btnAdd = document.querySelector('.btnAdd');
const btnSub = document.querySelector('.btnSub');
const btnSave = document.querySelector('.btnSave');
const btnCancel = document.querySelector('.btnCancel');
const btnReset = document.querySelector('.btnReset');
const dateMessage = document.querySelector('.dateMessage');
//these two need to be commented out if not using debugger
const objGregDateMessage = document.querySelector('.objGregDateMessage');
const objCalcDateMessage = document.querySelector('.objCalcDateMessage');

//init date 
var currMaghrebTime = new Date(); //call a func that returns the current maghreb time also put that func in "btnReset.addEventListener"
currMaghrebTime.setHours(7,0,0);
var dateObj = new DateAdj(new Date(), currMaghrebTime);
var oldDateObjProp = undefined;

//init 29/30 button, make trio invisible, set first click to true
update2930btn();
invisibleTrio();
var isFirstClick = true;
debugMessage();

//Date Message
dateMessage.innerHTML = dateObj.getMonthYearString();


//Event Listeners
btn29.addEventListener('click', () => {
    checkFirstClick();
    
    btn29.style.backgroundColor = '#006c91';
    btn30.style.backgroundColor = '#eee';

    dateObj.setCurrentMonthMax(29);
    dateMessage.innerHTML = dateObj.getMonthYearString();
    update2930btn();

    debugMessage();
})

btn30.addEventListener('click', () => {
    checkFirstClick();
    
    btn30.style.backgroundColor = '#006c91';
    btn29.style.backgroundColor = '#eee';

    dateObj.setCurrentMonthMax(30);

    debugMessage();
})

btnAdd.addEventListener('click', () => {
    checkFirstClick();
    
    var boolMonthChange = dateObj.incrementBtn();
    update2930btn();
    dateMessage.innerHTML = dateObj.getMonthYearString();

    debugMessage();
})

btnSub.addEventListener('click', () => {
    checkFirstClick();

    var boolMonthChange = dateObj.decrementBtn();
    update2930btn();
    dateMessage.innerHTML = dateObj.getMonthYearString();

    debugMessage();
})

btnSave.addEventListener('click', () => {
    //empty out old properties so it doesn't have weird consequences later on
    oldDateObjProp = undefined;
    isFirstClick = true;
    invisibleTrio();

    dateMessage.innerHTML = dateObj.getMonthYearString();
    update2930btn();
    debugMessage();
})

btnCancel.addEventListener('click', () => {
    dateObj.replaceProperties(oldDateObjProp);
    isFirstClick = true;
    invisibleTrio();

    dateMessage.innerHTML = dateObj.getMonthYearString();
    update2930btn();
    debugMessage();
})

btnReset.addEventListener('click', () => {
    oldDateObjProp = undefined;
    currMaghrebTime = new Date(); //call a func that returns the current maghreb time
    currMaghrebTime.setHours(7,0,0);
    dateObj = new DateAdj(new Date(), currMaghrebTime); //change this to the current time
    isFirstClick = true;
    invisibleTrio();

    dateMessage.innerHTML = dateObj.getMonthYearString();
    update2930btn();
    debugMessage();
})



//functions

//check and see if it is the first click. If it is then save the original date, make the save/cancel/reset buttons visible, and set any further first clicks to false 
function checkFirstClick() {
    if (isFirstClick == true) {
        oldDateObjProp = structuredClone(dateObj);
        isFirstClick = false;
        visibleTrio();
    }
}

function invisibleTrio() {
    btnSave.style.visibility="hidden";
    btnCancel.style.visibility="hidden";
}

function visibleTrio() {
    btnSave.style.visibility="visible";
    btnCancel.style.visibility="visible";
}


// Comment this funciton out if removing debugger from html
function debugMessage() {
    var objIncrementedGregDate = dateObj.getIncrementedCalcGregDate();
    objGregDateMessage.innerHTML = (`${objIncrementedGregDate.getMonth() + 1}/${objIncrementedGregDate.getDate()}`)

    var calcHijri = dateObj.convertToHijriDate(objIncrementedGregDate);
    objCalcDateMessage.innerHTML = (`${dateObj.getMonthString(calcHijri.Hmonth)} ${calcHijri.Hday}`);
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