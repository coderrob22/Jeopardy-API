// Initialize Game Board on Load
initBoard()
initCatRow()
document.querySelector('button').addEventListener('click', buildCategoriesRow)

function initCatRow(){
    let catRow = document.getElementById('category-row')
    
    for (let k=0; k<6; k++){
        let box= document.createElement('div')
        box.className= 'clue-box category-box'
        catRow.appendChild(box)
       
    }
}
function getClue(){
    console.log('Time for a clue!')
}


function initBoard(){
    let board = document.getElementById('clue-board')

    //Generate 5 rows, then place 6 boxes in each row
   for (let i = 0; i < 5; i++){
        let row = document.createElement('div')
        let boxValue = 200 * (i+1)
        row.className = 'clue-row'

        for (let j=0; j<6; j++){
            let box= document.createElement('div')
            box.className= 'clue-box'
            box.textContent= '$' + boxValue

            //box.appendChild(document.createTextNode(boxValue)) Backwards Compatible
            box.addEventListener('click', getClue, false)
            row.appendChild(box)
        }
        board.appendChild(row)
}
}
//Declare Random Integer
function randInt(){
    return Math.floor(Math.random() * (20418) + 1)
}

//FETCH responses from API
let catArray= []
function buildCategoriesRow(){

    if (!(document.getElementById('category-row').firstChild.innerText== '')){
        resetBoard()
    }

    const fetchRequest1 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());

     const fetchRequest2= fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());

    const fetchRequest3= fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());

    const fetchRequest4= fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());
    
    const fetchRequest5= fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());
    
    const fetchRequest6= fetch(
        `https://jservice.io/api/category?&id=${randInt()}`)
        .then((response)=>response.json());
        
        const allQuestions= Promise.all([fetchRequest1,fetchRequest2,fetchRequest3,fetchRequest4,fetchRequest5,fetchRequest6])



    allQuestions.then((response)=>
    {console.log(response)
        catArray= response
        setCategories(catArray)
    })
}

//Use API to set Category Titles
function setCategories(catArray){
    let element = document.getElementById('category-row')
        let children= element.children;
        for (let x=0; x<children.length; x++){
            children[x].innerHTML=catArray[x].title
        }
}

//Pinpoint which box was clicked!
function getClue (event){
    let child=event.currentTarget
    console.log(child)
    child.classList.add('clicked-box')
    let boxValue=child.innerHTML.slice(1)
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c ===child)
    let cluesList = catArray[index].clues
    let clue= cluesList.find(obj =>{
        return obj.value == boxValue
    })
    showQuestion(clue, child, boxValue)
}
// SHOW the quesiton and get player's answer
function showQuestion(clue, target, boxValue){
    let userAnswer = prompt(clue.question).toLowerCase()
    let answer = clue.answer.toLowerCase().replace(/<\/?[^>]+(>\$)/g, "")
    let possiblePoints= +(boxValue)
    target.innerHTML=clue.answer
    target.removeEventListener('click', getClue, false)
    evaluateAnswer(userAnswer, answer, possiblePoints)
}

//Evaluate Correct Answer!
function evaluateAnswer(userAnswer, answer, possiblePoints){
    let checkAnswer =(userAnswer==answer)? 'correct' : 'incorrect'
    let confirmAnswer= 
    confirm(`For $${possiblePoints}, you answered "${userAnswer}". The correct answer was "${answer}. Your answer appears to be $${checkAnswer}. Click OK to accept or click Cancel if th eanswer was not properly evaluated. `)
    awardPoints(checkAnswer, confirmAnswer, possiblePoints)
}

//Award Points
function awardPoints(checkAnswer, confirmAnswer, possiblePoints){
    if (!(checkAnswer=='incorrect' && confirmAnswer == true)){
        let target= document.getElementById('score')
        let currentScore= +(target.innerText)
        currentScore += possiblePoints
        target.innerText = currentScore
    }else{
        alert(`No points given.`)
    }
}
// Reset Board IF NEEDED
function resetBoard(){
    let clueParent = document.getElementById('clue-board')
    while (clueParent.firstChild){
        clueParent.removeChild(clueParent.firstChild)
    }
    let catParent= document.getElementById('category-row')
    while (catParent.firstChild){
        catParent.removeChild(catParent.firstChild)
    }
    document.getElementById('score').innerText= 0
    initBoard()
    initCatRow()
}
