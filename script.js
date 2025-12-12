let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandElement.textContent = previousOperand + ' ' + operation;
    } else {
        previousOperandElement.textContent = previousOperand;
    }
}

function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }
    
    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
        calculate();
    }
    
    operation = operator;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
}
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (event.key === '+') {
        appendOperator('+');
    } else if (event.key === '-') {
        appendOperator('-');
    } else if (event.key === '*') {
        appendOperator('×');
    } else if (event.key === '/') {
        event.preventDefault();
        appendOperator('÷');
    } else if (event.key === '%') {
        appendOperator('%');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteNumber();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});