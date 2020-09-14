const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`



let getFlowersByType = function(event, flowerType, status="allCards") {
    
    let flowerDiv = document.getElementById("all-colors-selection")
    flowerDiv.innerHTML = ""

    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.name === flowerType)).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj, status)))

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

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.color === "White")).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj, status)))

}

let getFlower = function(flowerObj, squareObj, status="squareFlower") {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    if (flowerObj)
        {fetch(`${FLOWERS_URL}/${flowerObj.id}`, requestConfigs).then(response => response.json()).then(parsedResponse => createFlowerCard(parsedResponse.data, status, squareObj))}

    else {
        addEmptyPlotToSquare(squareObj)
    }
}

let getLandPlot = function(landObjID = 1) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${LANDS_URL}/${landObjID}`, requestConfigs).then(response => response.json()).then(parsedResponse => displayLandPlot(parsedResponse.data))
}

let getSquare = function(squareObj) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${SQUARES_URL}/${squareObj.id}`, requestConfigs).then(response => response.json()).then(parsedResponse => getFlower(parsedResponse.data.relationships.flower.data, parsedResponse.data))
}

let createDiv = function(name, className=name){
    const newDiv = document.createElement("div")
    newDiv.id = name
    newDiv.className = className
    return newDiv
}

let createImageElement = function(obj){
    let image = document.createElement("img")
    image.src = `./assets/images/${obj.image_url}`
    image.height = 100
    image.width = 100
    return image
}

let createFlowerCard = function(obj, status, otherObj= null) {
    let newFlowerCard
    let newObj = obj.attributes
    
    if (status === "onlyWhiteCards") {
        newFlowerCard = createDiv(`main-${newObj.name}-card`, "main-flower-card")
        let text = (`${newObj.name}`)
        newFlowerCard.textContent = text
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        addFlowerToHeader(newObj, newFlowerCard, status)
    }

    else if (status === "allCards"){
        
        newFlowerCard = createDiv(`${newObj.name} ${newObj.color}`, "selection-flower-card")
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        addFlowersAboveFlowerDiv(newObj, newFlowerCard, status)
    }

    else {
        
        newFlowerCard = createDiv(`${newObj.name} ${newObj.color}`, "flower-card")
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        addFlowerToSquare(obj, newFlowerCard, status, otherObj)
    }
    
}


let addFlowerToHeader = function (obj, card, status) {
    let flowerSelectionHeader = document.getElementById("flower-selection")
    if (status === "onlyWhiteCards") {
        // let expand = createDiv("button-container")
        // let btn = document.createElement('button')
        // btn.className = "open-close-button"


        card.addEventListener("click", function(event){getFlowersByType(event, obj.name)}, {once: true})

        flowerSelectionHeader.appendChild(card)
        // .appendChild(expand).appendChild(btn)
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

let addFlowersAboveFlowerDiv = function (newObj, newFlowerCard, status) {
    let allColorsDiv = document.getElementById("all-colors-selection")
    allColorsDiv.appendChild(newFlowerCard)
}

let removeFlowerDiv = function (event, flower) {
    let flowerDiv = document.getElementById("all-colors-selection")
    flowerDiv.innerHTML = ""
    event.target.addEventListener("click", function(e){
        getFlowersByType(e, flower)
    }, {once: true})
}



let createLandForm = function(){
    let selectColRowDiv = document.getElementById("column-row-select")

    let amountInDropdowns = [2, 3, 4, 5, 6]

    let dropdownOne = document.createElement("select")
    dropdownOne.name = "number_of_columns"
    dropdownOne.id = "Columns"

    let dropdownTwo = document.createElement("select")
    dropdownTwo.name = "number_of_rows"
    dropdownTwo.id = "Rows"


    selectColRowDiv.appendChild(dropdownOne)
    selectColRowDiv.appendChild(dropdownTwo)

    for (let amount of amountInDropdowns) {
        let selectDiv = document.createElement("option")
        selectDiv.value = `${amount} Columns`
        selectDiv.text = `${amount} Columns`
        let selectDivTwo = document.createElement("option")
        selectDivTwo.value = `${amount} Rows`
        selectDivTwo.text = `${amount} Rows`
        dropdownOne.appendChild(selectDiv)
        dropdownTwo.appendChild(selectDivTwo)
    }


}

let displayLandPlot = function(obj) {
    
    let landPlotBody = document.getElementById("land-plot-body")

    let numRows = obj.attributes.number_of_rows
    let numCols = obj.attributes.number_of_columns


    let squaresInLand = obj.relationships.squares.data
    console.log(squaresInLand)

    for (let i = 0; i < numRows; i++) {
        let tableRow = document.createElement("tr")
        tableRow.id = i + 1
        landPlotBody.appendChild(tableRow)

        for (let ii = 0; ii < numCols; ii++) {
            let tableCol = document.createElement("td")
            tableCol.id = ii + 1
            tableCol.className = "land-plot-squares"
            tableRow.appendChild(tableCol)

        }
        
    }


    obj.relationships.squares.data.forEach(squareObj => getSquare(squareObj))


}


let addFlowerToSquare = function (obj, newFlowerCard, status, squareObj) {
    // console.log(obj)
    console.log(newFlowerCard)

    // console.log(squareObj.attributes)

    let flowerRow = squareObj.attributes.row_num
    let flowerCol = squareObj.attributes.column_num

    let tableRow = document.getElementsByTagName("tr")
    let trElem = tableRow[flowerRow - 1]
    let tdElem = trElem.getElementsByTagName("td")
    tdElem[flowerCol - 1].appendChild(newFlowerCard)


}

let addEmptyPlotToSquare = function(squareObj) {

}

document.addEventListener('DOMContentLoaded', () => {

    createLandForm()
    getWhiteFlowers()
    getLandPlot()


})
