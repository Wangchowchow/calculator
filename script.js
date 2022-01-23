const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const backButton = document.getElementById('backBtn');
const pointButton = document.getElementById('pointBtn');
const secondaryScreen = document.getElementById('secondaryScreen');
const mainScreen = document.getElementById('mainScreen');

let firstNumber;
let secondNumber;
let calculation = null;
let needScreenReset = false;
let result = false;

clearButton.addEventListener('click', clear);
backButton.addEventListener('click', backspace);
pointButton.addEventListener('click', addPoint);
equalsButton.addEventListener('click', calculate);

numberButtons.forEach((button)=>
button.addEventListener('click',()=>getNumber(button.textContent)));

operatorButtons.forEach((button)=>
button.addEventListener('click', ()=>getOperator(button.textContent)));

function resetScreen(){
    mainScreen.textContent = '';
    needScreenReset = false;
}
function getNumber(number){
    if (result){
        resetScreen();
        result = false;
    }
    if (mainScreen.textContent ==='0' || needScreenReset){
        resetScreen();    
    }
    mainScreen.textContent += number;
    if (mainScreen.textContent ==='00'){
        mainScreen.textContent = '0';
    } 
}
function clear(){
    mainScreen.textContent = '0';
    secondaryScreen.textContent = '';
    firstNumber='';
    secondNumber='';
    calculation=null;
}
function backspace(){
    if (mainScreen.textContent.toString().length === 1){
        mainScreen.textContent = '0';
    }
    else{
        mainScreen.textContent = mainScreen.textContent.toString().slice(0,-1);
    }
}
function addPoint(){
    if (needScreenReset){
        resetScreen();
    }
    if (mainScreen.textContent === ''){
        mainScreen.textContent = '0';
    }
    if (mainScreen.textContent.includes('.')){
        return;
    }
    mainScreen.textContent += '.';
}
function getOperator(operator){
    if (calculation !== null){
        calculate();
    }
    firstNumber = mainScreen.textContent;
    calculation = operator;
    secondaryScreen.textContent = firstNumber + ' ' + calculation;
    needScreenReset = true;
}
function calculate(){
    if (calculation === '÷' && mainScreen.textContent === '0'){
        alert("No");
        return;
    }
    if (needScreenReset || calculation === null){
        return;
    }
    secondNumber = mainScreen.textContent
    mainScreen.textContent = roundResult(execute(firstNumber,calculation,secondNumber));
    secondaryScreen.textContent = firstNumber + ' ' +calculation+ ' ' +secondNumber+ ' =';
    calculation = null;
    result = true;
}
function roundResult(number){
    return Math.round(number*1000)/1000;
}
function add (a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function power(a,b){
    return Math.pow(a,b);
}
function execute(a,operator,b){
    a = Number(a);
    b = Number(b);
    if (operator === '+'){
        return add(a,b)
    }
    else if (operator === '-'){
        return substract(a,b)
    }
    else if (operator === '×'){
        return multiply(a,b)
    }
    else if (operator === '÷'){
        return divide(a,b)
    }
    else if (operator === '^'){
        return power(a,b)
    }
}
window.addEventListener('keydown', keyboard);
function keyboard(e){
    if (e.key >= 0 && e.key <=9) getNumber (e.key);
    if (e.key ==='.') addPoint ();
    if (e.key ==='=' || e.key ==='Enter') calculate;
    if (e.key ==='Backspace') backspace();
    if (e.key ==='Escape') clear();
    if (e.key ==='+' || e.key ==='-' || e.key ==='*' || e.key ==='/' || e.key ==='^')getOperator(convert(e.key));
}
function convert(keyboardInput){
    if (keyboardInput === '/') return '÷';
    if (keyboardInput === '*') return '×';
    if (keyboardInput === '-') return '-';
    if (keyboardInput === '+') return '+';
    if (keyboardInput === '^') return '^';
}