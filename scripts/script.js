const numericBtnList = document.getElementsByClassName('calc-num-btn');
const operatorBtnList = document.getElementsByClassName('calc-operator-btn');
const display = document.getElementById('display');
const resultBtn = document.getElementById('result-btn');
const deleteBtn = document.getElementById('del');
const topDisplay = document.getElementById('top-display');
let operand1;
let operand2;
let operator = '';
let operationWithResult = false;

// Display 0 if the input is empty
function displayZeroIfEmptyField() {
    display.value = display.value || 0;
    display.value = 98;
    console.log(display.value);
}

// Displaying numbers while clicking buttons
function displayNum() {    
    for (const currentBtn of numericBtnList) {
        currentBtn.addEventListener('click',function () {
            display.value += this.textContent;
        });
    }
}

// Restriction keyboard to only numbers
function onlyNum(e) {
    let getKey = e.key;
    if(!isNaN(Number(getKey)) || (getKey === '.' && !String(display.value).includes('.'))) {
        return true;
    } else {
        return false;
    }
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
    let result = 1;
    for(let i = 1; i <= exponent; i++) {
        result *= value;
    }
    return result;
}

// Assigning the first operand. Also used to chain operations if the previous operator is not empty.
function assigningFirstOperand() {
    if(operator === '') {     
        operand1 = Number(display.value); 
        display.value = '';
    } else {
        operand2 = Number(display.value);
        display.value = '',
        operand1 = operation(operand1, operator, operand2);
    }
}

// Displaying result 
resultBtn.addEventListener('click', function () {
    operand2 = Number(display.value);
    display.value = operation(operand1, operator, operand2);
    topDisplay.textContent = `${operand1} ${operator} ${operand2}`;
    console.log(operand1);
    console.log(operand2);
    operator = '';
});

// Delete Last Character
deleteBtn.addEventListener('click', function () {
    display.value = String(display.value).slice(0,-1);
});

// displayZeroIfEmptyField();
assigningFirstOperand();
selectOperator();
displayNum();       