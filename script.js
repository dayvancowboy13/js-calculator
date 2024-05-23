let firstNumber;
let operator = '';
let secondNumber;
let bClearDisplayOnTyping = true;
const MAX_DISPLAY_CHARS = 7;
const DIV_ZERO_ERROR_MSG = "Error!"
let bLastButtonWasOperator = false;
const numbersString ="1234567890";
const operatorsString = "/*-+"

let display = document.querySelector(".display");
addListeners();

document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        console.log(`The key pressed was ${keyName} and it is type ${typeof keyName}`);

        if(numbersString.includes(keyName)){
            console.log("That is a number boiii!");
            appendToDisplay(keyName);
            bLastButtonWasOperator = false;

        } else if (operatorsString.includes(keyName)){
            console.log("That is an op sonny!")

            if(firstNumber === undefined || bLastButtonWasOperator){
                operator = keyName;
                firstNumber = +checkDisplayContent();
                bClearDisplayOnTyping = true;
                console.log(`The first number is ${firstNumber}`);
                console.log(operator);
            } else {
                secondNumber = +checkDisplayContent();
                console.log(`The 2nd number is ${secondNumber}`);
                console.log(operator);
                operate(operator, firstNumber, secondNumber);
                firstNumber = +checkDisplayContent();
                operator = keyName;
                bClearDisplayOnTyping;                
            }
            
            bLastButtonWasOperator = true;

        } else if ("Enter".includes(keyName)) {
            if (firstNumber === undefined || bLastButtonWasOperator){
                //do nothing
            } else {
                secondNumber = +checkDisplayContent();
                console.log(`The first number is ${secondNumber}`);
                operate(operator, firstNumber,secondNumber);
                operator = '';
                bLastButtonWasOperator = false;
            }
        } else if ("Backspace".includes(keyName)){
            console.log("Backspace hit!")
            let tempDisplayText = checkDisplayContent();
            if (tempDisplayText.length !== 1) {
                display.textContent = tempDisplayText.slice(0,tempDisplayText.length-1);
                console.log(`The current display text is ${tempDisplayText} and after the
                slice operation it is ${display.textContent}`)
            } else {
                display.textContent = '0';
                bClearDisplayOnTyping = true;
            }
            bLastButtonWasOperator = false;

        } else if (keyName === 'c'){
            display.textContent = "0";
            firstNumber = undefined;
            secondNumber = undefined;
            operator = '';
            bClearDisplayOnTyping = true;
            bLastButtonWasOperator = false;
        }

    }

)


function addListeners(){
    
    // numbers
    let numberNodes = document.getElementsByClassName("number");
    for (let i = 0; i < numberNodes.length; i++) {
        numberNodes[i].addEventListener('click',() =>{
            appendToDisplay(numberNodes[i].textContent);
            bLastButtonWasOperator = false;
        })
    }

    // operators
    let operatorNodes = document.getElementsByClassName("operator");
    // console.log(operatorNodes)

    for (let i = 0; i < operatorNodes.length; i++){
        operatorNodes[i].addEventListener('click', ()=> {

            if(firstNumber === undefined || bLastButtonWasOperator){
                operator = operatorNodes[i].textContent;
                firstNumber = +checkDisplayContent();
                bClearDisplayOnTyping = true;
                console.log(`The first number is ${firstNumber}`);
                console.log(operator);
            } else {
                secondNumber = +checkDisplayContent();
                console.log(`The 2nd number is ${secondNumber}`);
                console.log(operator);
                operate(operator, firstNumber, secondNumber);
                firstNumber = +checkDisplayContent();
                operator = operatorNodes[i].textContent;
                bClearDisplayOnTyping;                
            }
            
            bLastButtonWasOperator = true;
        });
    }

    // equals
    let equalNode = document.querySelector('.equals');
    equalNode.addEventListener("click", ()=>{
        if (firstNumber === undefined || bLastButtonWasOperator){
            //do nothing
        } else {
            secondNumber = +checkDisplayContent();
            console.log(`The first number is ${secondNumber}`);
            operate(operator, firstNumber,secondNumber);
            operator = '';
            bLastButtonWasOperator = false;
        }
    });

    // clear
    let clearNode = document.querySelector('#clear')
    clearNode.addEventListener('click', ()=>{
        display.textContent = "0";
        firstNumber = undefined;
        secondNumber = undefined;
        operator = '';
        bClearDisplayOnTyping = true;
        bLastButtonWasOperator = false;
    })

    // delete
    let deleteNode = document.querySelector("#del");
    deleteNode.addEventListener("click", ()=>{
        let tempDisplayText = checkDisplayContent();
        if (tempDisplayText.length !== 1) {
            display.textContent = tempDisplayText.slice(0,tempDisplayText.length-1);
            console.log(`The current display text is ${tempDisplayText} and after the
            slice operation it is ${display.textContent}`)
        } else {
            display.textContent = '0';
            bClearDisplayOnTyping = true;
        }
        bLastButtonWasOperator = false;
    })

    // plus/minus
    let plusMinusNode = document.querySelector('#plus-minus');
    plusMinusNode.addEventListener("click", ()=>{
        if(display.textContent !== 0){
            display.textContent *= -1;
        }
        bLastButtonWasOperator = false;
    });
}

function checkDisplayContent(){
    if (display.textContent === DIV_ZERO_ERROR_MSG){
        display.textContent = 0;
    }

    return display.textContent;
}

function trimResult(result){
    return (Math.round(result*10000))/10000;
}

function appendToDisplay(value){
    if(bClearDisplayOnTyping){
        display.textContent = value;
        bClearDisplayOnTyping = false;
    } else {
        let currentDisplayText = display.textContent;
        if (currentDisplayText.length < MAX_DISPLAY_CHARS){
            currentDisplayText += value;
            display.textContent = currentDisplayText;
        } else {
            //do NOTHING
        }
    }
}

// OPERATE FUNCTION:
function operate(op, num1, num2){
    let result;
    switch (op) {
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
            if (num2 === 0){
                result = DIV_ZERO_ERROR_MSG;
            } else {
                result = trimResult(divide(num1,num2));
            }
            break;
    }

    display.textContent = result;
    firstNumber = undefined;
    secondNumber = undefined;
    bClearDisplayOnTyping = true;
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
