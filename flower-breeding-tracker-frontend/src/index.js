const BACKEND_URL = 'http://localhost:3000'
const STATIC_FLOWERS_URL = `${BACKEND_URL}/static_flowers`
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`

class Flower {
    constructor(name, color, image_url) {
        this.name = name
        this.color = color
        this.image_url = image_url
    }
}

class Land {
    constructor(name, location, number_of_columns, number_of_rows) {
        this.name = name
        this.location = location
        this.number_of_columns = number_of_columns
        this.number_of_rows = number_of_rows
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createLandForm()
    createDifferentDivs()
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
    let form = document.createElement("form")
    let div = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let div4 = document.createElement("div")

    form.action = `${LANDS_URL}`
    form.method = "POST"
    
    let listItemLandName = document.createElement("label") 
    listItemLandName.id = "land_name"
    let listItemLandLocation = document.createElement("label") 
    listItemLandLocation.id = "land_location"
    let listItemColRow = document.createElement("label")
    listItemColRow.id = "column_row_select" 


    let inputLandName = document.createElement("input")
    let inputLandLocation = document.createElement("input")
    let nameLabel = document.createElement("label")
    let locationLabel = document.createElement("label")
    let submitButton = document.createElement("button")
    
    

    Object.assign(inputLandName, {
        "type": "text",
        "id": "land_name",
        "name": "name"
    })

    Object.assign(inputLandLocation, {
        "type": "text",
        "id": "land_location",
        "name": "location"
    })

    Object.assign(nameLabel, {
        "innerHTML": "Land Name",
        "htmlFor": "land_name"
    })

    Object.assign(locationLabel, {
        "innerHTML": "Land Location",
        "htmlFor": "land_location"
    })

    Object.assign(submitButton, {
        "id": "submit_button",
        "innerHTML": "Create Land Plot"
    })


    document.body.appendChild(landFormDiv).appendChild(form)

    form.appendChild(div).append(nameLabel, inputLandName)

    form.appendChild(div2).append(locationLabel, inputLandLocation)

    form.appendChild(div3).appendChild(listItemColRow)

    form.appendChild(div4).appendChild(submitButton)

    form.addEventListener("submit", submitLandPlot)

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
        selectDiv.value = `${amount}`
        selectDiv.text = `${amount} Columns`
        let selectDivTwo = document.createElement("option")
        selectDivTwo.value = `${amount}`
        selectDivTwo.text = `${amount} Rows`
        dropdownOne.appendChild(selectDiv)
        dropdownTwo.appendChild(selectDivTwo)
    }

}

let submitLandPlot = function(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target)
    console.log(formData.getAll())
    const requestConfigs = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    }

    fetch(LANDS_URL, requestConfigs).then(response => response.json()).then(function(obj) {
        console.log(obj)
    })
}

let getAllWhiteFlowers = function (status = "allWhiteCards") {
    
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(STATIC_FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.color === "White")).then(filteredResponse => filteredResponse.forEach(
        
        function(obj) {
            let jsObj = new Flower(obj.attributes.name, obj.attributes.color, obj.attributes.image_url)
            createFlowerCard(jsObj, status)
        }
        
        ))

}

let getFlowersByType = function (flowerType, status="allCards") {
    let flowerDiv = document.getElementById("all-colors-selection")
    flowerDiv.innerHTML = ""
    

    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(STATIC_FLOWERS_URL, requestConfigs).then(response => response.json()).then(parsedResponse => parsedResponse.data.filter(obj => obj.attributes.name === flowerType)).then(filteredResponse => filteredResponse.forEach(
        function(obj){
            let jsObj = new Flower(obj.attributes.name, obj.attributes.color, obj.attributes.image_url)
            createFlowerCard(jsObj, status)
        }
    ))

    
}

let createFlowerCard = function (newObj, status) {
    let newFlowerCard
    
    if (status === "allWhiteCards") {
        newFlowerCard = createDiv(`${newObj.name}-card`, "main-flower-card")

        let text = (`${newObj.name}`)
        newFlowerCard.textContent = text
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)

        newFlowerCard.addEventListener("click", function () { getFlowersByType(newObj.name) })

        let flowerSelectionHeader = document.getElementById("flower-selection")

        flowerSelectionHeader.appendChild(newFlowerCard)
        
    }

    else if (status === "allCards") {
        
        newFlowerCard = createDiv("flower-color-card", `${newObj.color}-${newObj.name}`)
        let image = createImageElement(newObj)
        newFlowerCard.appendChild(image)
        newFlowerCard.draggable = true
        newFlowerCard.addEventListener("dragstart", dragFunction)
        document.getElementById("all-colors-selection").appendChild(newFlowerCard)

    }

    else {
        let flowerObj = newObj
        newFlowerCard = createDiv(`${flowerObj.name} ${flowerObj.color}`, "flower-card")
        let image = createImageElement(flowerObj)
        newFlowerCard.appendChild(image)
        newFlowerCard.draggable = true
        newFlowerCard.addEventListener("dragstart", dragFunction)
        addFlowerToSquare(newFlowerCard, newObj)
    }
}

let dragFunction = function(e) {
    console.log(e)
    e.dataTransfer.effectAllowed = "copy"
    let flowerObj = new Flower()
    // on drag start create it as a new object (save when added to a square)

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



let displayPlotHolder = function(){
    let landPlotBody = document.getElementById("land-plot-body-two")
    

    for (let i = 0; i < 6; i++) {
        let tableRow = document.createElement("tr")
        tableRow.id = i + 1
        landPlotBody.appendChild(tableRow)

        for (let ii = 0; ii < 2; ii++) {
            let tableCol = document.createElement("td")
            tableCol.id = ii + 1
            tableCol.className = "land-plot-squares-two"
            tableRow.appendChild(tableCol)
        }
    }
}

let displayLandPlot = function (obj) {
    displayPlotHolder()
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
    console.log(newFlowerCard)
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