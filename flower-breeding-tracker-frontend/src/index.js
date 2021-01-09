const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`


document.addEventListener('DOMContentLoaded', () => {

    createLandForm()
    createDifferentDivs()
    displayTwoEmptyPlots()
    getAllWhiteFlowers()
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
    image.alt = `${obj.color} ${obj.name}`
    image.height = 80
    image.width = 80
    return image
}

let createDifferentDivs = function() {
    let landSelection = createDiv("land-selection")
    let landPlotsDiv = createDiv("land-plots-div")
    
    let landPlot = createDiv("land-plot")
    let table = document.createElement("table")
    let tableHeading = createDiv("land-name-location-heading")
    let tableBody = document.createElement("tbody")
    tableBody.id = "land-plot-body"
    
    let landPlotTwo = createDiv("land-plot-two")
    let tableTwo = document.createElement("table")
    let tableHeadingTwo = createDiv("land-name-location-heading-two")
    let tableBodyTwo = document.createElement("tbody")
    tableBodyTwo.id = "land-plot-body-two"

    let p = document.createElement("p")
    let ptwo = document.createElement("p")
    
    p.innerHTML = "IN GAME FLOWERS PLOT"
    ptwo.innerHTML = "FLOWERS HOLDER"

    let flowerSelection = createDiv("flower-selection")
    let allColors = createDiv("all-colors-selection")
    
    landPlot.append(p, tableHeading, table)
    table.appendChild(tableBody)
    
    landPlotTwo.append(ptwo, tableHeadingTwo, tableTwo)
    tableTwo.appendChild(tableBodyTwo)

    landPlotsDiv.append(landPlot, landPlotTwo)

    document.body.append(landSelection, landPlotsDiv,  allColors, flowerSelection)
    
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


    let amountInDropdowns = [2, 3, 4]

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

let getAllWhiteFlowers = function (status = "allWhiteCards") {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.color === "White")).then(filteredResponse => filteredResponse.forEach(obj => createFlowerCard(obj, status)))

}

let getFlowersByType = function (event, flowerType, status="allCards") {
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

    
}

let createFlowerCard = function (obj, status) {
    let newFlowerCard
    let newObj = obj.attributes
    
    if (status === "allWhiteCards") {
        newFlowerCard = createDiv(`${newObj.name}-card`, "main-flower-card")

        let text = (`${newObj.name}`)
        newFlowerCard.textContent = text
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)

        let flowerSelectionHeader = document.getElementById("flower-selection")

        flowerSelectionHeader.appendChild(newFlowerCard)
        
        newFlowerCard.addEventListener("click", function (event) { getFlowersByType(event, newObj.name)})
    }

    else if (status === "allCards") {
        
        newFlowerCard = createDiv("flower-color-card", `${newObj.color}-${newObj.name}`)
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        
        document.getElementById("all-colors-selection").appendChild(newFlowerCard)

    }

    else {
        let flowerObj = newObj.flower
        newFlowerCard = createDiv(`${flowerObj.name} ${flowerObj.color}`, "flower-card")
        let image = createImageElement(flowerObj)
        newFlowerCard.appendChild(image)
        addFlowerToSquare(newFlowerCard, newObj)
    }
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



let displayTwoEmptyPlots = function(){
    let landPlotBody = document.getElementById("land-plot-body")
    let landPlotBodyTwo = document.getElementById("land-plot-body-two")
    
    

    for (let i = 0; i < 4; i++) {
        let tableRow = document.createElement("tr")
        let tableRowTwo = document.createElement("tr")
        tableRow.id = i + 1
        tableRowTwo.id = i + 1
        landPlotBody.appendChild(tableRow)
        landPlotBodyTwo.appendChild(tableRowTwo)

        for (let ii = 0; ii < 4; ii++) {
            let tableCol = document.createElement("td")
            let tableColTwo = document.createElement("td")
            tableCol.id = ii + 1
            tableColTwo.id = ii + 1
            tableCol.className = "land-plot-squares"
            tableColTwo.className = "land-plot-squares-two"
            tableRow.appendChild(tableCol)
            tableRowTwo.appendChild(tableColTwo)
        }
    }
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


    fetch(`${SQUARES_URL}/${squareObj.id}`, requestConfigs).then(response => response.json().then(parsedResponse => getFlower(parsedResponse.data.relationships.flower.data, parsedResponse.data)))

}

let getFlower = function (flowerObj, squareObj, status = "squareFlower") {

    
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    if (flowerObj) { 
        fetch(`${FLOWERS_URL}/${flowerObj.id}`, requestConfigs).then(response => response.json()).then(parsedResponse => createFlowerCard(squareObj, status)) 
    }

   
}

let addFlowerToSquare = function (newFlowerCard, squareObj) {

    let flowerRow = squareObj.row_num
    let flowerCol = squareObj.column_num

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