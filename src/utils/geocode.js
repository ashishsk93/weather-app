const { builtinModules } = require('module')
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoaXNoc2s5MyIsImEiOiJja2piMm9yejM3azd5MzFxam1tY2E0eHRwIn0.5uruJYciGyXlo6crJEt8SA&limit=1'
    request({ url, json: true}, (error,{ body }) => {
        if (error){
            callback('Unable to connect to the Geocoding Service!!',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location: ' + body.query[0] + '. Please specify a different location!!',undefined)
        } else {
            place = body.features[0].place_name
            lat = body.features[0].center[1]
            long = body.features[0].center[0]
            callback(undefined, {
                place,
                lat,
                long
            })
        }
    })
}

module.exports = geocode