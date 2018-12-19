let pageNumber = 1
let allMonsters = []
const monsterContainer = document.getElementById("monster-container")
const createMonster = document.getElementById("create-monster")

// Add new monster form
createMonster.innerHTML = `
  <form id="create-monster-form">
    <input id="name" placeholder="name"> </input>
    <input id="age" placeholder="age"> </input>
    <input id="bio" placeholder="bio"> </input>
    <button id="add-monster-button"> Add Monster </button>
  </form>
`
// ////////////////////

function showMonster(monster) {
    monsterContainer.innerHTML += `
      <div id="monster-${monster.id}">
        <h2> ${monster.name} </h2>
        <h4> Age: ${monster.age} </h4>
        <p> Bio: ${monster.description} </p>
      </div>
    `
}

function retrieveFiftyMonsters(pageNumber) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then( result => result.json())
    .then( parsedResult => {
      allMonsters = parsedResult
      allMonsters.forEach( monster => showMonster(monster))
      console.log(pageNumber)
      // return ++pageNumbers
    })
}

retrieveFiftyMonsters(pageNumber)

document.body.addEventListener("click", event => {
  if (event.target.id === "add-monster-button") {
    event.preventDefault()

    const monster = {}
    monster.name = document.getElementById("name").value
    monster.age = document.getElementById("age").value
    monster.description = document.getElementById("bio").value

    document.getElementById("create-monster-form").reset()

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(monster)
    }).then( result => result.json() )
    .then( parsedResult => showMonster(parsedResult) )
  }
  else if (event.target.id === "forward") {
    retrieveFiftyMonsters(++pageNumber)
  }
})
