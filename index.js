const express = require('express')

let app = express()


// set the environment and the port
let env = process.env.NODE_ENV || 'developement'

// set the information from config.js file, based on the current environment - developemnt or production
let config = require('./server/config/config')[env]

// call the data base connection
require('./server/config/database')(config)

// enable pug
app.set('view engine', 'pug')
app.set('views', './server/views')

// enable static files from folder public
app.use(express.static('public'))

// get request
app.get('/', (req, res) => {
  // render pug template
  res.render('index')
})

app.listen(config.port)
console.log('Express is ready!')