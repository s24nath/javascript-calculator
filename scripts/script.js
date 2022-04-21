const numericBtnList = document.getElementsByClassName('calc-num-btn');
const operatorBtnList = document.getElementsByClassName('calc-operator-btn');
const display = document.getElementById('display');
const resultBtn = document.getElementById('result-btn');
const deleteBtn = document.getElementById('del');
const topDisplay = document.getElementById('top-display');
const dot = document.getElementById('dot');
const allClear = document.getElementById('all-clear');
let operand1;
let operand2;
let result;
let lastOperation;
let operator = '';
let autoClearDisplay = false;
let chainOperation = false;
let operationWithResult = false;

// Display 0 if the input is empty
function displayZeroIfEmptyField() {
    display.value = display.value || 0;
}

// Clear display
function clearDisplay(confirm) {
    if(confirm) {
        // topDisplay.textContent = '';
        display.value = '';
        autoClearDisplay = false;
    }
}

// Displaying numbers while clicking buttons
function displayNum() {    
    for (const currentBtn of numericBtnList) {
        currentBtn.addEventListener('click',function () {
            clearDisplay(autoClearDisplay);
            display.value += this.textContent;
            chainOperation = true; 
            operationWithResult = false;
        });
    }
}

// Restriction keyboard to only numbers and also restrict multiple dots if typed from keyboard.
function onlyNum(e) {
    let getKey = e.key;
    if(!isNaN(Number(getKey)) || (getKey === '.' && !String(display.value).includes('.'))) {
        clearDisplay(autoClearDisplay);
        chainOperation = true; 
        operationWithResult = false;
        return true;
    } else {
        return false;
    }
}

// Restriction multiple double if clicked from screen buttons
function restrictMultiDot() {
    display.value += !String(display.value).includes('.') ? '.' : '';
}

// Selection of operation clicked
function selectOperator() {
    for (const currentBtn of operatorBtnList) {
        currentBtn.addEventListener('click',function () {
            assigningFirstOperand();
            operator = this.textContent;
            topDisplay.textContent = `${operand1} ${operator}`;
        });
    }
}

// Assigning the first operand. Also used to chain operations.
function assigningFirstOperand() {
    if (operator !== '' && chainOperation) {
        operand2 = Number(display.value);
        operand1 = operation(operand1, operator, operand2);
        display.value = operand1;
        chainOperation = false;
    } else if (operationWithResult) {
        operand1 = result;
    } else {
        operand1 = Number(display.value);
        chainOperation = false;
    }
    autoClearDisplay = true;
}

// Operations between operands
function operation(a,operatorSelected,b) {
    let result;
    switch (operatorSelected) {
        case '*' :
            result = a * b;
            break;
        case '+' :
            result = a + b;
            break;
        case '-' :
            result = a - b; 
            break;
        case '/' :
            result = a / b;
            break;
        case 'Exp' :
            result = exponentialOperation(a,b);
            break;
        case '%' :
            result = (a/100) * b;
            break;
        default: 
            console.log('Invalid operator');
    }
    return result;
}

// Exponential operations
function exponentialOperation(value,exponent) {
    let r = 1;
    for(let i = 1; i <= exponent; i++) {
        r *= value;
    }
    return r;
}

// Displaying result 
resultBtn.addEventListener('click', function () {
    if(operator !== '') {        
        operand2 = Number(display.value);
        result = operation(operand1, operator, operand2);
        display.value = result;
        topDisplay.textContent = `${operand1} ${operator} ${operand2}`;
        operator = '';
        operationWithResult = true;
        autoClearDisplay = true;
    }
});

// Delete Last Character
deleteBtn.addEventListener('click', function () {
    display.value = String(display.value).slice(0,-1);
    // displayZeroIfEmptyField();
});

// All clear 
allClear.addEventListener('click', function() {
    // displayZeroIfEmptyField();
    display.value = '';
    topDisplay.textContent = '';
    operator = '';
    autoClearDisplay = true;
    operationWithResult = false;
});

displayZeroIfEmptyField();
assigningFirstOperand();
selectOperator();
displayNum();       