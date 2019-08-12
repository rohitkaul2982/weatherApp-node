const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =  require('./utils/geocode')
const forecast =  require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view Location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory for use
app.use(express.static(publicDirectoryPath))


// Routes for various links
app.get('' , (req,res) => {
    res.render('index',{
        title :'Weather',
        name : 'Rohit'
    })
})
app.get('/about' , (req,res) =>{
    res.render('about' ,{
        title   :'About',
        name    : 'Rohit'
    })
})

app.get('/help' , (req,res) =>{

    res.render('help' ,{
        helpText    :'Help is here',
        title       :'Help',
        name        :'Rohit '
    })
})

app.get('/weather', (req , res) => {

    if(!req.query.address){
        return res.send({
             error :'You must provide a address!'
         })
 
     }

     geocode( req.query.address , (error , {latitude ,longitude ,location} = {}) => {
        if(error){
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast :forecastdata,
                location,
                address : req.query.address 
            })
        })
    })
})

app.get( '/products' , (req,res) =>{

    if(!req.query.search){
       return res.send({
            error :'You must provide a Search term'
        })

    }
    res.send({
        location : 'agra',
        forecast : 'all day sunny'
    })
})

app.get('/help/*', (req,res)=>{  
    res.render('404error' , {
        title:'404',
        name: 'Rohit',
        errorMessage : 'Help Article Not found'
    })
})

app.get('*' , (req,res) =>{
    res.render('404error' , {
        title:'404',
        name: 'Rohit',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port , () =>{
    console.log('Server is Up on port ' + port)
})