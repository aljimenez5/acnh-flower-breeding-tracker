const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`


document.addEventListener('DOMContentLoaded', () => {

    
    getWhiteFlowers()
    

})

let getFlowersByType = function(event, flowerType, status="allCards") {
    console.log(event)
    console.log(event.target)
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.name === flowerType && obj.attributes.color !== "White")).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj.attributes, status)))

    event.target.addEventListener("click", function (e) { removeFlowerDiv(e, flowerType) }, { once: true })
}

let getWhiteFlowers = function(status="onlyWhiteCards") {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.color === "White")).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj.attributes, status)))

}

let createDiv = function(name, className=name){
    const newDiv = document.createElement("div")
    newDiv.id = name
    newDiv.className = className
    return newDiv
}

let createFlowerCard = function(obj, status) {
    let newFlowerCard
    if (status === "onlyWhiteCards") {
        newFlowerCard = createDiv(`main-${obj.name}-card`, "main-flower-card")
        let text = (`${obj.name}`)
        newFlowerCard.textContent = text
    }

    else {
        newFlowerCard = createDiv(`${obj.name} ${obj.color}`, "flower-card")
    }
    
    let image = document.createElement("img")
    image.src = `./assets/images/${obj.image_url}`
    image.height = 100
    image.width = 100
    
    newFlowerCard.appendChild(image)

    addFlowerToHeader(obj, newFlowerCard, status)
    
}


let addFlowerToHeader = function (obj, card, status) {
    let flowerSelectionHeader = document.getElementById("flower-selection")
    if (status === "onlyWhiteCards") {
        let expand = createDiv("button-container")
        let btn = document.createElement('button')
        btn.className = "open-close-button"


        expand.addEventListener("click", function(event){getFlowersByType(event, obj.name)}, {once: true})

        flowerSelectionHeader.appendChild(card).appendChild(expand).appendChild(btn)
    }
    else {
        let mainFlowerDiv = document.getElementById(`main-${obj.name}-card`)
        let flowerSpecificDiv = document.getElementById(`${obj.name}`)
        if (flowerSpecificDiv === null) {
            flowerSpecificDiv = createDiv(obj.name, "all-colors")
        }

        flowerSpecificDiv.appendChild(card)
        mainFlowerDiv.appendChild(flowerSpecificDiv)
    }


}

let removeFlowerDiv = function (event, flower) {
    let flowerDiv = document.getElementById(flower)
    flowerDiv.remove()
    event.target.addEventListener("click", function(e){
        getFlowersByType(e, flower)
    }, {once: true})
}

