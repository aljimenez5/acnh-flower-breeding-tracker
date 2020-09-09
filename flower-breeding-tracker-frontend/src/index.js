const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`





// ;
// fetch(`${BACKEND_URL}/test`)
//     .then(response => response.json())
//     .then(parsedResponse => console.log(parsedResponse));
document.addEventListener('DOMContentLoaded', () => {
    getAllFlowers()

}
)

function getAllFlowers() {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.forEach( obj => createFlowerCard(obj.attributes)))
}

function createDiv(name, className){
    const newDiv = document.createElement("div")
    newDiv.id = name
    newDiv.className = className
    return newDiv
}

function createFlowerCard(obj) {
    const flowersDiv = document.getElementById("flowers")
    const newFlowerCard = createDiv(`${obj.name}-${obj.color}`, "flower-card")
    const text = (`${obj.name}`)
    const image = document.createElement("img")
    image.src = `./assets/images/${obj.image_url}`
    image.height = 75
    image.width = 75
    newFlowerCard.textContent = text
    newFlowerCard.appendChild(image)
    flowersDiv.appendChild(newFlowerCard)
}

