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


const buttons = document.querySelectorAll(".button");
const buttonSelected = document.getElementsByClassName("active");
const reset = document.querySelector("#main-right #button-reset")
const inputs = document.querySelectorAll(".inputs")
const resultTip = document.querySelector("#result-tip")
const resultTotal = document.querySelector("#result-total")
const bill = document.querySelector("main #main-left #bill .input")
const numberOfPeople = document.querySelector("main #main-left-bottom #number-people .input")
const errorMessage = document.querySelector(".if-zero-number")
const customTip = document.querySelector(".custom")

customTip.addEventListener("click", calculateCustomTip);

buttons.forEach((button) => {
    button.addEventListener("click", calculateTip)
});
// const mujListener = (event) => {event.target.innerText = "Ahoj"};

// function addEventListener(eventType: String, listener: (event: HTMLEvent) => void)

reset.addEventListener("click", resetAll)

bill.oninput = function(event) {
    dealWithResetButton();

    if(customTip.value !== "" && (numberOfPeople !== "" || numberOfPeople > 0)) {
        calculate();
    }
}

customTip.oninput = function(event) {
    dealWithResetButton();

    if((bill.value !== "" || bill.value < 0) && (numberOfPeople.value !== "" || numberOfPeople.value > 0)) {
        calculate()
    }
}

numberOfPeople.oninput = function(event) {
    dealWithResetButton();

    if(numberOfPeople.value <= 0 || numberOfPeople.value === "") {
        errorMessage.innerText = `can't be zero`;
        errorMessage.style.color = 'red';
        numberOfPeople.style.borderColor = 'red';
        resultTip.innerText = '----';
        resultTotal.innerText = '----';
    } else {
        errorMessage.innerText = "";
        numberOfPeople.style.borderColor = "";
        calculate();
    }
}

function calculate() {
    let tipPerPerson
    let totalPerPerson
    let tipPercentage

    if(buttonSelected.length == 0) {
        tipPercentage = 0;
    }else {
        if(customTip.classList.contains("active")) {
            tipPercentage = customTip.value; 
        }else {
            tipPercentage = buttonSelected[0].value //defaultní hodnota
        }
    }

    tipPerPerson = (bill.value * tipPercentage * 0.01)/numberOfPeople.value;
    totalPerPerson = (bill.value/numberOfPeople.value) + tipPerPerson;
    tipPerPerson = tipPerPerson.toFixed(2);   
    totalPerPerson = totalPerPerson.toFixed(2);

    resultTip.innerText = tipPerPerson;
    resultTotal.innerText = totalPerPerson;
}

function calculateTip() {
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    this.classList.add('active'); //Hlavně tohle
    customTip.classList.remove('active');
    calculate();    
}

function calculateCustomTip() {
    buttons.forEach((button) => {
        button.classList.remove("active");
    })
    this.classList.add("active");

    if((bill.value !== '' || bill.value < 0) && (numberOfPeople.value !== '' || numberOfPeople.value > 0) ){
        calculate();
    }
}

function dealWithResetButton() {
    if(customTip.value === '' && bill.value === '' && numberOfPeople.value === ''){
        reset.disabled = true;
        reset.classList.remove('has-reset-activated');
        numberOfPeople.style.borderColor = '';
    }else{
        reset.disabled = false;
        reset.classList.add('has-reset-activated');       
    }
}

function resetAll() {
    buttons.forEach((button) => {
        button.classList.remove("active")
    })

    inputs.forEach((input) => {
        input.value = "";
    })

    resultTip.innerText = "0.00"
    resultTotal.innerText = "0.00"
    reset.disabled = true;
    errorMessage.innerText = ``;
    numberOfPeople.style.borderColor = ''
    reset.classList.remove('has-reset-activated');
    reset.style.backgroundColor = '';

    
    // logniProKazdySudyCilo([10, 2, 1], logni) 


}


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