const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
const image = document.querySelector('#img1')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const address = search.value

    message2.textContent = 'Fetching the weather...'
    message1.textContent = ''
    image.src = ''

    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message2.textContent = 'Error: ' + data.error
                message1.textContent = ''
                return
            }

            message1.textContent = 'Location: ' + data.location
            message2.textContent = 'Forecast: ' + data.forecast
            image.src = data.urlphoto
        })
    })
})