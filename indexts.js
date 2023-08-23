/*TODO:
DONE Definování variables: (použij .querySelectorAll(), getElementByClassName(), querySelector())
        buttons - pole všech buttonů
        buttonSelected - vybraný button s procenty
        reset - reset button
        inputs - inputy - počet lidí, částka
        resultTip - dýško na osobu
        resultTotal - výsledné dýško
        bill - částka bez dýška
        numberOfPeople - počet lidí
        errorMessage - p tag pro zobrazování errorů
        customTip - ubozt pro zadání custom procenta
    při kliknutí na customTip vypočítat calculateCustomTip - addEventListener
    při kliknutí na jeden z buttons buttonů spustit calculatetip
    při kliknutí na reset button spustit funkci resetAll
oninput: pokud je dostatek inputů, vypočítej dýško - pro bill, customTip, numberOfPeople
funkce:
    calculate - celkové vypočítání dýška
    calculateTip - asi zrušení aktivního stavu u ostatních tlačítek krom zmáčknutého
    calculateCustomTip - funkce pro použití custom tlačítka
    dealWithResetButton - vyhodnocení deaktivace a aktivace reset tlačítka
    resetAll = funkce pro reset kalkulačky po stisknutí tlačítka resetAll
*/
/*
     todo: Přepsat do Typescriptu a vymyslet jak vynechat this.*
*/
//todo: 
var buttons = document.querySelectorAll(".button");
var buttonSelected = document.getElementsByClassName("active");
var reset = document.querySelector("#main-right #button-reset");
var inputs = document.querySelectorAll(".inputs");
var resultTip = document.querySelector("#result-tip");
var resultTotal = document.querySelector("#result-total");
var bill = document.querySelector("main #main-left #bill .input");
var numberOfPeople = document.querySelector("main #main-left-bottom #number-people .input");
var errorMessage = document.querySelector(".if-zero-number");
var customTip = document.querySelector(".custom");
customTip === null || customTip === void 0 ? void 0 : customTip.addEventListener("click", calculateCustomTip); //optional chaining
buttons.forEach(function (button) {
    button.addEventListener("click", function () { return calculateTip(button); });
});
// const mujListener = (event) => {event.target.innerText = "Ahoj"};
// function addEventListener(eventType: String, listener: (event: HTMLEvent) => void)
reset === null || reset === void 0 ? void 0 : reset.addEventListener("click", resetAll);
bill === null || bill === void 0 ? void 0 : bill.addEventListener("input", function () {
    dealWithResetButton();
    if ((customTip === null || customTip === void 0 ? void 0 : customTip.value) !== "" && ((numberOfPeople === null || numberOfPeople === void 0 ? void 0 : numberOfPeople.value) !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate();
    }
});
/*
customTip.oninput = function(event) {
    dealWithResetButton();

    if((bill.value !== "" || parseFloat(bill.value) < 0) && (numberOfPeople.value !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate()
    }
}
*/
customTip === null || customTip === void 0 ? void 0 : customTip.addEventListener("input", function (event) {
    dealWithResetButton();
    if (((bill === null || bill === void 0 ? void 0 : bill.value) !== "" || parseFloat(bill.value) < 0) && ((numberOfPeople === null || numberOfPeople === void 0 ? void 0 : numberOfPeople.value) !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate();
    }
});
numberOfPeople === null || numberOfPeople === void 0 ? void 0 : numberOfPeople.addEventListener("input", function (event) {
    dealWithResetButton();
    if (parseFloat(numberOfPeople.value) <= 0 || numberOfPeople.value === "") {
        if (errorMessage) {
            errorMessage.innerText = "can't be zero";
            errorMessage.style.color = 'red';
        }
        numberOfPeople.style.borderColor = 'red';
        if (resultTip)
            resultTip.innerText = '----';
        if (resultTotal)
            resultTotal.innerText = '----';
    }
    else {
        if (errorMessage)
            errorMessage.innerText = "";
        numberOfPeople.style.borderColor = "";
        calculate();
    }
});
function calculate() {
    var tipPercentage;
    if (buttonSelected.length == 0) {
        tipPercentage = 0;
    }
    else {
        if (customTip === null || customTip === void 0 ? void 0 : customTip.classList.contains("active")) {
            tipPercentage = parseFloat(customTip.value);
        }
        else {
            tipPercentage = parseFloat(buttonSelected[0].value); //defaultní hodnota
        }
    }
    if (bill) {
        var billInt = parseFloat(bill.value);
        if (numberOfPeople) {
            var numberOfPeopleInt = parseInt(numberOfPeople.value);
            var tipPerPerson = (billInt * tipPercentage * 0.01) / numberOfPeopleInt;
            var totalPerPerson = (billInt / numberOfPeopleInt) + tipPerPerson;
            console.log({ billInt: billInt, tipPerPerson: tipPerPerson, tipPercentage: tipPercentage });
            if (resultTip)
                resultTip.innerText = tipPerPerson.toFixed(2);
            if (resultTotal)
                resultTotal.innerText = totalPerPerson.toFixed(2);
        }
    }
}
function calculateTip(button) {
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });
    button.classList.add('active');
    customTip === null || customTip === void 0 ? void 0 : customTip.classList.remove('active');
    calculate();
}
function calculateCustomTip() {
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
    customTip === null || customTip === void 0 ? void 0 : customTip.classList.add("active");
    if (((bill === null || bill === void 0 ? void 0 : bill.value) !== '' || parseFloat(bill.value) < 0) && ((numberOfPeople === null || numberOfPeople === void 0 ? void 0 : numberOfPeople.value) !== '' || parseInt(numberOfPeople.value) > 0)) {
        calculate();
    }
}
function dealWithResetButton() {
    if ((customTip === null || customTip === void 0 ? void 0 : customTip.value) === '' && (bill === null || bill === void 0 ? void 0 : bill.value) === '' && (numberOfPeople === null || numberOfPeople === void 0 ? void 0 : numberOfPeople.value) === '') {
        if (reset)
            reset.disabled = true;
        reset === null || reset === void 0 ? void 0 : reset.classList.remove('has-reset-activated');
        numberOfPeople.style.borderColor = '';
    }
    else {
        if (reset)
            reset.disabled = false;
        reset === null || reset === void 0 ? void 0 : reset.classList.add('has-reset-activated');
    }
}
function resetAll() {
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
    inputs === null || inputs === void 0 ? void 0 : inputs.forEach(function (input) {
        input.value = "";
    });
    if (resultTip)
        resultTip.innerText = "0.00";
    if (resultTotal)
        resultTotal.innerText = "0.00";
    if (reset)
        reset.disabled = true;
    if (errorMessage)
        errorMessage.innerText = "";
    if (numberOfPeople)
        numberOfPeople.style.borderColor = '';
    if (reset) {
        reset.classList.remove('has-reset-activated');
        reset.style.backgroundColor = '';
    }
}
// logniProKazdySudyCilo([10, 2, 1], logni) 
// function logniProKazdySudyCislo(cisla, callback) {
//     cisla.forEach((cislo) => {
//         if(cislo % 2 === 0) {
//             callback(cislo);
//         }
//     })
// }
// function logni(text) {
//     console.log(text);
//     return 3;
// }
