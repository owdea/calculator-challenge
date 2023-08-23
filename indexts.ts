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
const buttons = document.querySelectorAll(".button")
const buttonSelected = document.getElementsByClassName("active") as any as NodeListOf<HTMLButtonElement>;
const reset = document.querySelector("#main-right #button-reset") as HTMLButtonElement | null;
const inputs = document.querySelectorAll(".inputs") as NodeListOf<HTMLInputElement> | null;
const resultTip = document.querySelector("#result-tip") as HTMLSpanElement | null;
const resultTotal = document.querySelector("#result-total") as HTMLSpanElement | null;
const bill = document.querySelector("main #main-left #bill .input") as HTMLInputElement | null;
const numberOfPeople = document.querySelector("main #main-left-bottom #number-people .input") as HTMLInputElement | null;
const errorMessage = document.querySelector(".if-zero-number") as HTMLParagraphElement | null;
const customTip = document.querySelector(".custom") as HTMLInputElement | null;

customTip?.addEventListener("click", calculateCustomTip); //optional chaining

buttons.forEach((button) => {
    button.addEventListener("click", () => calculateTip(button))
});
// const mujListener = (event) => {event.target.innerText = "Ahoj"};

// function addEventListener(eventType: String, listener: (event: HTMLEvent) => void)

reset?.addEventListener("click", resetAll)

bill?.addEventListener("input", function() {
    dealWithResetButton();

    if(customTip?.value !== "" && (numberOfPeople?.value !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate();
    }
})
/*
customTip.oninput = function(event) {
    dealWithResetButton();

    if((bill.value !== "" || parseFloat(bill.value) < 0) && (numberOfPeople.value !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate()
    }
}
*/
customTip?.addEventListener("input", function(event) {
    dealWithResetButton();

    if((bill?.value !== "" || parseFloat(bill.value) < 0) && (numberOfPeople?.value !== "" || parseInt(numberOfPeople.value) > 0)) {
        calculate()
    }
})

numberOfPeople?.addEventListener("input", function(event) {
    dealWithResetButton();

    if(parseFloat(numberOfPeople.value) <= 0 || numberOfPeople.value === "") {
        if (errorMessage) {
            errorMessage.innerText = `can't be zero`;
            errorMessage.style.color = 'red';
        }
        numberOfPeople.style.borderColor = 'red';
        if (resultTip) resultTip.innerText = '----';
        if (resultTotal) resultTotal.innerText = '----';
    } else {
        if(errorMessage) errorMessage.innerText = "";
        numberOfPeople.style.borderColor = "";
        calculate();
    }
})

function calculate() {
    let tipPercentage

    if(buttonSelected.length == 0) {
        tipPercentage = 0;
    }else {
        if(customTip?.classList.contains("active")) {
            tipPercentage = parseFloat(customTip.value); 
        }else {
            tipPercentage = parseFloat(buttonSelected[0].value) //defaultní hodnota
        }
    }
    if (bill) {
        let billInt = parseFloat(bill.value)
        if (numberOfPeople) {
            let numberOfPeopleInt = parseInt(numberOfPeople.value)
            let tipPerPerson = (billInt * tipPercentage * 0.01)/numberOfPeopleInt;
            let totalPerPerson = (billInt/numberOfPeopleInt) + tipPerPerson;
            console.log({billInt, tipPerPerson, tipPercentage})
            if (resultTip) resultTip.innerText = tipPerPerson.toFixed(2);
            if (resultTotal) resultTotal.innerText = totalPerPerson.toFixed(2);
        }
    }
}

function calculateTip(button: Element) {
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    button.classList.add('active');
    customTip?.classList.remove('active');
    calculate();    
}

function calculateCustomTip() {
    buttons.forEach((button) => {
        button.classList.remove("active");
    })
    customTip?.classList.add("active");

    if((bill?.value !== '' || parseFloat(bill.value) < 0) && (numberOfPeople?.value !== '' || parseInt(numberOfPeople.value) > 0) ){
        calculate();
    }
}

function dealWithResetButton() {
    if(customTip?.value === '' && bill?.value === '' && numberOfPeople?.value === ''){
        if(reset) reset.disabled = true;
        reset?.classList.remove('has-reset-activated');
        numberOfPeople.style.borderColor = '';
    }else{
        if (reset) reset.disabled = false;
        reset?.classList.add('has-reset-activated');       
    }
}

function resetAll() {
    buttons.forEach((button) => {
        button.classList.remove("active")
    })

    inputs?.forEach((input) => {
        input.value = "";
    })
    
    if (resultTip) resultTip.innerText = "0.00"
    if (resultTotal) resultTotal.innerText = "0.00"
    if (reset) reset.disabled = true;
    if (errorMessage) errorMessage.innerText = ``;
    if (numberOfPeople) numberOfPeople.style.borderColor = ''
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