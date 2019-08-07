const request = require('request')

const forecast = (latitude , longitude ,callback )=>{
    const geocodeUrl = 'https://api.darksky.net/forecast/33e0ed0a9db5843b6432920245748af7/'+latitude+','+longitude+'?units=si'
    
    request({url : geocodeUrl , json : true } , (error, {body}) => {
        if(error){
            callback( 'Enable to connect to weather services' , undefined )
        } else if(body.error){
            callback( 'Unable to find location' , undefined ) 
        } else {
            const temprature        = body.currently.temperature
            const rainProbablity    = body.currently.precipProbability * 100
    
            const forecast = body.daily.data[0].summary + "  It is currently " + temprature + " degree out. There is a " + rainProbablity +"% chance of rain"

            callback( undefined , forecast )
        }
    })
}

module.exports = forecast