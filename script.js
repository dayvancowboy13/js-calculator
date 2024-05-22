//console.log("testing 1,2, 1,2")

// let firstNumber;
let operator = '';
// let secondNumber;
const MAX_DISPLAY_CHARS = 10;
let display = document.querySelector(".display");
 addListeners();

 // on hitting EQUALS (=), then the calculator will call operate()

function addListeners(){
    let numberNodes = document.getElementsByClassName("number");
    
    // numbers
    for (let i = 0; i < numberNodes.length; i++) {
        numberNodes[i].addEventListener('click',() =>{
            appendToDisplay(numberNodes[i].textContent);
        })
    }

    // operators
    let operatorNodes = document.getElementsByClassName("operator");
    // console.log(operatorNodes)

    for (let i = 0; i < operatorNodes.length; i++){
        operatorNodes[i].addEventListener('click', ()=> {
            operator = operatorNodes[i].textContent;
            console.log(operator);
        });
    }
}

function clear(){}

function appendToDisplay(value){
    if(display.textContent == '0'){
        display.textContent = value;
    } else {
        let currentDisplayText = display.textContent;
        if (currentDisplayText.length < 10){
            currentDisplayText += value;
            display.textContent = currentDisplayText;
        } else {
            //do NOTHING
        }
    }
}

// OPERATE FUNCTION:
function operate(operator, num1, num2){
    let result;
    switch (operator) {
        case "+":
            result = add(num1,num2);
            break;
        case "-":
            result = subtract(num1,num2);
            break;
        case "*":
            result = multiply(num1,num2);
            break;
        case "/":
            result = divide(num1,num2);
            break;
    }

    return result;
}

// BASIC MATH FUNCTIONS:

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(numerator, denominator){
    return numerator / denominator;
}
