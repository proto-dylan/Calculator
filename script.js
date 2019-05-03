const screen = document.querySelector('.screen');
const digits = document.querySelectorAll('.digit');
const clrBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.del');
const equalBtn = document.querySelector('.equal');
const operators = document.querySelectorAll('.operator');

let currentOutput = 0;
let op = 0; 
let num1 = null;
let num2 = null;
let operator;
let lastKey;
let solution = 0;


operators.forEach(button => button.addEventListener("click", operate));
digits.forEach(button => button.addEventListener("click", digitClick));
clrBtn.addEventListener("click", clr);
delBtn.addEventListener("click", del);
equalBtn.addEventListener("click", equal);
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key="${e.key}"]`);     //keyboard support
    if(!key) return;
    key.click();
})

function digitClick(){
    solution = 0;
    let clickedDigit = this.id;
    console.log(clickedDigit);
    if(currentOutput == '0'|| op == 1 && lastKey!=="dig"){              //check if last click was and operand, or initial '0'
        console.log('case');
        if(clickedDigit == '.'){                     
            currentOutput = '0.';
        }else{                                               //make sure a new dec has a '0' in front
            currentOutput = clickedDigit;
        }
    }else{
        if(clickedDigit == '.'){
            if(!currentOutput.includes('.')){
                currentOutput += clickedDigit;               //make sure there isn't a dec already
            }
        }else{
            currentOutput += clickedDigit;
        }
    }
    screen.textContent = currentOutput; 
    lastKey = "dig";                                          
}

function operate(){              
    if(lastKey !== "op"){                                    //lastKey makes sure two operands aren't back-to-back
        if(op!==1){
            num1 = screen.textContent;
            let clickedOp = this.textContent;
            operator= clickedOp;
            lastKey = "op";
            op = 1;   
        }else{
            num2 = screen.textContent;
            screen.textContent = calculate(operator, num1, num2);          //runs calculate() if there are operands waiting to be applied
            num1 = screen.textContent;
            let clickedOp = this.textContent;
            operator= clickedOp;
            lastKey = "op";
        }
    }
}
function calculate(operator, num1, num2){
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);

    if (operator === '+') {
        result = n1 + n2
    } else if (operator === '-') {
        result = n1 - n2
    } else if (operator === '*') {
        result = n1 * n2
    } else if (operator === '/') {
        result = n1 / n2
    }
    
    result = result.toFixed(2)*1;                                 // truncate to 2 decimals, then * 1 to remove trailing 0's
    return result;
    
}
function equal(){
    num2 = screen.textContent;                                     
    calculate(operator, num1, num2);
    screen.textContent = result;
    solution = 1;
}
function clr(){
    num1 = 0;
    num2 = 0;
    op = 0;
    operator = null;
    currentOutput = 0;
    screen.textContent = '0';
}

function del(){
    if(solution !== 1){
        if(currentOutput.length == 1){
            currentOutput = '0';
        }else{
            currentOutput = currentOutput.slice(0, -1);
        }
        screen.textContent = currentOutput;  
    } 
}
