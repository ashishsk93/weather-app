const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather Application',
        name: 'Ashish Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ashish Kumar'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ashish Kumar',
        message: 'Check this page for help!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address.'
        })
    }

    geocode(req.query.address,(error,{place, lat, long} = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(lat, long, (error, {desc, temp, rain, humidity, feelslike, urlphoto} = {} ) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                location: place,
                forecast: desc + ' - It is ' + temp + ' degress out. There is ' + rain + '% chance of rain. The humidity is '+ humidity +'. It feels like '+ feelslike +' degrees out.',
                urlphoto
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
        name: 'Ashish Kumar',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
        name: 'Ashish Kumar',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server Started at ' + port)
})