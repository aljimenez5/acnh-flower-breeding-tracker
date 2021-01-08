const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`


document.addEventListener('DOMContentLoaded', () => {

    createLandForm()
    createDifferentDivs()
    getWhiteFlowers()
    getAllLandPlots()

})

let createDiv = function (name, className = name) {
    const newDiv = document.createElement("div")
    newDiv.id = name
    newDiv.className = className
    return newDiv
}

let createImageElement = function (obj) {
    let image = document.createElement("img")
    image.src = `./assets/images/${obj.image_url}`
    image.height = 100
    image.width = 100
    return image
}

let createDifferentDivs = function() {
    let landSelection = createDiv("land-selection")
    let landPlot = createDiv("land-plot")
    let table = document.createElement("table")
    let tableHeading = createDiv("land-name-location-heading")
    let tableBody = document.createElement("tbody")
    tableBody.id = "land-plot-body"
    let flowerSelection = createDiv("flower-selection")
    let allColors = createDiv("all-colors-selection")
    landPlot.append(tableHeading, table)
    table.appendChild(tableBody)
    document.body.append(landSelection, landPlot, flowerSelection, allColors)
    
}


let createLandForm = function () {
    let landFormDiv = createDiv("create-land-form")
    let unorderedList = document.createElement("ul")
    
    let listItemLandName = document.createElement("li") 
    listItemLandName.id = "land_name"
    let listItemLandLocation = document.createElement("li") 
    listItemLandLocation.id = "land_location"
    let listItemColRow = document.createElement("li")
    listItemColRow.id = "column_row_select" 
    let submitButton = document.createElement("button")
    
    let inputLandName = document.createElement("input")
    let inputLandLocation = document.createElement("input")
    let nameLabel = document.createElement("label")
    let locationLabel = document.createElement("label")

    Object.assign(inputLandName, {
        "type": "text",
        "id": "land_name",
        "name": "land_name"
    })

    Object.assign(inputLandLocation, {
        "type": "text",
        "id": "land_location",
        "name": "land_location"
    })

    Object.assign(nameLabel, {
        "id": "land_name",
        "innerHTML": "Land Name"
    })

    Object.assign(locationLabel, {
        "id": "land_location",
        "innerHTML": "Land Location"
    })

    Object.assign(submitButton, {
        "id": "submit_button",
        "innerHTML": "Create Land Plot"
    })


    document.body.appendChild(landFormDiv).appendChild(unorderedList)

    unorderedList.appendChild(listItemLandName).appendChild(nameLabel).appendChild(inputLandName)

    unorderedList.appendChild(listItemLandLocation).appendChild(locationLabel).appendChild(inputLandLocation)

    unorderedList.append(listItemColRow, submitButton)


    let amountInDropdowns = [2, 3, 4, 5, 6]

    let dropdownOne = document.createElement("select")
    dropdownOne.name = "number_of_columns"
    dropdownOne.id = "Columns"

    let dropdownTwo = document.createElement("select")
    dropdownTwo.name = "number_of_rows"
    dropdownTwo.id = "Rows"


    listItemColRow.append(dropdownOne, dropdownTwo)


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

let getWhiteFlowers = function (status = "onlyWhiteCards") {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.color === "White")).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj, status)))

}

let getFlowersByType = function (event, flowerType, status = "allCards") {
    console.log(event)
    console.log(event.target)
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

let createFlowerCard = function (obj, status, otherObj = null) {
    let newFlowerCard
    let newObj = obj.attributes

    if (status === "onlyWhiteCards") {
        newFlowerCard = createDiv(`main-${newObj.name}-card`, "main-flower-card")
        let text = (`${newObj.name}`)
        newFlowerCard.textContent = text
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        
        newFlowerCard.addEventListener("click", function (event) { getFlowersByType(event, newObj.name, status = "allCards")}, {once: true})

        let flowerSelectionHeader = document.getElementById("flower-selection")

        flowerSelectionHeader.appendChild(newFlowerCard)

    }

    else if (status === "allCards") {

        newFlowerCard = createDiv(`${newObj.name} ${newObj.color}`, "selection-flower-card")
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        document.getElementById("all-colors-selection").appendChild(newFlowerCard)
    
    }

    else {

        newFlowerCard = createDiv(`${newObj.name} ${newObj.color}`, "flower-card")
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        addFlowerToSquare(obj, newFlowerCard, status, otherObj)
    }

}

let removeFlowerDiv = function (event, flower) {
    
    let flowerDiv = document.getElementById("all-colors-selection")
    flowerDiv.innerHTML = ""
    event.target.addEventListener("click", function (e) {
        getFlowersByType(e, flower)
    }, { once: true })
}


let getLandPlot = function (landObjID = 1) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${LANDS_URL}/${landObjID}`, requestConfigs).then(response => response.json()).then(parsedResponse => displayLandPlot(parsedResponse.data))
}

let displayLandPlot = function (obj) {
    
    

    let landPlotBody = document.getElementById("land-plot-body")

    let paragraph = document.getElementById("land-name-location-heading")

    landPlotBody.innerHTML = ""
    paragraph.innerHTML = ""

    paragraph.textContent = `${obj.attributes.name} located at ${obj.attributes.location} plot`

    let numRows = obj.attributes.number_of_rows
    let numCols = obj.attributes.number_of_columns


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

let getSquare = function (squareObj) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${SQUARES_URL}/${squareObj.id}`, requestConfigs).then(response => response.json()).then(parsedResponse => getFlower(parsedResponse.data.relationships.flower.data, parsedResponse.data))
}

let getFlower = function (flowerObj, squareObj, status = "squareFlower") {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    if (flowerObj) { fetch(`${FLOWERS_URL}/${flowerObj.id}`, requestConfigs).then(response => response.json()).then(parsedResponse => createFlowerCard(parsedResponse.data, status, squareObj)) }

    // else {
    //     addEmptyPlotToSquare(squareObj)
    // }
}

let addFlowerToSquare = function (obj, newFlowerCard, status, squareObj) {

    let flowerRow = squareObj.attributes.row_num
    let flowerCol = squareObj.attributes.column_num

    let tableRow = document.getElementsByTagName("tr")
    let trElem = tableRow[flowerRow - 1]
    let tdElem = trElem.getElementsByTagName("td")
    tdElem[flowerCol - 1].appendChild(newFlowerCard)

}

let getAllLandPlots = function () {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${LANDS_URL}`, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.forEach(obj => landPlotIcon(obj)))
}

let landPlotIcon = function (obj) {
    let landSelection = document.getElementById("land-selection")

    let plotIcon = document.createElement("div")

    let iconButton = document.createElement("input")
    iconButton.type = "radio"

    let iconLabel = document.createElement("label")
    iconLabel.name = `${obj.attributes.name}_land_plot_icon`

    Object.assign(plotIcon, {
        "id": "land_plot_icon",
        "name": `${obj.attributes.name}_land_plot_icon`
    })

    let paragraph = document.createElement("p")
    paragraph.innerHTML = `${obj.attributes.name}`

    let image = document.createElement("img")
    image.src = "./assets/background/islandicon.jpeg"
    image.id = "land-plot-icon-image"

    landSelection.appendChild(iconLabel).appendChild(plotIcon).append(paragraph, image, iconButton)

    iconButton.addEventListener("click", function() {
        displayLandPlot(obj)
    })
    

}