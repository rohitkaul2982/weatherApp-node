const request = require('request')

const geocode  = (address , callback) =>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoicm9oaXRrYXVsMTIzIiwiYSI6ImNqeW9lODVxbjAyZXczaG1ya2MyZmJ1d3IifQ.2PAch4NYHg1OJrCuqiZ6lQ&limit=1'
    request({url : geocodeUrl , json : true } , (error, { body }) =>{
        if(error){
                callback('unable to connect to location services',undefined)
        } else if(body.features.length === 0) {
                callback('Unable to find location try another search', undefined)
        } else{
            callback(undefined,{
                latitude    : body.features[0].center[1],
                longitude   : body.features[0].center[0],
                location    : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode 