const BACKEND_URL = 'http://localhost:3000'
const FLOWERS_URL = `${BACKEND_URL}/flowers`
const LANDS_URL = `${BACKEND_URL}/lands`
const SQUARES_URL = `${BACKEND_URL}/squares`

console.log('testing...')
;
fetch(`${BACKEND_URL}/test`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse));


function getAllFlowers() {

}

