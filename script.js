const displayExpression = document.querySelector('.expression');
const displayResult = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const allClearButton = document.getElementById('#clear');
const signButton = document.getElementById('#sign');
const equalButton = document.getElementById('#equal');

const display = (content) => displayExpression.textContent += ' '+content+' ';
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
const allClear = () => {
   displayExpression.textContent = null;
   displayResult.textContent = null;
}

buttons.forEach(button => button.addEventListener('click',() => {
   let content = button.textContent;
   display(content);
}));

