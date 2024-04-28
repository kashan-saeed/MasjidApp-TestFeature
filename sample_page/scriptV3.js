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
const objGregDateMessage = document.querySelector('.objGregDateMessage');
const objCalcDateMessage = document.querySelector('.objCalcDateMessage');

//init date 
var dateObj = new DateAdj();
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
    dateObj = new DateAdj();
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

function debugMessage() {
    var objGregDate = dateObj.getObjGregDate();
    objGregDateMessage.innerHTML = (`${objGregDate.getMonth() + 1}/${objGregDate.getDate()}`)

    var calcHijri = dateObj.convertToLocalHijriDate(objGregDate);
    objCalcDateMessage.innerHTML = (`${dateObj.getMonthString(calcHijri.Hmonth - 1)} ${calcHijri.Hday}`);
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