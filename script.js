const expressionElem = document.getElementById('expression');
const resultElem = document.getElementById('result');
const displayableButtons = document.querySelectorAll('.displayable');
const operatorButtons = document.getElementsByName('operators');
const acButton = document.getElementById('clear');
const cButton = document.getElementById('sign');
const equalButton = document.getElementById('equal');
let firstOperand,secondOperand,theOperator;

const sum = (x,y) => (+x)+(+y);

const subtract = (x,y) => (+x)-(+y);

const multiply = (x,y) => (+x)*(+y);

const divide = (x,y) => (+x)/(+y);

const operate = (operator,x,y) => {
   switch (operator) {
      case '+':
        return sum(x,y);
      case '-':
         return subtract(x,y);
      case '*':
         return multiply(x,y);
      case '*':
         return sum(x,y);
      case '/':
         return divide(x,y); 
      default:
        console.console.log(('ERROR'));
        break;
    }  
}

const displayExpression = (string) => expressionElem.textContent = string;

const displayResult = (string) => {

   if(+string === +string && resultElem.textContent === '0'){ 
      resultElem.textContent = string;
      return
   }
   resultElem.textContent += string;
}

const clearAll = () => {
   expressionElem.textContent = '';
   resultElem.textContent = '0';
}

const clearOne = () => {
   resultElem.textContent = (resultElem.textContent).slice(0, -1);
   if(resultElem.textContent === ''){ resultElem.textContent = '0'; }
}

function checkOperatorToOperate(operator){
   const expression = resultElem.textContent;
   const checkFor = ['+','-','*','/'];
   const arrayExpression = expression.split('');
   // check if the expression has an operator in it
   const hasSome = checkFor.some(item => arrayExpression.includes(item));

   //true => operate()
   if(hasSome){
      // Get the displayed operator
      theOperator = checkFor.find(item => arrayExpression.includes(item));
      let index = arrayExpression.indexOf(theOperator);

      // Get the displayed first operand
      const arrayFirstOperand = arrayExpression.slice(0,index);
      firstOperand = arrayFirstOperand.join('');

      // Get the displayed second operand
      index += 1;
      const arraySecondOperand = arrayExpression.slice(index);
      secondOperand = arraySecondOperand.join('');

      displayExpression(resultElem.textContent);

      let result = operate(theOperator,firstOperand,secondOperand);
      resultElem.textContent = result;

      displayResult(operator);
   }
   //false => display pressed operator
   else{
      displayResult(operator);
   }
}

function checkExpressionToOperate(){
   const expression = resultElem.textContent;
   const checkFor = ['+','-','*','/'];
   const arrayExpression = expression.split('');
   // check if the expression has an operator in it
   const hasSome = checkFor.some(item => arrayExpression.includes(item));

   //true => operate()
   if(hasSome){
      // Get the displayed operator
      theOperator = checkFor.find(item => arrayExpression.includes(item));
      let index = arrayExpression.indexOf(theOperator);

      // Get the displayed first operand
      const arrayFirstOperand = arrayExpression.slice(0,index);
      firstOperand = arrayFirstOperand.join('');

      // Get the displayed second operand
      index += 1;
      const arraySecondOperand = arrayExpression.slice(index);
      secondOperand = arraySecondOperand.join('');

      displayExpression(resultElem.textContent);

      let result = operate(theOperator,firstOperand,secondOperand);
      resultElem.textContent = result;
   }
   return
}

displayableButtons.forEach(button => button.addEventListener('click',() => displayResult(button.textContent)));

operatorButtons.forEach(button => button.addEventListener('click',() => checkOperatorToOperate(button.textContent)));

acButton.addEventListener('click',() => clearAll());

cButton.addEventListener('click',() => clearOne());

equalButton.addEventListener('click',() => checkExpressionToOperate());