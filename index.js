document.addEventListener("DOMContentLoaded", (event) => {

    const monsterContainer = document.querySelector('#monster-container')
    const forward = document.querySelector('#forward')
    const form = document.querySelector('#create-monster')
    const back = document.querySelector('#back')
    let limit = 50
    let page = 1

    // adds the monsters from the JSON API TO POPULATE ON THE SCREEN

    const monsterGrab = (limit, page) => {
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then((response) => response.json())
        .then((parsedJSON) => {
            for(monster of parsedJSON){
                monsterContainer.innerHTML += `<div id ='${monster.id}'>
                <h3> ${monster.id}. ${monster.name}</h3>
                <p>${monster.age}</p>
                <p>${monster.description}</p>
                </div>
                `
            }
        })    
    }

    //UPLOAD THE FIRST 50 AUTOMATICALLY
    monsterGrab(limit, page)

    form.innerHTML += `<form action = 'index.html' method='post'>
                            <label> Name:</label>
                            <input type = "text" name="name">
                            <label> age:</label>
                            <input type = "number" name="age">
                            <label> description:</label>
                            <input type = "textarea" name="description">
                            <input type="submit" value="Submit">
                        </form>
    
    `

    document.addEventListener('click', (event) => {
        // Forward Button
        if (event.target === forward){
            page++
            monsterGrab(limit, page)
        }

        // Back Button
        if(event.target === back){
            monsterContainer.innerHTML = ''
            page--
            for (let i = 1; i <= page; i++){
                monsterGrab(limit, i)
            }     
        }
    })

    document.addEventListener('submit', (event) => {
        event.preventDefault()

        let name = event.target.name.value
        let description = event.target.description.value
        let age = event.target.age.value

        fetch("http://localhost:3000/monsters", {
            method: "POST",
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
        .then(r => r.json())
        .then((monster) => 
        monsterContainer.innerHTML += `<div id ='${monster.id}'>
        <h3> ${monster.id}. ${monster.name}</h3>
        <p>${monster.age}</p>
        <p>${monster.description}</p>
        </div>
        `)
    })


    
})
