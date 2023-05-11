const displayExpression = document.getElementById('expression');
const displayResult = document.getElementById('result');
const displayablebuttons = document.querySelectorAll('#displayable');
const allClearButton = document.getElementById('clear');
const clearButton = document.getElementById('sign');
const equalButton = document.getElementById('equal');

const sum = (x,y) => (x + y);
const subtract = (x,y) => (x - y);
const multiply = (x,y) => (x * y);
const divide = (x,y) => (x / y);
const operate = (operator,x,y) => {
   switch (operator) {
      case '+':
        sum(x,y);
        break;
      case '-':
         subtract(x,y);
        break;
      case '*':
         multiply(x,y);
        break;
      case '*':
         sum(x,y);
      break;
      case '/':
         divide(x,y);
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
const clear = () => {
   displayExpression.textContent = (displayExpression.textContent).slice(0, -2);
}

displayablebuttons.forEach(button => button.addEventListener('click',() => display(button.textContent)));

allClearButton.addEventListener('click',() => allClear());

clearButton.addEventListener('click',() => clear());