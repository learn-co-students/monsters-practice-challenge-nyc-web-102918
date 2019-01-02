document.addEventListener("DOMContentLoaded", (event) => {

    const monsterContainer = document.querySelector('#monster-container')
    const forward = document.querySelector('#forward')
    const back = document.querySelector('#back')
    const form = document.querySelector('#create-monster')
    let limit = 50
    let page = 1

    const fetchMonsters = (limit, page) => {
      fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
      .then(res => res.json())
      .then((data) => {
        for(monster of data) {
          monsterContainer.innerHTML += `
          <div id= '${monster.id}'>
          <h3> ${monster.id}. ${monster.name}</h3>
          <p>${monster.age}</p>
          <p>${monster.description}</p>
          </div>`
        }
      })
    }

    fetchMonsters(limit, page)

    form.innerHTML += `<form action = 'index.html' method='post'>
                             <input type = "text" name="name" placeholder="name">
                             <input type = "number" name="age" placeholder="age">
                             <input type = "textarea" name="description" placeholder="description">
                             <input type="submit" value="Submit">
                         </form>
                         `
    document.addEventListener('click', (e) => {
        if (e.target === forward){
            page++
            fetchMonsters(limit, page)
        }

        if(e.target === back){
            monsterContainer.innerHTML = ''
            page--
            for (let i = 1; i <= page; i++){
                fetchMonsters(limit, i)
            }
        }
    })
    document.addEventListener('submit', (e) => {
      e.preventDefault()

      let name = e.target.name.value
      let description = e.target.description.value
      let age = e.target.age.value

      fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers:{
                 "Content-Type": "application/json",
                 "Accept": "application/json"
               },
        body: JSON.stringify({
            name: name,
            description: description,
            age: age
        })
      })
      .then(res => res.json())
      .then((monster) => monsterContainer.innerHTML += `
        <div id ='${monster.id}'>
         <h3> ${monster.id}. ${monster.name}</h3>
         <p>${monster.age}</p>
         <p>${monster.description}</p>
         </div>
         `)
    })
})
