const displayExpression = document.getElementById('expression');
const displayResult = document.getElementById('result');
const displayableButtons = document.querySelectorAll('.displayable');
const operatorButtons = document.getElementsByName('operators');
const allClearButton = document.getElementById('clear');
const clearButton = document.getElementById('sign');
const equalButton = document.getElementById('equal');
let operand1,operand2,operator;

const sum = (x,y) => (x + y);
const subtract = (x,y) => (x - y);
const multiply = (x,y) => (x * y);
const divide = (x,y) => (x / y);
const operate = (operator,operand1,operand2) => {
   switch (operator) {
      case '+':
        sum(operand1,operand2);
        break;
      case '-':
         subtract(operand1,operand2);
        break;
      case '*':
         multiply(operand1,operand2);
        break;
      case '*':
         sum(operand1,operand2);
      break;
      case '/':
         divide(operand1,operand2);
         break; 
      default:
        console.console.log(('ERROR'));
        break;
    }  
}
const display = (content) => displayExpression.textContent += ' '+content;
const allClear = () => {
   displayExpression.textContent = '';
   displayResult.textContent = '';
}
const clear = () => displayExpression.textContent = (displayExpression.textContent).slice(0, -2);

function getTerms(){
   let expression = displayExpression.textContent.split('');
   expression = expression.filter(entry => entry.trim() != '');
   operator = expression.pop();
   operand1 = expression.join('');
   console.log('operand: '+operand1);
   console.log('operator: '+operator);
}

displayableButtons.forEach(button => button.addEventListener('click',() => display(button.textContent)));

operatorButtons.forEach(button => button.addEventListener('click',() => getTerms()));

allClearButton.addEventListener('click',() => allClear());

clearButton.addEventListener('click',() => clear());

equalButton.addEventListener('click',() => getTerms());