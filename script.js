let firstNumber;
let operator = '';
let secondNumber;
let bClearDisplayOnTyping = true;
const MAX_DISPLAY_CHARS = 5;

let display = document.querySelector(".display");
addListeners();


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

            if(firstNumber === undefined){
                firstNumber = +display.textContent;
                bClearDisplayOnTyping = true;
                console.log(`The first number is ${firstNumber} and its type is ${typeof firstNumber}`);
                console.log(operator);
            } else {
                secondNumber = +display.textContent;
                console.log(`The 2nd number is ${secondNumber}`);
                console.log(operator);
                operate(operator, firstNumber, secondNumber)
                // currently bugged; continuing to press an operator just takes the 
                // display value and doubles or something else; need to allow user
                // to 

            }

            firstNumber = +display.textContent;

        });
    }

    // equals - basically just displaying the result on the screen?
    let equalNode = document.querySelector('.equals');
    equalNode.addEventListener("click", ()=>{
        secondNumber = +display.textContent;
        console.log(`The first number is ${secondNumber} and its type is ${typeof secondNumber}`);
        operate(operator, firstNumber,secondNumber);
        // bClearDisplayOnTyping = true;
    });

    // clear
    let clearNode = document.querySelector('#clear')
    clearNode.addEventListener('click', ()=>{
        display.textContent = "0";
        firstNumber = undefined;
        secondNumber = undefined;
        operator = '';
        bClearDisplayOnTyping = true;
    })

    // delete
    let deleteNode = document.querySelector("#del");
    deleteNode.addEventListener("click", ()=>{
        let tempDisplayText = display.textContent;
        if (tempDisplayText.length !== 1) {
            display.textContent = tempDisplayText.slice(0,tempDisplayText.length-1);
            console.log(`The current display text is ${tempDisplayText} and after the
            slice operation it is ${display.textContent}`)
        } else {
            display.textContent = '0';
            bClearDisplayOnTyping = true;
        }
    })

    // plus minus
    let plusMinusNode = document.querySelector('#plus-minus');
    plusMinusNode.addEventListener("click", ()=>{
        if(display.textContent !== 0){
            display.textContent *= -1;
        }
    });
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
            result = divide(num1,num2);
            break;
    }

    display.textContent = result;
    firstNumber= result;
    secondNumber = undefined;
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
