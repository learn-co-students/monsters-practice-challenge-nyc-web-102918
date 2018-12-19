document.addEventListener('DOMContentLoaded', () => {

  let allMonsters = []
  let limit = 50
  let page = 1
  const backButton = document.querySelector('#back')
  const forwardButton = document.querySelector('#forward')
  const newMonsterForm = document.querySelector('.monster-form')
  const monsters = document.querySelector('#monster-container')

  function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      allMonsters = data
      showAllMonsters(data)
    })
  }

  function showAllMonsters(monster) {

    monster.forEach((el) => {
      monsters.innerHTML += renderSingleMonster(el)
    })
  }

  //back and forward buttons
  document.addEventListener('click', (e) => {
    if (e.target === forwardButton) {
      page++
      fetchMonsters(limit, page)
    }
    if (e.target === backButton) {
      monsters.innerHTML = ''
      page--
      console.log(page)
      fetchMonsters(limit,page)
    }
  })


   newMonsterForm.addEventListener('submit', (e) => {
     e.preventDefault()
     const newMonsterName = document.querySelector('#new-monster-name').value
     const newMonsterAge = document.querySelector('#new-monster-age').value
     const newMonsterDescription = document.querySelector('#new-monster-description').value

		fetch("http://localhost:3000/monsters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json", //type of data being sent
				"Accept": "application/json" //type of data I (the client) want back
			},
			body: JSON.stringify({
				name: newMonsterName,
				age: newMonsterAge,
        description: newMonsterDescription
			})
   })
   .then( r => (r.json())
    .then(newMonster => {
      allMonsters.push(newMonster)
      monsters.innerHTML += renderSingleMonster(newMonster)
    }))
 })

 function renderSingleMonster(monster) {
   return `
    <div id='monster-container'>
      <h1 class='center-text'>Name: ${monster.name}</h1>
        <p class='age' >Age: ${monster.age}</p>
        <p class='description'>Description: ${monster.description}</p>
    </div>
   `
 }

 fetchMonsters()
})
