const expressionElem = document.getElementById('expression');
const resultElem = document.getElementById('result');
const displayableButtons = document.getElementsByName('displayable-button');
const operatorButtons = document.getElementsByName('operator-button');
const acButton = document.getElementById('allclear');
const cButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const pointButton = document.getElementById('point');
const pourcentButton = document.getElementById('pourcent');
let firstOperand,secondOperand,theOperator;

function countDecimals(decimal){
   // First convert to number to check if whole
   let num = parseFloat(decimal);
   if(Number.isInteger(num) === true){ return 0 }
   // Convert back to string and check for "1e-8" numbers
   let text = num.toString();
   if(text.indexOf('e-') > -1){
      let [base, trail] = text.split('e-');
      let deg = parseInt(trail, 10);
      return deg;
   }
   else{
      let index = text.indexOf(".");
      // Otherwise use simple string function to count
      return text.length - index - 1;
   }
}

const hasPourcent = (array) => {
   const hasPourcent = ['%'].some(item => array.includes(item));
   if(hasPourcent){ 
      array.pop();
      return (+(array.join('')) * 0.01).toString();
   }
   else return array.join('');
}

const sum = (x,y) => {
   let res = (+x)+(+y);
   if(res % 1 != 0){
      return res.toFixed(countDecimals(res));
   }  
   else return res;
}
const subtract = (x,y) => {
   let res = (+x)-(+y);
   if(res % 1 != 0){
      return res.toFixed(countDecimals(res));
   }  
   else return res;
}

const multiply = (x,y) => {
   let res = (+x)*(+y);
   if(res % 1 != 0){
      return res.toFixed(countDecimals(res));
   }  
   else return res;
}

const divide = (x,y) => {
   let res = (+x)/(+y);
   if(res % 1 != 0){
      return res.toFixed(countDecimals(res));
   }  
   else return res;
}

const operate = (operator,x,y) => {
   switch (operator) {
      case '+':
        return sum(x,y);
      case '-':
         return subtract(x,y);
      case '*':
         return multiply(x,y);
      case '/':
         if(y === '0'){
            expressionElem.textContent = 'お前はもう死んでいる';
            resultElem.textContent = 'Omae Wa Mou Shindeiru';
            return 'nani?!'
         }
         else return divide(x,y); 
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
      firstOperand = hasPourcent(arrayFirstOperand);

      // Check if there's a second operand
      index += 1;
      if(arrayExpression.length === index){
         resultElem.textContent = firstOperand+operator;
         return;
      }

      // Get the displayed second operand
      const arraySecondOperand = arrayExpression.slice(index);
      secondOperand = hasPourcent(arraySecondOperand);

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
   const checkForOperator = ['+','-','*','/'];
   const arrayExpression = expression.split('');
   // check if the expression has an operator in it
   const hasSome = checkForOperator.some(item => arrayExpression.includes(item));

   //true => operate()
   if(hasSome){
      // Get the displayed operator
      theOperator = checkForOperator.find(item => arrayExpression.includes(item));
      let index = arrayExpression.indexOf(theOperator);

      // Get the displayed first operand
      const arrayFirstOperand = arrayExpression.slice(0,index);

      firstOperand = hasPourcent(arrayFirstOperand);

      // Get the displayed second operand
      index += 1;
      const arraySecondOperand = arrayExpression.slice(index);

      secondOperand = hasPourcent(arraySecondOperand);

      result = operate(theOperator,firstOperand,secondOperand);

      if(result === 'nani?!'){return}
      
      displayExpression(resultElem.textContent);
      resultElem.textContent = result;
   }
      //true => operate with one operand only
      else{
         firstOperand = hasPourcent(arrayExpression);
         let result = operate('+',firstOperand,'0');
         resultElem.textContent = result;
      }
}

displayableButtons.forEach(button => button.addEventListener('click',() => {
   displayResult(button.textContent);
   if(button.id === 'point'){
      // disable .button, =button, operator buttons
      pointButton.setAttribute("disabled", "disabled");
      equalButton.setAttribute("disabled", "disabled");
      operatorButtons.forEach(button => button.setAttribute("disabled", "disabled"));
   }
   else{
      // enable =button, operator buttons
      equalButton.removeAttribute("disabled");
      operatorButtons.forEach(button => button.removeAttribute("disabled"));
   }
   // enable %button
   pourcentButton.removeAttribute("disabled");
}));

operatorButtons.forEach(button => button.addEventListener('click',() => {
   checkOperatorToOperate(button.textContent);
   // enable .button, numpad buttons
   pointButton.removeAttribute("disabled");
   displayableButtons.forEach(button => button.removeAttribute("disabled"));
}));

acButton.addEventListener('click',() => {
   clearAll();
   // enable .button, disable operator buttons
   pointButton.removeAttribute("disabled");
   operatorButtons.forEach(button => button.removeAttribute("disabled"));
   displayableButtons.forEach(button => button.removeAttribute("disabled"));
});

cButton.addEventListener('click',() => {
   clearOne();
   // enable .button
   pointButton.removeAttribute("disabled");
   displayableButtons.forEach(button => button.removeAttribute("disabled"));
});

equalButton.addEventListener('click',() => {
   checkExpressionToOperate();
   // enable .button
   pointButton.removeAttribute("disabled");
});

pourcentButton.addEventListener('click',() => {
   displayResult(pourcentButton.textContent);
   // Disable %button, .button, numpad buttons
   pourcentButton.setAttribute("disabled", "disabled");
   pointButton.setAttribute("disabled", "disabled");
   displayableButtons.forEach(button => button.setAttribute("disabled", "disabled"));
});