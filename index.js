document.addEventListener('DOMContentLoaded',function(){

let monsterContainer = document.querySelector('#monster-container')
let form = document.querySelector('#create-monster')
let localData = ""
const url = 'http://localhost:3000/monsters'
let forwardButton = document.querySelector('#forward')
let backButton = document.querySelector('#back')


fetch(url + '/?_limit=50&_page=1')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    // console.log(data)
    localData = data
    localData.forEach(function(monster){
      // console.log(monster.name)
      // console.log(monster.age)
      // console.log(monster.description)
      // console.log(monster.id)

    monsterContainer.innerHTML += `<div id=${monster.id}>
                                   <h1>${monster.name}</h1>
                                   <p>Age: ${monster.age}</p>
                                   <p>Description: ${monster.description}</p>
                                   </div>`
    })
  })

form.innerHTML +=       `<form action = 'index.html' method='post'>
                         <label> Name:</label>
                         <input type = "text" name="name">
                         <label> age:</label>
                         <input type = "number" name="age">
                         <label> description:</label>
                         <input type = "textarea" name="description">
                         <input type="submit" value="Create Monster">
                         </form>`

  form.addEventListener('submit', function(event){
    event.preventDefault()

    let name = event.target.name.value
    let age = event.target.age.value
    let description = event.target.description.value

    fetch(url, {
      method:'POST',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data) {
      console.log(data)
      monsterContainer.innerHTML += `<div>
                                     <h1>${data.name}</h1>
                                     <p>Age: ${data.age}</p>
                                     <p>Description: ${data.description}</p>
                                     </div>`
    })

  })
  let counter = 1
  document.addEventListener('click', function(event){
    console.log(counter)
    monsterContainer.innerHTML = ""
    if (event.target === forwardButton){
      counter += 1
      console.log('forward clicked', counter)
      fetch(`${url}/?_limit=50&_page=${counter}`)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        data.forEach(function(monster){
          monsterContainer.innerHTML += `<div id=${monster.id}>
                                         <h1>${monster.name}</h1>
                                         <p>Age: ${monster.age}</p>
                                         <p>Description: ${monster.description}</p>
                                         </div>`
        })
      })

    }
    if (event.target === backButton){
      counter -= 1
      console.log('back clicked')
      fetch(`${url}/?_limit=50&_page=${counter}`)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        data.forEach(function(monster){
          monsterContainer.innerHTML += `<div id=${monster.id}>
                                         <h1>${monster.name}</h1>
                                         <p>Age: ${monster.age}</p>
                                         <p>Description: ${monster.description}</p>
                                         </div>`

        })
      })
    }

  })







}) //end of dom content loaded
