const expressionElem = document.getElementById('expression');
const resultElem = document.getElementById('result');
const displayableButtons = document.querySelectorAll('.displayable');
const operatorButtons = document.getElementsByName('operators');
const acButton = document.getElementById('clear');
const cButton = document.getElementById('sign');
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

const displayExpression = (expression) => {
   if(resultElem.textContent === '0'){ 
      resultElem.textContent = expression;
      return
   }
   resultElem.textContent += expression;
}

const clearAll = () => {
   expressionElem.textContent = '';
   resultElem.textContent = '0';
}

const clearOne = () => {
   resultElem.textContent = (resultElem.textContent).slice(0, -1);
   if(resultElem.textContent === ''){ resultElem.textContent = '0'; }
}

function getTerms(){
   let expression = resultElem.textContent.split('');
   expression = expression.filter(entry => entry.trim() != '');
   operator = expression.pop();
   operand1 = expression.join('');
   return {operator,operand1};
   /*
   console.log('operand: '+operand1);
   console.log('operator: '+operator);
   */
}

displayableButtons.forEach(button => button.addEventListener('click',() => displayExpression(button.textContent)));

operatorButtons.forEach(button => button.addEventListener('click',() => getTerms()));

acButton.addEventListener('click',() => clearAll());

cButton.addEventListener('click',() => clearOne());

equalButton.addEventListener('click',() => getTerms());