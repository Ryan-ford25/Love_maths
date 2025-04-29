document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else{
                let gameType = this.getAttribute("data-type");
               runGame(gameType);
            }
        })
    }


    runGame("addition");
})


function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition"){
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(num1,num2);
    } else if (gameType === "subtract"){
        if (num1 > num2){
            displaySubtractQuestion(num1, num2);
        } else {
            displaySubtractQuestion(num2, num1);
        }
    }else {
        alert(`Unknown game type ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting`;
    }
}


function checkAnswer(){
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect =  userAnswer === calculatedAnswer[0];
    if (isCorrect){
        incrementScore();
    } else{
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x"){
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-"){
        if (operand1 > operand2){
            return [operand1 - operand2, "subtract"];
        } else{
            return [operand2 - operand1, "subtract"];
        }
    }else{
        alert(`Unmimplemented Operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting`;
    }
}

function incrementScore(){
    let current = parseInt(document.getElementById("score").innerText);
    let add = current+1;
    document.getElementById("score").innerHTML = add;
}

function incrementWrongAnswer(){
    let current = parseInt(document.getElementById("incorrect").innerText);
    let add = current+1;
    document.getElementById("incorrect").innerHTML = add;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(){

}