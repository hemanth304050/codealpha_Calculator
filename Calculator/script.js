document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            // Handle numbers and decimal point
            if (!isNaN(value) || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } 
            // Handle operators
            else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput === '' && firstOperand === '') return;
                if (firstOperand === '') {
                    firstOperand = currentInput;
                    currentInput = '';
                }
                operator = value;
            } 
            // Handle equals
            else if (value === '=') {
                if (firstOperand === '' || currentInput === '') return;
                display.value = calculate();
                firstOperand = '';
                operator = '';
                // Set currentInput to the result for chaining calculations
                currentInput = display.value; 
            } 
            // Handle All Clear (AC)
            else if (value === 'AC') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                display.value = '';
            } 
            // Handle Delete (DEL)
            else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            }
        });
    });

    function calculate() {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    // Reset on error
                    currentInput = '';
                    operator = '';
                    firstOperand = '';
                    return "Error"; 
                }
                result = num1 / num2;
                break;
            case '%': result = num1 % num2; break;
        }
        // Round to a reasonable number of decimal places
        return parseFloat(result.toFixed(10)).toString();
    }
    
    // Bonus: Keyboard Support
    document.addEventListener('keydown', (e) => {
        e.preventDefault(); // Prevents default browser actions
        const key = e.key;
        let buttonToClick;

        if ((key >= 0 && key <= 9) || key === '.') {
            buttonToClick = document.querySelector(`.btn[data-value="${key}"]`);
        } else if (['+', '-', '*', '/'].includes(key)) {
            buttonToClick = document.querySelector(`.btn[data-value="${key}"]`);
        } else if (key === 'Enter' || key === '=') {
            buttonToClick = document.querySelector('.btn[data-value="="]');
        } else if (key === 'Backspace') {
            buttonToClick = document.querySelector('.btn[data-value="DEL"]');
        } else if (key.toLowerCase() === 'c' || key === 'Escape') {
            buttonToClick = document.querySelector('.btn[data-value="AC"]');
        }

        if (buttonToClick) {
            buttonToClick.click();
        }
    });
});