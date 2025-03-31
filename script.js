const display = document.querySelector(".display");
const displayContent = document.createElement("p");
display.appendChild(displayContent); 
buttons = document.querySelectorAll("button");
let operations = [];

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        handleButtonClick(button.id);
    });
});

let equalN = false;
function handleButtonClick(id) {
    const operators = ["+", "-", "*", "/"];
    

    if (id === "AC") {
        operations.length = 0;
        displayContent.textContent = "";
    } else if (id === "equal") {
        let anwser = operate(operations[1], parseFloat(operations[0]), parseFloat(operations[2]));
        operations.splice(0,2);
        operations[0] = anwser;
        displayContent.textContent = operations.join(' ');
        equalN = true;
    } else if (operators.includes(id)) {
        if (!operators.includes(operations[operations.length - 1])) {
            operations.push(id);
            displayContent.textContent = operations.join(' ');
            equalN = false;
        }
    } else if (id === "decimal") {
        if (!operations[operations.length - 1].includes(".")) {
            operations[operations.length - 1] += ".";
            displayContent.textContent = operations.join(' ');
            equalN = false;
        }
    } else {
        if (equalN) {
            operations.length = 0;
            operations.push(id)
            displayContent.textContent = operations.join(' ');
            equalN = false;
        } else if (operations[0] === undefined || 
            isNaN(parseInt(operations[operations.length - 1]))){
            operations.push(id)
            displayContent.textContent = operations.join(' ');
        } else {
            operations[operations.length - 1] += id;
            displayContent.textContent = operations.join(' ');
                    
        }        
    }        
    }

function operate(operation, num1, num2) {
    return (operation === "+" ? add(num1, num2) :
    operation === "-" ? subtract(num1, num2) :
    operation === "*" ? multiply(num1, num2) : 
    divide(num1, num2));
}

function add(x, y) {
    return Math.round((x + y) * 100) / 100;
}

function subtract(x, y) {
    return Math.round((x - y) * 100) / 100;
}

function multiply(x, y) {
    return Math.round((x * y) * 100) / 100;
}

function divide(x, y) {
    if (y == 0) {
        return "WHY WOULD U DO THAT!"
    }
    return Math.round((x / y) * 100) / 100;
}