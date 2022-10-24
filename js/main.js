// Initialize Game Board on Load
initBoard()
initCatRow()

function initCatRow(){
    let catRow = document.getElementById('category-row')
    
    for (let k=0; k<6; k++){
        let box= document.createElement('div')
        box.className= 'clue-box category-box'
        catRow.appendChild(box)
       
    }
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
    return Math.floor(Math.random() * (18418) + 1)
}
let catArray= []
function buildCategoriesRow(){
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



    allQuestions.then((response)=>{console.log(response)
        catArray= response})
}

function getClue(){
    console.log('Time for a clue!')
}