let tempValue = 0;
let display = "0";
let previousOperator;

const screen = document.querySelector('.screen')

function buttonClick(value) {
    if (isNaN(value)) {
        executeSymbol(value);
    } else {
        executeNumber(value);
    }
    screen.innerText = display;
}

function executeSymbol(symbol) {
    switch (symbol) {
        case "C":
            display = '0';
            tempValue = 0;
            break;
        case "←":
            if (display.length === 1) {
                display = '0';
            } else {
                display = display.slice(0,display.length-1);
            }
            break;
        case "=":
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(display));
            previousOperator = null;
            display = tempValue;
            tempValue = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol)
            break;
    }
}

function handleMath(symbol) {
    if (display === '0') {
        return;
    }

    const intDisplay = parseInt(display);

    if (tempValue === 0) {
        tempValue = intDisplay;
    } else {
        flushOperation(intDisplay)
    }
    previousOperator = symbol;
    display = '0';
}

function flushOperation(intDisplay) {
    if (previousOperator === '+') {
        tempValue += intDisplay;
    } else if (previousOperator === '-') {
        tempValue -= intDisplay;
    } else if (previousOperator === '*') {
        tempValue *= intDisplay;
    } else if (previousOperator === '/') {
        tempValue /= intDisplay;
    }
}

function executeNumber(numberString) {
    if (display === "0") {
        display = numberString;
    } else {
        display += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init();