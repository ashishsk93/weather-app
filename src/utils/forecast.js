const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97d7900b31fa8a8fb63b000dfd3afd7a&query=' + lat + ',' + lon
    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to the Weather Service!!', undefined)
        } else if (body.error){
            callback('Error Code: ' + body.error.code + ' - ' + body.error.info, undefined)
        } else {
            callback(undefined, {
                desc: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                rain: body.current.precip
            })
        }
    })
}

module.exports = forecast