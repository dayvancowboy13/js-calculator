console.log("testing 1,2, 1,2")

// let firstNumber;
// let operator;
// let secondNumber;



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
